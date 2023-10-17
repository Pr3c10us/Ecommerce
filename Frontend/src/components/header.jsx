import React from "react";
// importing icons
import header_logo from "../assets/icons/homeLogo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import guestIcon from "../assets/icons/guest.svg";
import cartIcon from "../assets/icons/cart-icon.svg";
import {BiShoppingBag} from 'react-icons/bi'

const Header = ({ setHideCart, setHideWish, cartLength, wishlistData }) => {
  const location = useLocation();

  React.useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  // if (!isLoaded) {
  //   return <Loading />;
  // }

  return (
    <div
      className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 pt-5 uppercase text-asisDark md:px-[5vw]`}
    >
      <button
        onClick={() => {
          setHideCart((prev) => !prev);
          // setHideWish(false);
        }}
        className="flex shadow-xl items-center justify-center gap-x-2 rounded-md border-asisDark text-xs font-semibold sm:text-base md:border md:px-12 md:py-2 md:backdrop-blur-lg "
      >
        {" "}
        <img
          src={"/cartIcon.svg"}
          alt="guest icon "
          className="w-6 md:hidden md:w-4"
        />{" "}
        <p className="hidden items-center gap-x-2 uppercase md:flex">
          cart <span className="">({cartLength || 0})</span>
        </p>
      </button>
      <Link className={`flex flex-1 items-center justify-center `} to="/">
        <img
          src={header_logo}
          alt="header_logo"
          className="h-8 cursor-pointer"
        />
      </Link>
      <button className="flex shadow-xl items-center justify-center gap-x-2 rounded-md border-asisDark text-xs font-semibold sm:text-base md:border md:px-12 md:py-2  md:backdrop-blur-lg">
        <BiShoppingBag className="w-6 text-asisDark h-6" />{" "}
        <p className="hidden items-center uppercase md:flex">Shop</p>
      </button>
    </div>
  );
};

export default Header;
