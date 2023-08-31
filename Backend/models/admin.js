const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

// Demo 2: Create a admin
const adminDemo = {
    name: "John Doe",
    email: "johnDoe@gmail.com",
    password: "123456",
    phone: "1234567890",
    address: "123 Main St",
    city: "Ikorodu",
    state: "Lagos",
};
