import React from "react";
import cancel_cart from "../assets/icons/cancel_cart.svg";
import cartIcon from "../assets/icons/cart-icon.svg";
import down from "../assets/icons/down.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import CartLoading from "./cartLoader";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../redux/asis";
import SpecialChar from "./specialChar";
import VowelItalicizer from "./vowelItalicizer";

const Cart = ({ setHideCart }) => {
  const ref = React.useRef(null);
  const cartData = useSelector((state) => state.asis.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  const handleEffect = async () => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setHideCart(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };
  React.useEffect(() => {
    handleEffect();
  }, [ref]);

  const handleGetCartContent = async () => {
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}carts`);
      // console.log(response.data);
      // setCartData(response.data);
      dispatch(setCart(response.data));
      setIsLoading(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load cart items", {
        style: {
          border: "1px solid red",
          padding: "8px 16px",
          color: "red",
          borderRadius: "4px",
        },
      });
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    handleGetCartContent();
    console.log(cartData);
  }, []);

  const removeItemFromCart = async (id, size) => {
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const item = {
        productId: id,
        size: size,
      };
      await axios.delete(`${import.meta.env.VITE_API_URL}carts/removeItem`, {
        data: item,
      });
      console.log(item);
      toast.success("Item removed from cart", {
        style: {
          border: "1px solid green",
          padding: "8px 16px",
          color: "green",
          borderRadius: "4px",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
      await handleGetCartContent();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item, try again", {
        style: {
          border: "1px solid red",
          padding: "8px 16px",
          color: "red",
          borderRadius: "4px",
        },
      });
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      await axios.delete(`${import.meta.env.VITE_API_URL}carts/`);
      toast.success("Item removed from cart", {
        style: {
          border: "1px solid green",
          padding: "8px 16px",
          color: "green",
          borderRadius: "4px",
        },
        iconTheme: {
          primary: "green",
          secondary: "#FFFAEE",
        },
      });
      await handleGetCartContent();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item, try again", {
        style: {
          border: "1px solid red",
          padding: "8px 16px",
          color: "red",
          borderRadius: "4px",
        },
      });
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref} className="fixed right-7 top-12 z-20 ml-auto mt-4">
      <div className="absolute right-0 min-w-[29rem] overflow-hidden bg-[url('./assets/images/bg_img.png')] uppercase shadow-[-7px_8px_30px_0px_#00000033]">
        {isLoading && <CartLoading />}
        {!isLoading && cartData?.products?.length >= 1 ? (
          // Cart with items
          <section className="p-5">
            <div className="item-center relative flex justify-between border-b-2 border-asisDark pb-10">
              <div>
                <p className="text-4xl font-medium uppercase">
                  {/* <span className="mr-1 font-normal">/</span>y
                    <SpecialChar char={`o`} />
                    ur c
                    <SpecialChar char={`a`} />
                    rt */}
                  / <VowelItalicizer text="your cart" />
                </p>
                <p className="absolute -top-2 left-[13.5rem] text-base font-medium text-black">
                  ({cartData?.products?.length})
                </p>
              </div>
              {/* close cart component */}
              <img
                src={cancel_cart}
                alt="cancel_cart"
                className="cursor-pointer"
                onClick={() => setHideCart(false)}
              />
            </div>
            <div className="max-h-[40vh] overflow-y-scroll">
              {cartData.products.map((data, index) => {
                return (
                  <section key={index}>
                    <div className="my-5 flex items-start justify-between gap-5 border-b-2 border-asisDark pb-4">
                      {/* cart image */}
                      <img
                        src={`${import.meta.env.VITE_BLOB_URL}${
                          data.product.images[0]
                        }`}
                        alt="collection_img_2"
                        className="h-36 w-[116px] object-contain object-top"
                      />
                      {/* right hand of the product detail of the cart */}
                      <section className="w-4/5">
                        {/* Product details */}
                        <div className="flex items-start justify-between border-b-2 border-b-asisDark/30 pb-2">
                          <div>
                            <Link to={`/product/${data.product._id}`}>
                              <p className="w-[212px] text-sm font-bold text-asisDark">
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
                            onClick={() =>
                              removeItemFromCart(data.product._id, data.size)
                            }
                          >
                            <img
                              src={cancel_cart}
                              alt="cancel_cart"
                              className="w-5 cursor-pointer"
                            />
                          </button>
                        </div>
                        <div className="mt-3 flex w-full items-start justify-between text-xs font-semibold text-black">
                          <div>
                            {/* <p>{data.color}</p> */}
                            <p>
                              size:{" "}
                              <span className="text-sm font-bold">
                                {data.size}
                              </span>
                            </p>
                          </div>
                          <div className="flex items-center gap-1 ">
                            <p> q.ty:{data?.qty}</p>
                            <img src={down} alt="down" />
                          </div>
                        </div>
                      </section>
                    </div>
                  </section>
                );
              })}
            </div>
            {/* total calculation  */}
            <div className="gap- flex flex-col border-b-2 border-b-asisDark ">
              <div className="mt-4 flex items-center justify-between  text-sm font-bold">
                <p>Total</p>
                <p>
                  {Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(cartData.totalPrice)}{" "}
                  USD
                </p>
              </div>
              <div className="mt-3 flex items-center justify-between  pb-4 text-[13px]/[20px] font-medium">
                <p>shipping</p>
                <p>calculated at checkout</p>
              </div>
            </div>
            {/* Link to checkout */}
            <Link to="/checkout">
              <button
                className="mt-5 flex w-full cursor-pointer items-center justify-center bg-asisDark py-3 text-sm font-semibold uppercase text-[#FFFFFF]"
                onClick={() => {
                  setHideCart(false);
                }}
              >
                checkout
              </button>
            </Link>
            <button
              className="mt-4 w-full text-right font-semibold italic underline"
              onClick={() => {
                clearCart();
              }}
            >
              Clear your Cart
            </button>
          </section>
        ) : (
          // Empty cart
          <section className="relative w-full px-3 py-6">
            <div className="flex flex-col items-center">
              <div className="item-center relative flex w-full justify-between border-b border-asisDark pb-8">
                <div>
                  <p className="text-4xl font-medium uppercase">/your cart</p>
                  <p className="absolute -top-1 left-52 text-base font-medium text-black">
                    {/* ({cartData?.products?.length}) */}
                  </p>
                </div>
                <img
                  src={cancel_cart}
                  alt="cancel_cart"
                  className="cursor-pointer"
                  onClick={() => setHideCart(false)}
                />
              </div>
              <img src={cartIcon} alt="cartIcon" className="opacity-30 " />
              <div className="mt-4 flex w-full items-center justify-center bg-[#525050] py-2 text-sm font-semibold text-[#FFFEF5]">
                cart is empty
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Cart;
