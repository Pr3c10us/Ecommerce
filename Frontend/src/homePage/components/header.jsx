import React from "react";
import { GiShop } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../../components/cart";
import { Link } from "react-router-dom";
import axios from "axios";
import { setCart } from "../../../redux/asis";
import { AnimatePresence } from "framer-motion";

const Header = ({ type }) => {
  const [hideCart, setHideCart] = React.useState(false);
  const cartData = useSelector((state) => state.asis.cart);
  const dispatch = useDispatch();

  const handleGetCartContent = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}carts`,
      );
      // setCartData(response.data.products);
      dispatch(setCart(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
    handleGetCartContent();
  }, []);

  return (
    <>
      <AnimatePresence>
        {hideCart && (
          <Cart setHideCart={setHideCart} cartData={cartData.products} />
        )}
      </AnimatePresence>
      {type == 1 ? (
        <nav className="fixed inset-x-0 top-0 z-10  flex h-[8.3vh] w-full items-end justify-between px-[10vw] font-medium">
          <button
            onClick={() => {
              setHideCart((prev) => !prev);
              // setHideWish(false);
            }}
          >
            <img
              src={"/cartIcon.svg"}
              alt="guest icon "
              className="w-6 sm:hidden sm:w-4"
            />{" "}
            <p className="mb-1 hidden items-center gap-x-2 uppercase sm:flex">
              cart <span className="">({cartData.products?.length || 0})</span>
            </p>
          </button>
          <div className="flex w-14 items-end justify-center border-b-2 border-b-asisDark pb-1 sm:w-28">
            {" "}
            <img src="/spade.svg" alt="spade logo" className="w-4 sm:w-6" />
          </div>
          <Link to="/store" className="mb-1 flex items-center gap-1">
            <GiShop className="h-6 w-6 sm:h-5 sm:w-5" />{" "}
            <p className="hidden items-center gap-x-2 uppercase sm:flex">
              Store
            </p>
          </Link>
        </nav>
      ) : (
        <>
          {/* Desktop */}
          <nav className="fixed inset-x-0 top-0 z-10 hidden h-[8.3vh] w-full items-end font-medium sm:flex">
            <div className="flex basis-[55.5%] justify-between px-[10vw]">
              <button
                onClick={() => {
                  setHideCart((prev) => !prev);
                  // setHideWish(false);
                }}
              >
                <img
                  src={"/cartIcon.svg"}
                  alt="guest icon "
                  className="w-6 sm:hidden sm:w-4"
                />{" "}
                <p className="mb-1 hidden items-center gap-x-2 uppercase sm:flex">
                  cart{" "}
                  <span className="">({cartData.products?.length || 0})</span>
                </p>
              </button>

              <Link to="/store" className="mb-1 flex items-center gap-1">
                <GiShop className="h-6 w-6 sm:h-5 sm:w-5" />{" "}
                <p className="hidden items-center gap-x-2 uppercase sm:flex">
                  Store
                </p>
              </Link>
            </div>
            <div className="flex basis-[45.5%] justify-center ">
              <div className="flex w-14 items-end justify-center border-b-2 border-b-asisDark pb-1 sm:w-28">
                {" "}
                <img src="/spade.svg" alt="spade logo" className="w-4 sm:w-6" />
              </div>
            </div>
          </nav>
          {/* mobile */}
          <nav className="fixed inset-x-0 top-0 z-10 flex h-[8.3vh] w-full items-end justify-between px-[10vw] font-medium sm:hidden">
            <button
              onClick={() => {
                setHideCart((prev) => !prev);
                // setHideWish(false);
              }}
            >
              <img
                src={"/cartIcon.svg"}
                alt="guest icon "
                className="w-6 sm:hidden sm:w-4"
              />{" "}
              <p className="mb-1 hidden items-center gap-x-2 uppercase sm:flex">
                cart{" "}
                <span className="">({cartData.products?.length || 0})</span>
              </p>
            </button>
            <div className="flex w-14 items-end justify-center border-b-2 border-b-asisDark pb-1 sm:w-28">
              {" "}
              <img src="/spade.svg" alt="spade logo" className="w-4 sm:w-6" />
            </div>
            <Link to="/store" className="mb-1 flex items-center gap-1">
              <GiShop className="h-6 w-6 sm:h-5 sm:w-5" />{" "}
              <p className="hidden items-center gap-x-2 uppercase sm:flex">
                Store
              </p>
            </Link>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
