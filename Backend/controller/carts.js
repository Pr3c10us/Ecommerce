const { BadRequestError } = require("../errors/index.js");
const Cart = require("../models/carts.js");
const Product = require("../models/products.js");
const mongoose = require("mongoose");

const editCart = async (req, res) => {
    const { productId, size, quantity } = req.body;
    if (!productId || !size || !quantity) {
        throw new BadRequestError("Please fill all the fields");
    }

    if (!mongoose.isValidObjectId(productId)) {
        throw new BadRequestError("Product Id is not valid");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new BadRequestError("Product doesn't exist");
    }

    // check if size with quantity is available
    const sizeExist = product.countInStock.find(
        (item) => item.size === size && item.quantity >= quantity
    );
    if (!sizeExist) {
        throw new BadRequestError(
            `quantity of size ${size} in stock is less than ${quantity}`
        );
    }

    const cartId = req.cart;

    if (!cartId) {
        const cart = new Cart({
            products: [
                {
                    product,
                    size,
                    quantity,
                    price: product.price,
                    totalPrice: product.price * quantity,
                },
            ],
            totalPrice: product.price * quantity,
        });
        await cart.save();
        return res
            .status(201)
            .cookie("cart", cart._id, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                httpOnly: true,
                signed: true,
            })
            .json({
                msg: "Product added to cart",
                cart: cart,
            });
    } else {
        const cart = await Cart.findById(cartId).populate(
            "products.product",
            "name price images"
        );
        const productExist = cart.products.find(
            (item) =>
                item.product._id.toString() === product._id.toString() &&
                item.size === size
        );

        // if (productExist) res.send("true");
        // if (!productExist) res.send("false");
        // console.log(productExist);
        // return
        if (productExist) {
            // if (productExist.quantity + quantity > sizeExist.quantity) {
            //     throw new BadRequestError(
            //         `quantity of size ${size} in stock is less than ${quantity}`
            //     );
            // }
            // productExist.quantity += quantity;
            // productExist.totalPrice += product.price * quantity;
            productExist.quantity = quantity;
            productExist.totalPrice = product.price * quantity;
            // cart.totalPrice += product.price * quantity;
        } else {
            cart.products.push({
                product,
                size,
                quantity,
                price: product.price,
                totalPrice: product.price * quantity,
            });
            // cart.totalPrice += product.price * quantity;
        }

        cart.totalPrice = cart.products.reduce(
            (acc, item) => acc + item.totalPrice,
            0
        );
        await cart.save();
        return res.status(201).json({
            msg: "Product added to cart",
            cart: cart,
        });
    }
};

const getCart = async (req, res) => {
    const cartId = req.cart;
    if (!cartId) {
        return res.status(200).json({
            products: [],
            totalPrice: 0,
        });
    }

    const cart = await Cart.findById(cartId).populate(
        "products.product",
        "name price images"
    );

    res.status(200).json(cart);
};

const removeItem = async (req, res) => {
    const cartId = req.cart;

    if (!cartId) {
        throw new BadRequestError("Cart doesn't exist");
    }

    const { productId, size } = req.body;
    console.log(req.body);

    if (!productId || !size) {
        throw new BadRequestError("Please fill all the fields");
    }
    if (!mongoose.isValidObjectId(productId)) {
        throw new BadRequestError("Product Id is not valid");
    }

    const cart = await Cart.findById(cartId);

    if (!cart) {
        throw new BadRequestError("Cart doesn't exist");
    }

    const productExist = cart.products.find(
        (item) =>
            item.product.toString() === productId.toString() &&
            item.size === size
    );

    if (!productExist) {
        throw new BadRequestError("Product doesn't exist in cart");
    }

    cart.products = cart.products.filter(
        (item) =>
            item.product.toString() !== productId.toString() ||
            item.size !== size
    );

    cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.totalPrice,
        0
    );

    await cart.save();

    res.status(200).json({
        msg: "Product removed from cart",
    });
};

const clearCart = async (req, res) => {
    const cartId = req.cart;
    if (!cartId) {
        return res.status(200).json({
            msg: "Cart is already empty",
        });
    }
    await Cart.findByIdAndDelete(cartId);
    res.status(200)
        .cookie("cart", "", {
            expires: new Date(Date.now() + 1000),
        })
        .json({
            msg: "Cart is cleared",
        });
};

module.exports = {
    getCart,
    editCart,
    removeItem,
    clearCart,
};
