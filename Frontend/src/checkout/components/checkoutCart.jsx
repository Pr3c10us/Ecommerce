import React from "react";
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

const CheckoutCart = () => {
  const ref = React.useRef(null);
  const cartData = useSelector((state) => state.asis.cart);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

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
        navigate("/shop", { replace: true });
      }
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
    cartData?.products?.length === 0 && navigate("/shop", { replace: true });
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
              <p className="absolute -top-2 left-[13.5rem] text-base font-medium text-black">
                ({cartData?.products?.length})
              </p>
            </div>
            {/* close cart component */}
          </div>
          <div className="max-h-[50vh] overflow-y-scroll">
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
                            USD
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
          <div className="flex flex-col gap-4 border-b-2 border-b-asisDark ">
            <div className="mt-4 flex items-center justify-between  text-sm font-bold">
              <p>Total</p>
              <p>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(cartData.totalPrice)}{" "}
                NGN
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between  pb-4 text-[13px]/[20px] font-medium">
              <p>shipping</p>
              <p>calculated at checkout</p>
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
