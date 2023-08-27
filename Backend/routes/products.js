const router = require("express").Router();
const multer = require("multer");
const upload = multer();
const { adminAuthorization } = require("../middleware/adminAuthorization");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteProductImage,
    addProductImage,
    createSpecialCategory,
    createSuperSpecialCategory,
} = require("../controller/products");
const convertToArray = require("../middleware/convertToArray");

router
    .route("/")
    .get(getProducts)
    .post(
        adminAuthorization,
        upload.array("images"),
        convertToArray("specialCategories"),
        convertToArray("collaborations"),
        createProduct
    );

router
    .route("/:id")
    .get(getProductById)
    .put(adminAuthorization, updateProduct)
    .delete(adminAuthorization, deleteProduct);

router
    .route("/:productId/image")
    .put(adminAuthorization, upload.array("images"), addProductImage)
    .delete(adminAuthorization, deleteProductImage);

router
    .route("/specialCategory")
    .post(adminAuthorization, createSpecialCategory);

router
    .route("/superSpecialCategory")
    .post(adminAuthorization, createSuperSpecialCategory);

module.exports = router;
