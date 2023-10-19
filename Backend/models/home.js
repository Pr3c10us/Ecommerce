const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    display: {
        type: Boolean,
        default: false,
    },
    isComingSoon: {
        type: Boolean,
        default: false,
    },
    images: [
        {
            type: String,
        },
    ],
    video: {
        type: String,
        required: true,
    },
});

const Home = mongoose.model("Home", homeSchema);

module.exports = Home;
