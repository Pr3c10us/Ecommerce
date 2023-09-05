const { BadRequestError } = require("../errors");
const Customer = require("../models/customer");

const getCustomer = async (req, res) => {

    if (!req.customer?.id) {
        throw new BadRequestError("Can't access customer details");
    }

    const customer = await Customer.findById(req.customer?.id);

    if (!customer) {
        throw new BadRequestError("Customer doesn't exist");
    }

    res.status(200).json({ customer });
};

module.exports = {
    getCustomer,
};
