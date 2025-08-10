require("dotenv").config();
const mongoose = require("mongoose");

// create a connect function to connect to the database
const connectToMongodb = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = connectToMongodb;
