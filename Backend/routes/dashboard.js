const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { adminAuthorization } = require("../middleware/adminAuthorization");

const {
    addProduct,
    getProducts,
    // getProduct,
    updateProduct,
    deleteProduct,
    changeLargeImage,
    changeSmallImage,
    // deleteProductImage,
    // addProductImage,
} = require("../controller/dashboard");

router
    .route("/")
    .get(getProducts)
    .post(
        adminAuthorization,
        upload.fields([
            { name: "largeImage", maxCount: 1 },
            { name: "smallImage", maxCount: 1 },
        ]),
        addProduct
    );

router
    .route("/:id")
    // .get(getProduct)
    .put(adminAuthorization, updateProduct)
    .delete(adminAuthorization, deleteProduct);

router
    .route("/:productId/largeImage")
    .put(adminAuthorization, upload.array("largeImage"), changeLargeImage);

router
    .route("/:productId/smallImage")
    .put(adminAuthorization, upload.array("smallImage"), changeSmallImage);

module.exports = router;
