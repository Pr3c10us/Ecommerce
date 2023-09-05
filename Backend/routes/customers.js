const router = require("express").Router();

const { getCustomer } = require("../controller/customers");
const {  customerAuthorization } = require("../middleware/adminAuthorization");



router.route("/").get(customerAuthorization, getCustomer);

module.exports = router;
