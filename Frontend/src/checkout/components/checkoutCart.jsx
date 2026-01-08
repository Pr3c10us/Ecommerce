import React, { useState } from "react";
import cancel_cart from "../../assets/icons/cancel_cart.svg";
import cartIcon from "../../assets/icons/cart-icon.svg";
import down from "../../assets/icons/down.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import CartLoading from "../../components/cartLoader";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../../redux/asis";
import SpecialChar from "../../components/specialChar";
import { useNavigate } from "react-router-dom";
import VowelItalicizer from "../../components/vowelItalicizer";
import CartItem from "../../components/cartItem";

const CheckoutCart = () => {
  const ref = React.useRef(null);
  const cartData = useSelector((state) => state.asis.cart);
  const orderDetails = useSelector((state) => state.asis.order);
  const [shippingFee, setShippingFee] = useState(0);

  const handleFetchShippingDetails = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}shippings/${orderDetails.shipping
        }`;
      let { data } = await axios.get(apiUrl);
      setShippingFee(data.fee);
    } catch (error) {
      setShippingFee(0);
      console.log(error);
    }
  };
  React.useEffect(() => {
    handleFetchShippingDetails();
  }, [orderDetails]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleGetCartContent = async () => {
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}carts`,
      );
      // console.log(response.data);
      // setCartData(response.data);
      if (response.data.products.length === 0) {
        navigate("/store", { replace: true });
      }
      dispatch(setCart(response.data));
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  React.useEffect(() => {
    cartData?.products?.length === 0 && navigate("/store", { replace: true });
    handleGetCartContent();
    handleFetchShippingDetails();
  }, []);

  const removeItemFromCart = async (id, size) => {
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      const item = {
        productId: id,
        size: size,
      };
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}carts/removeItem`,
        {
          data: item,
        },
      );
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
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      axios.defaults.withCredentials = true;
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}carts/`);
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
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
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
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="relative hidden min-w-[29rem] overflow-hidden uppercase lg:block ">
      {isLoading && <CartLoading />}
      {!isLoading && (
        // Cart with items
        <section className="h-full p-5">
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
              <p className="absolute top-0 left-[15rem] text-base font-medium text-black">
                ({cartData?.products?.length})
              </p>
            </div>
            {/* close cart component */}
          </div>
          <div className="max-h-[50vh] overflow-y-scroll">
            {cartData.products.map((data, index) => {
              return (
                <CartItem
                  key={data._id}
                  data={data}
                  index={index}
                  removeItemFromCart={removeItemFromCart}
                  handleGetCart={handleGetCartContent}
                />
              );
            })}
          </div>
          {/* total calculation  */}
          <div className="flex flex-col gap-4 border-b-2 border-b-asisDark ">
            <div className="mt-4 flex items-center justify-between  text-sm font-semibold">
              <p>SubTotal</p>
              <p>
                {Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(cartData.totalPrice)}{" "}
                NGN
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between  text-[13px]/[20px] font-medium">
              <p>shipping</p>
              <p>
                {!orderDetails.shipping
                  ? "Calculated at Shipping"
                  : `${Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(shippingFee)}`}{" "}
              </p>
            </div>
            <div className="flex items-center justify-between border-t-2 border-t-asisDark py-4  text-sm font-bold">
              <p>SubTotal</p>
              <p>
                {Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(cartData.totalPrice + (shippingFee || 0))}{" "}
                NGN
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="px-2 py-4 text-right font-semibold italic underline"
              onClick={() => {
                clearCart();
              }}
            >
              Clear your Cart
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CheckoutCart;
