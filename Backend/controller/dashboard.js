const Dashboard = require("../models/dashboard");
require("dotenv").config();
const Product = require("../models/products");
const blobServiceClient = require("../azure/azureStorage");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");

const addProduct = async (req, res) => {
    // return res.json({a:req.body,b:req.files});

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded." });
    }

    const nameExist = await Dashboard.findOne({ name: req.body.name });
    if (nameExist) {
        throw new BadRequestError("Product name already exist");
    }

    if (req.files.largeImage) {
        const largeImagePromise = req.files.largeImage.map(async (image) => {
            const fileExtension = image.originalname.split(".").pop();
            const blobName = `${Date.now()}-${Math.random()
                .toString(36)
                .substring(7)}.${fileExtension}`;

            const containerName =
                process.env.BLAK_RATT_DASHBOARD_IMAGE_CONTAINER_NAME;
            const containerClient =
                blobServiceClient.getContainerClient(containerName);
            const blockBlobClient =
                containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(image.buffer, image.buffer.length);
            req.body.largeImage = blobName;
            return blobName;
        });
        const largeImage = await Promise.all(largeImagePromise);
        req.body.largeImage = largeImage;
    }

    if (req.files.smallImage) {
        const smallImagePromise = req.files.smallImage.map(async (image) => {
            const fileExtension = image.originalname.split(".").pop();
            const blobName = `${Date.now()}-${Math.random()
                .toString(36)
                .substring(7)}.${fileExtension}`;

            const containerName =
                process.env.BLAK_RATT_DASHBOARD_IMAGE_CONTAINER_NAME;
            const containerClient =
                blobServiceClient.getContainerClient(containerName);
            const blockBlobClient =
                containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(image.buffer, image.buffer.length);
            req.body.smallImage = blobName;
            return blobName;
        });
        const smallImage = await Promise.all(smallImagePromise);
        req.body.smallImage = smallImage;
    }
    const dashboard = await Dashboard.create(req.body);
    res.status(201).json({ dashboard });
};

const updateProduct = async (req, res) => {
    // get product id from request params
    const { id } = req.params;

    if (req.body.images) {
        throw new BadRequestError("Images cannot be updated from this route");
    }

    // check if id is valid
    if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestError("Invalid product id");
    }

    // find product by id and delete
    const product = await Dashboard.findById(id);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Product not found");
    }

    if (req.body.name) {
        const nameExist = await Dashboard.findOne({
            name: req.body.name,
        });

        if (nameExist) {
            throw new BadRequestError("Name already exists");
        }
    }

    const newProductInfo = await Dashboard.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        message: "Dashboard updated successfully",
        product: newProductInfo,
    });
};

const deleteProduct = async (req, res) => {
    // get product id from request params
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestError("Invalid product id");
    }

    // find product by id and delete
    const product = await Dashboard.findById(id);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Product not found");
    }

    // Delete images from azure blob storage
    const containerName = process.env.BLAK_RATT_DASHBOARD_IMAGE_CONTAINER_NAME;
    const largeImagePromises = product.largeImage.map(async (imageName) => {
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        await blockBlobClient.deleteIfExists();
        // return;
    });
    await Promise.all(largeImagePromises);

    const smallImagePromises = product.smallImage.map(async (imageName) => {
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        await blockBlobClient.deleteIfExists();
        // return;
    });
    await Promise.all(smallImagePromises);

    await Dashboard.findByIdAndDelete(id);
    // send success message
    res.json({ message: "Product deleted successfully" });
};

const changeLargeImage = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded." });
    }
    // get product id and image id from request params
    const { productId, imageName } = req.params;

    // check if product id is valid
    if (!mongoose.isValidObjectId(productId)) {
        throw new BadRequestError("Invalid product id");
    }

    // get product by id
    const product = await Dashboard.findById(productId);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Product not found");
    }

    // Delete images from azure blob storage
    const containerName = process.env.BLAK_RATT_DASHBOARD_IMAGE_CONTAINER_NAME;
    const largeImagePromises = product.largeImage.map(async (imageName) => {
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        await blockBlobClient.deleteIfExists();
        // return;
    });
    await Promise.all(largeImagePromises);

    // Push Images to Azure Blob Storage
    const imagePromises = req.files.map(async (image) => {
        // Get the file extension (assuming image files)
        const fileExtension = image.originalname.split(".").pop();
        const blobName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${fileExtension}`;

        const containerName = process.env.BLAK_RATT_DASHBOARD_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(image.buffer, image.buffer.length);
        // return `${process.env.AZURE_IMAGE_URL}${blobName}`;
        return blobName;
    });
    const images = await Promise.all(imagePromises);
    product.largeImage = images;

    // save product
    await product.save();

    // send success message
    res.json({ message: "Large Image changed successfully", images });
};

const changeSmallImage = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded." });
    }
    // get product id and image id from request params
    const { productId } = req.params;

    // check if product id is valid
    if (!mongoose.isValidObjectId(productId)) {
        throw new BadRequestError("Invalid product id");
    }

    // get product by id
    const product = await Dashboard.findById(productId);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Product not found");
    }

    // Delete images from azure blob storage
    const containerName = process.env.BLAK_RATT_DASHBOARD_IMAGE_CONTAINER_NAME;
    const smallImagePromises = product.smallImage.map(async (imageName) => {
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        await blockBlobClient.deleteIfExists();
        // return;
    });
    await Promise.all(smallImagePromises);

    // Push Images to Azure Blob Storage
    const imagePromises = req.files.map(async (image) => {
        // Get the file extension (assuming image files)
        const fileExtension = image.originalname.split(".").pop();
        const blobName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${fileExtension}`;

        const containerName = process.env.BLAK_RATT_DASHBOARD_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(image.buffer, image.buffer.length);
        // return `${process.env.AZURE_IMAGE_URL}${blobName}`;
        return blobName;
    });
    const images = await Promise.all(imagePromises);
    product.smallImage = images;

    // save product
    await product.save();

    // send success message
    res.json({ message: "Small Image changed successfully", images });
};

const getProducts = async (req, res) => {
    const products = await Dashboard.find();
    res.json({ products });
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    changeLargeImage,
    changeSmallImage
};
