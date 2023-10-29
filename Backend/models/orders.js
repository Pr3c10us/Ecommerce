const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        country: {
            type: String,
            enum: ["Nigeria", "United States"],
        },
        clientSecret: String,

        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
            ],
            default: "pending",
        },
        paymentStatus: {
            type: String,
            enum: ["processing", "canceled", "failed", "successful"],
            default: "processing",
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                },
                measurements: [
                    {
                        name: {
                            type: String,
                        },
                        unit: {
                            type: String,
                            default: "inches",
                        },
                        value: {
                            type: Number,
                        },
                    },
                ],
                quantity: {
                    type: Number,
                },
                price: {
                    type: Number,
                },
            },
        ],
        shipping: [
            {
                shipping: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Shipping",
                    required: true,
                },
                name: {
                    type: String,
                },
                fee: {
                    type: Number,
                },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        },
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
// demo order data
const orderData = {
    firstName: "John",
    lastName: "Doe",
    email: "johnDoe@gmail.com",
    phone: "1234567890",
    address: "123 Main St",
    city: "New York",
    state: "New York",
    zip: "12345",
    country: "USA",
    shippingMethod: "standard",
};
