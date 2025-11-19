import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import cancel_cart from "../assets/icons/cancel_cart.svg";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { setCart } from "../../redux/asis";
import { FaPen } from "react-icons/fa6";

const CartItem = ({ data, index, removeItemFromCart, handleGetCart }) => {
  const [quantity, setQuantity] = React.useState(data.quantity);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();

  const handleAddQuantity = async () => {
    setIsLoading(true);
    if (quantity <= 0) {
      return removeItemFromCart(data.product._id, data.size);
    }
    try {
      axios.defaults.withCredentials = true;
      const item = {
        productId: data.product._id,
        size: data.size,
        quantity: quantity,
      };
      const { data: cartData } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}carts`,
        item,
      );
      dispatch(setCart(cartData.cart));
      // handleGetCart();
      toast.success("Quantity changed", {
        style: {
          border: "1px solid green",
          padding: "8px 16px",
          color: "green",
          borderRadius: "4px",
        },
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setQuantity(data.quantity);
      toast.error(error?.response?.data?.msg, {
        style: {
          border: "1px solid red",
          padding: "8px 16px",
          color: "red",
          borderRadius: "4px",
        },
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
                <p className="text-xs font-bold text-asisDark sm:text-sm">
                  {data.product.name}
                </p>
              </Link>
              <p className="mt-2 text-[0.7rem] font-semibold text-black sm:text-xs">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(data.totalPrice)}{" "}
                USD{" "}
              </p>
            </div>
            {/* remove item from cart */}
            <button
              className="cursor-pointer text-[0.5rem] font-semibold capitalize underline sm:text-xs "
              onClick={() => removeItemFromCart(data.product._id, data.size)}
            >
              remove Item
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
              <input
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                }}
                className="peer flex h-full w-8 flex-1 items-center justify-center border border-asisDark bg-transparent py-2 text-center text-xs"
              />
              <div
                onClick={() => {
                  if (quantity === data.quantity) return;
                  handleAddQuantity();
                }}
                className={`flex h-full w-16 cursor-pointer items-center justify-center bg-asisDark py-2 text-center text-xs text-white ${
                  quantity === data.quantity
                    ? "hidden cursor-default opacity-50 peer-focus:flex"
                    : "flex"
                }`}
              >
                {" "}
                {/* <FaPen className="h-4 w-4" /> */}
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-t-white"></div>
                ) : (
                  "Update"
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default CartItem;