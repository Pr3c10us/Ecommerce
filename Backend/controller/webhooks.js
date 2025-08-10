const Order = require("../models/orders");
const Product = require("../models/products");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const crypto = require("node:crypto");

const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  // console.log({ h: req.headers, b: req.body });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRETE
    );
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  const client_secrete = event.data.object.client_secret;
  if (!client_secrete) return res.status(200).send("No client_secrete found");

  const order = await Order.findOne({ clientSecret: client_secrete });
  if (!order) {
    return res.status(200).send();
  }

  switch (event.type) {
    case "payment_intent.canceled":
      order.paymentStatus = "canceled";
      break;
    case "payment_intent.payment_failed":
      order.paymentStatus = "failed";
      break;
    case "payment_intent.processing":
      order.paymentStatus = "processing";
      break;
    case "payment_intent.succeeded":
      order.paymentStatus = "successful";
      // // get all the items in the order and subract quantity from the database
      // order.products.forEach(async (product) => {
      //     const { product: productId, size, quantity } = product;
      //     const productInDb = await Product.findById(productId);
      //     productInDb.countInStock = productInDb.countInStock.map(
      //         (item) => {
      //             if (item.size === size) {
      //                 item.quantity -= quantity;
      //             }
      //             return item;
      //         }
      //     );
      //     await productInDb.save();
      // });
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  await order.save();

  res.status(200).send();
};

const paystackWebhook = async (req, res) => {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRETE_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(200).send();
  }
  if (req.body.event === "charge.success") {
    const { reference } = req.body.data;
    try {
      const order = await Order.findOne({ clientSecret: reference });
      if (!order) {
        return res.status(200).send();
      }
      order.paymentStatus = "successful";
      await order.save();
    } catch (error) {
      console.log(error);
      return res.status(400).send();
    }
  }

  if (req.body.event === "charge.failed") {
    const { reference } = req.body.data;
    try {
      const order = await Order.findOne({ clientSecret: reference });
      if (!order) {
        return res.status(200).send();
      }
      order.paymentStatus = "failed";
      await order.save();
    } catch (error) {
      console.log(error);
      return res.status(200).send();
    }
  }
  return res.status(200).send();
};

module.exports = {
  stripeWebhook,
  paystackWebhook,
};
