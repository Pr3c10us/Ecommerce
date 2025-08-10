require("dotenv").config();
const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");
const Cart = require("../models/carts");
const Customer = require("../models/customer");
const Order = require("../models/orders");
const Shipping = require("../models/shippings");
const { Paystack } = require("paystack-sdk");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

const createOrderStripe = async (req, res) => {
  const cartId = req.cart;
  if (!cartId) {
    throw new BadRequestError("No item in cart");
  }

  const cart = await Cart.findById(cartId).populate(
    "products.product",
    "name price images"
  );
  const products = cart.products.map((item) => {
    return {
      product: item.product,
      name: item.product.name,
      measurements: item.measurements,
      quantity: item.quantity,
      price: item.price
    };
  });

  const orderExist = await Order.findOne({ cart });
  if (orderExist) {
    throw new BadRequestError("Order has been placed");
  } else {
    req.body.cart = cart;
  }

  req.body.products = products;
  // req.body.totalPrice = cart.totalPrice;

  if (req.customer) {
    const { id: customerId } = req.customer;

    if (customerId) {
      const customer = await Customer.findById(customerId);
      req.body.customer = customer;
    }
  }

  if (!mongoose.isValidObjectId(req.body.shipping)) {
    throw new BadRequestError("Shipping Id is invalid");
  }
  const shippingDetails = await Shipping.findById(req.body.shipping);
  if (!shippingDetails) {
    throw new BadRequestError("Shipping details doesn't exist");
  }
  if (shippingDetails.currency !== "NGN") {
    throw new BadRequestError(
      "Invalid Shipping details, use a naira shipping info"
    );
  }
  req.body.shipping = [
    {
      shipping: shippingDetails._id,
      name: shippingDetails.name,
      fee: shippingDetails.fee
    }
  ];
  req.body.totalPrice = cart.totalPrice + shippingDetails.fee;

  // const paymentIntent = await stripe.paymentIntents.create({
  //     amount: req.body.totalPrice * 100,
  //     currency: "NGN",
  //     automatic_payment_methods: {
  //         enabled: true,
  //     },
  // });
  // req.body.clientSecret = paymentIntent.client_secret;
  let paystackClient = new Paystack(process.env.PAYSTACK_SECRETE_KEY);
  const transactionInitializer = {
    amount: (req.body.totalPrice * 100).toString(),
    email: req.body.email
  };

  const response = await paystackClient.transaction
    .initialize(transactionInitializer)
    .catch((error) => {
      throw new BadRequestError("failed to process deposit");
    });

  if (!response.data?.reference || !response.data.access_code) {
    throw new BadRequestError("Failed to Process transaction");
  }
  req.body.clientSecret = response.data.reference;

  const order = await Order.create(req.body);

  await Cart.findByIdAndDelete(cart._id);

  res
    .status(201)
    .cookie("cart", "", {
      expires: new Date(Date.now() + 1000)
    })
    .json({
      msg: "Order created",
      paymentUrl: response.data.authorization_url,
      order
    });
};

const getOrders = async (req, res) => {
  if (!req.customer) {
    throw new BadRequestError("Please login to view your orders");
  }
  const { id: customerId } = req.customer;
  const customer = await Customer.findById(customerId);

  const queryObject = { customer };

  // get orders for admin
  let result = Order.find(queryObject).select(
    "-customer -createdAt -updatedAt -__v"
  );

  // #################################################################
  // Set up Pagination

  // set limit and page(from query) variable
  const limit = Number(req.query.limit) || 30;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  // edit orders based on limit and page
  result = result.skip(skip).limit(limit);

  // #################################################################
  // Send final orders

  const orders = await result;

  res.json({ nbHits: orders.length, orders });
};

const getOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestError("Order Id is not valid");
  }

  const order = await Order.findById(id).select(
    "-customer -createdAt -updatedAt -__v -clientSecret"
  );

  if (!order) {
    throw new BadRequestError("Order doesn't exist");
  }

  res.json({ order });
};

const getOrderByClientSecrete = async (req, res) => {
  const { clientSecret } = req.body;

  const order = await Order.findOne({ clientSecret }).select(
    "-customer -createdAt -updatedAt -__v -clientSecret"
  );
  console.log(order);

  if (!order) {
    throw new BadRequestError("Order doesn't exist");
  }

  res.json({ order });
};

const getOrdersAdmin = async (req, res) => {
  const queryObject = {};

  if (req.query.status) {
    queryObject.status = req.query.status;
  }

  if (req.query.paymentStatus) {
    queryObject.paymentStatus = req.query.paymentStatus;
  }

  if (req.query.orderId) {
    queryObject._id = req.query.orderId;
  }

  // get orders for admin
  let result = Order.find(queryObject)
    .select("-createdAt -updatedAt -__v")
    .sort({ createdAt: -1 })
    .populate("products.product")
    .populate("shipping.shipping");

  // #################################################################
  // Set up Pagination

  // set limit and page(from query) variable
  const limit = Number(req.query.limit) || 30;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  // edit orders based on limit and page
  result = result.skip(skip).limit(limit);

  // #################################################################
  // Send final orders

  const orders = await result;

  res.json({ nbHits: orders.length, orders });
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestError("Order Id is not valid");
  }

  const { status } = req.body;
  if (!status) {
    throw new BadRequestError("Status is required");
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new BadRequestError("Order doesn't exist");
  }

  if (order.status === "delivered") {
    throw new BadRequestError("Order is already delivered");
  }

  if (order.status === "cancelled") {
    throw new BadRequestError("Order is already cancelled");
  }

  order.status = status;

  await order.save();

  res.status(200).json({ msg: "Order updated", order });
};

const deleteOrder = async (req, res) => {
  // get order id from request params
  const { id } = req.params;

  // check if id is valid
  if (!mongoose.isValidObjectId(id)) {
    throw new BadRequestError("Invalid order id");
  }

  // find order by id and delete
  const order = await Order.findById(id);

  // if order not found throw error
  if (!order) {
    throw new NotFoundError("order not found");
  }

  await Order.findByIdAndDelete(id);
  // send success message
  res.json({ message: "order deleted successfully" });
};

module.exports = {
  createOrderStripe,
  getOrders,
  getOrdersAdmin,
  getOrder,
  getOrderByClientSecrete,
  updateOrder,
  deleteOrder
};
