const router = require("express").Router();
const express = require("express");


const { stripeWebhook, paystackWebhook } = require("../controller/webhooks");

router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhook
);
router.post("/paystack", express.raw({ type: "application/json" }) , paystackWebhook);

module.exports = router;
