import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import cancel_cart from "../assets/icons/cancel_cart.svg";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setCart } from "../../redux/asis";

const CartItem = ({ data, index, removeItemFromCart,handleGetCart }) => {
  const [quantity, setQuantity] = React.useState(data.quantity);
  const dispatch = useDispatch();

  const handleAddQuantity = async () => {
    try {
      axios.defaults.withCredentials = true;
      const item = {
        productId: data.product._id,
        size: data.size,
        quantity: quantity,
      };
      const { data: cartData } = await axios.put(
        `${import.meta.env.VITE_API_URL}carts`,
        item,
      );
      dispatch(setCart(cartData.cart));
      handleGetCart();
      toast.success("increased", {
        style: {
          border: "1px solid red",
          padding: "8px 16px",
          color: "green",
          borderRadius: "4px",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg, {
        style: {
          border: "1px solid red",
          padding: "8px 16px",
          color: "red",
          borderRadius: "4px",
        },
      });
    }
  };

  //   useEffect(() => {

  //   }, [quantity]);

  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <section key={index}>
      <div className="my-5 flex items-start justify-between gap-5 border-b-2 border-asisDark pb-4">
        {/* cart image */}
        <img
          src={`${import.meta.env.VITE_BLOB_URL}${data.product.images[0]}`}
          alt="collection_img_2"
          className="h-36 w-[116px] object-contain object-top"
        />
        {/* right hand of the product detail of the cart */}
        <section className="w-4/5">
          {/* Product details */}
          <div className="flex items-start justify-between border-b-2 border-b-asisDark/30 pb-2">
            <div>
              <Link to={`/product/${data.product._id}`}>
                <p className="text-sm font-bold text-asisDark">
                  {data.product.name}
                </p>
              </Link>
              <p className="mt-2 text-xs font-semibold text-black">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(data.totalPrice)}{" "}
                USD{" "}
              </p>
            </div>
            {/* remove item from cart */}
            <button
              onClick={() => removeItemFromCart(data.product._id, data.size)}
            >
              <img
                src={cancel_cart}
                alt="cancel_cart"
                className="w-5 cursor-pointer"
              />
            </button>
          </div>
          <div className="mt-3 flex h-full w-full items-center justify-between text-xs font-semibold text-black">
            <div>
              {/* <p>{data.color}</p> */}
              <p>
                size: <span className="text-sm font-bold">{data.size}</span>
              </p>
            </div>
            <div className="flex h-full place-items-center items-center gap-1 ">
              <p
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity((prev) => prev - 1);
                    handleAddQuantity();
                  }
                }}
                className="cursor-pointer text-3xl"
              >
                {" "}
                -
              </p>
              <div className="flex h-full w-6 flex-1 items-center justify-center border border-asisDark bg-transparent p-2 text-center">
                {" "}
                {quantity}{" "}
              </div>
              <p
                onClick={() => {
                  setQuantity((prev) => prev + 1);
                  handleAddQuantity();
                }}
                className="cursor-pointer text-3xl"
              >
                {" "}
                +
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CartItem;
