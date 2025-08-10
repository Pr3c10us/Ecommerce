const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    fee: {
        type: Number,
    },
    currency: {
        type: String,
        default: "NGN",
        enum: ["USD", "EUR", "NGN"],
    },
    description: {
        type: String,
    },
    durationInDays: {
        type: String,
    },
});

const Shipping = mongoose.model("Shipping", shippingSchema);

module.exports = Shipping;
