import React from "react";
import { GiShop } from "react-icons/gi";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../../components/cart";
import { Link } from "react-router-dom";

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
      {hideCart && (
        <Cart setHideCart={setHideCart} cartData={cartData.products} />
      )}
      {type == 1 ? (
        <nav className="fixed inset-x-0 top-0 z-10  flex h-[8.3vh] w-full items-end justify-between px-[10vw] font-bold">
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
          <Link to="/shop">
            <GiShop className="h-6 w-6 sm:hidden sm:w-4" />{" "}
            <p className="mb-1 hidden items-center gap-x-2 uppercase sm:flex">
              Shop
            </p>
          </Link>
        </nav>
      ) : (
        <>
          {/* Desktop */}
          <nav className="fixed inset-x-0 top-0 z-10 hidden h-[8.3vh] w-full items-end font-bold sm:flex">
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

              <Link to="/shop">
                <GiShop className="h-6 w-6 sm:hidden sm:w-4" />{" "}
                <p className="mb-1 hidden items-center gap-x-2 uppercase sm:flex">
                  Shop
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
          <nav className="fixed inset-x-0 top-0 z-10 flex h-[8.3vh] w-full items-end justify-between px-[10vw] font-bold sm:hidden">
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
            <Link to="/shop">
              <GiShop className="h-6 w-6 sm:hidden sm:w-4" />{" "}
              <p className="mb-1 hidden items-center gap-x-2 uppercase sm:flex">
                Shop
              </p>
            </Link>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
