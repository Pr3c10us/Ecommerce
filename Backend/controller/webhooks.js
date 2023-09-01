const Order = require("../models/orders");
const Product = require("../models/products");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

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
            // get all the items in the order and subract quantity from the database
            order.products.forEach(async (product) => {
                const { product:productId, size, quantity } = product;
                const productInDb = await Product.findById(productId);
                const countInStock = productInDb.countInStock.find(
                    (item) => item.size === size
                );
                countInStock.quantity -= quantity;
                await productInDb.save();
            });
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    await order.save();

    res.status(200).send();
};

const flutterwaveWebhook = async (req, res) => {
    res.status(200).send();
};

module.exports = {
    stripeWebhook,
    flutterwaveWebhook,
};
