const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    products: [
      // {
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: "Product",
      //     },
      //     measurements: [
      //         {
      //             name: {
      //                 type: String,
      //             },
      //             unit: {
      //                 type: String,
      //                 default: "inches",
      //             },
      //             value: {
      //                 type: Number,
      //             },
      //         },
      //     ],
      //     quantity: {
      //         type: Number,
      //         default: 1,
      //     },
      //     price: {
      //         type: Number,
      //         required: true,
      //     },
      //     totalPrice: {
      //         type: Number,
      //         required: true,
      //     },
      // },
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        size: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    expireAfterSeconds: 10,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
