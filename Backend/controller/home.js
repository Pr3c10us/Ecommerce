const Home = require("../models/home");
const blobServiceClient = require("../azure/azureStorage");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");

const addHomeProduct = async (req, res) => {
    // console.log(req.files);
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No images uploaded." });
    }

    const nameExist = await Home.findOne({ name: req.body.name });
    if (nameExist) {
        throw new BadRequestError("Product name already exist");
    }

    if (req.body.display === true) {
        const displayExist = await Home.findOne({ display: true });
        displayExist.display = false;
        await displayExist.save();

        req.body.display = true;
    }

    // Push Images to Azure Blob Storage
    const imagePromises = req.files.images.map(async (image) => {
        // Get the file extension (assuming image files)
        const fileExtension = image.originalname.split(".").pop();
        const blobName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${fileExtension}`;

        const containerName = process.env.BLAK_RATT_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(image.buffer, image.buffer.length);
        // return `${process.env.AZURE_IMAGE_URL}${blobName}`;
        return blobName;
    });
    const images = await Promise.all(imagePromises);
    req.body.images = images;

    // Push Video to Azure Blob Storage
    if (req.files.video) {
        const video = req.files.video[0];
        // Get the file extension (assuming image files)
        const fileExtension = video.originalname.split(".").pop();
        const blobName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${fileExtension}`;

        const containerName = process.env.BLAK_RATT_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(video.buffer, video.buffer.length);
        // return `${process.env.AZURE_IMAGE_URL}${blobName}`;
        req.body.video = blobName;
    }

    const product = await Home.create(req.body);

    res.status(201).json({
        message: "Product created successfully",
        product,
    });
};

const getHomeProduct = async (req, res) => {
    const product = await Home.find({ display: true }).populate("product");

    if (product.length === 0) {
        throw new NotFoundError("No product found");
    }

    res.status(200).json({
        message: "Product fetched successfully",
        product: product[0],
    });
};

const getHomeProductById = async (req, res) => {
    // get product id from request params
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestError("Invalid product id");
    }

    // find product by id and delete
    const product = await Home.findById(id);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Not Found");
    }

    res.status(200).json({
        message: "Product fetched successfully",
        product,
    });
};

const getAllHomeProduct = async (req, res) => {
    const product = await Home.find({}).populate("product");

    if (product.length === 0) {
        throw new NotFoundError("No product found");
    }

    res.status(200).json({
        message: "Product fetched successfully",
        product,
    });
};

const deleteHomeProduct = async (req, res) => {
    // get product id from request params
    const { id } = req.params;

    // check if id is valid
    if (!mongoose.isValidObjectId(id)) {
        throw new BadRequestError("Invalid product id");
    }

    // find product by id and delete
    const product = await Home.findById(id);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Not Found");
    }

    // Delete images from azure blob storage
    const containerName = process.env.BLAK_RATT_IMAGE_CONTAINER_NAME;
    const imagePromises = product.images.map(async (imageName) => {
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(imageName);
        await blockBlobClient.deleteIfExists();
        // return;
    });

    await Promise.all(imagePromises);

    // Delete video from azure blob storage
    if (product.video) {
        const containerName = process.env.BLAK_RATT_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(
            product.video
        );
        await blockBlobClient.deleteIfExists();
    }

    await Home.findByIdAndDelete(id);
    // send success message
    res.json({ message: "Product deleted successfully" });
};

const replaceVideo = async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No video uploaded." });
    }
    // get product id and image id from request params
    const { productId } = req.params;

    // check if product id is valid
    if (!mongoose.isValidObjectId(productId)) {
        throw new BadRequestError("Invalid product id");
    }

    // get product by id
    const product = await Home.findById(productId);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Product not found");
    }

    // Delete video from azure blob storage
    if (product.video) {
        const containerName = process.env.BLAK_RATT_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(
            product.video
        );
        await blockBlobClient.deleteIfExists();
    }

    // Push Video to Azure Blob Storage
    const video = req.files[0];
    // Get the file extension (assuming image files)
    const fileExtension = video.originalname.split(".").pop();
    const blobName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(7)}.${fileExtension}`;

    const containerName = process.env.BLAK_RATT_IMAGE_CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(video.buffer, video.buffer.length);
    // return `${process.env.AZURE_IMAGE_URL}${blobName}`;
    product.video = blobName;

    // save product
    await product.save();

    // send success message
    res.json({ message: "Video added successfully", video: blobName });
};

const deleteProductImage = async (req, res) => {
    // get product id and image id from request params
    const { productId } = req.params;

    // get image name from request body
    const { imageNames } = req.body;

    // check if product id is valid
    if (!mongoose.isValidObjectId(productId)) {
        throw new BadRequestError("Invalid product id");
    }

    // get product by id
    const product = await Home.findById(productId);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Product not found");
    }

    const imagePromises = imageNames.map(async (imageName) => {
        // check if image exists in product images
        if (!product.images.includes(imageName)) {
            throw new NotFoundError("Image not found in product images");
        }
        try {
            // Delete image from azure blob storage
            const containerName = process.env.BLAK_RATT_IMAGE_CONTAINER_NAME;
            const containerClient =
                blobServiceClient.getContainerClient(containerName);
            const blockBlobClient =
                containerClient.getBlockBlobClient(imageName);

            await blockBlobClient.deleteIfExists();
            const images = product.images.filter(
                (image) => image !== imageName
            );
            product.images = images;
            // return imageName;
        } catch (error) {
            console.log(error.details);
            // if (error.details.code === "BlobNotFound") {
            //     throw new NotFoundError("Image not found");
            // }
            throw new BadRequestError("Error deleting image");
        }
    });

    await Promise.all(imagePromises);
    console.log(product.images);
    await product.save();

    // send success message
    res.json({ message: "Image deleted successfully" });
};

const addProductImage = async (req, res) => {
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
    const product = await Home.findById(productId);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Product not found");
    }

    // Push Images to Azure Blob Storage
    const imagePromises = req.files.map(async (image) => {
        // Get the file extension (assuming image files)
        const fileExtension = image.originalname.split(".").pop();
        const blobName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(7)}.${fileExtension}`;

        const containerName = process.env.BLAK_RATT_IMAGE_CONTAINER_NAME;
        const containerClient =
            blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await blockBlobClient.upload(image.buffer, image.buffer.length);
        // return `${process.env.AZURE_IMAGE_URL}${blobName}`;
        return blobName;
    });
    const images = await Promise.all(imagePromises);
    product.images = [...product.images, ...images];

    // save product
    await product.save();

    // send success message
    res.json({ message: "Image added successfully", images });
};

const editHomeProduct = async (req, res) => {
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
    const product = await Home.findById(id);

    // if product not found throw error
    if (!product) {
        throw new NotFoundError("Product not found");
    }

    if (req.body.name) {
        const nameExist = await Home.findOne({
            name: req.body.name,
        });

        if (nameExist?._id?.toString() !== id && nameExist) {
            throw new BadRequestError("Name already exists");
        }
    }
    console.log(req.body);
    if (req.body.display == true) {
        const displayExist = await Home.findOne({ display: true });
        if (displayExist?._id?.toString() !== id && displayExist) {
            displayExist.display = false;
            await displayExist.save();
        }

        req.body.display = true;
    }

    const newProductInfo = await Home.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        message: "Product updated successfully",
        product: newProductInfo,
    });
};

module.exports = {
    addHomeProduct,
    getHomeProduct,
    getHomeProductById,
    getAllHomeProduct,
    editHomeProduct,
    deleteHomeProduct,
    replaceVideo,
    deleteProductImage,
    addProductImage,
};
