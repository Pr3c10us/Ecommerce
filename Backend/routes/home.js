const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { adminAuthorization } = require("../middleware/adminAuthorization");

const {
    addHomeProduct,
    getHomeProduct,
    editHomeProduct,
    deleteHomeProduct,
    replaceVideo,
    addProductImage,
    deleteProductImage,
    getAllHomeProduct,
    getHomeProductById,
} = require("../controller/home");

router
    .route("/")
    .get(getHomeProduct)
    .post(
        adminAuthorization,
        // use multer upload for video and images fields
        upload.fields([{ name: "video" }, { name: "images" }]),
        addHomeProduct
    );

router.route("/all").get(getAllHomeProduct);
router
    .route("/:id")
    .get(getHomeProductById)
    .put(adminAuthorization, editHomeProduct)
    .delete(adminAuthorization, deleteHomeProduct);

router
    .route("/:productId/image")
    .put(adminAuthorization, upload.array("images"), addProductImage)
    .delete(adminAuthorization, deleteProductImage);

router
    .route("/:productId/video")
    .put(adminAuthorization, upload.array("video"), replaceVideo);

module.exports = router;
