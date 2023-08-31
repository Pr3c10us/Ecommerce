const router = require("express").Router();

const { UnauthorizedError } = require("../errors");
const { adminAuthorization } = require("../middleware/adminAuthorization");
const Admin = require("../models/admin");

const isLoggedIn = async (req, res) => {
    const { id } = req.admin;
    console.log(id);

    const admin = await Admin.findById(id);

    if (!admin || admin.isApproved === false) {
        throw new UnauthorizedError("Authorization failed");
    }

    res.status(200).json({
        status: "success",
        msg: "Admin is logged in",
        data: {
            admin,
        },
    });
};

router.route("/").get(adminAuthorization,isLoggedIn);

module.exports = router;
