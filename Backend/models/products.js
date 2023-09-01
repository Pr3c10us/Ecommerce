const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        brief: { type: String },
        description: {
            type: String,
        },
        gender: {
            type: String,
            enum: ["male", "female", "unisex"],
            default: "unisex",
        },
        collaborations: [
            {
                type: String,
            },
        ],
        images: [
            {
                type: String,
            },
        ],
        category: {
            type: String,
            enum: [
                "Shirts",
                "Pants",
                "Shoes",
                "Bags",
                "Wristwatches",
                "Glasses",
                "Jackets",
                "Jewelries",
                "Hats",
                "Belts",
                "Others",
            ],
        },
        specialCategories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SpecialCategory",
            },
        ],
        countInStock: [
            {
                size: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// Demo 2: Create a product
const ProductDemo = {
    name: "Nike Slim Shirt",
    price: 12000,
    description: "A very nice shirt",
    category: "Shirts",
    countInStock: 10,
};
