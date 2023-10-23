import React from "react";
// importing icons
import header_logo from "../assets/icons/homeLogo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import guestIcon from "../assets/icons/guest.svg";
import cartIcon from "../assets/icons/cart-icon.svg";
import { GiShop } from "react-icons/gi";
import axios from "axios";

const Header = ({ setHideCart, cartLength }) => {
  const location = useLocation();

  React.useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);

  // if (!isLoaded) {
  //   return <Loading />;
  // }

  return (
    <nav className="fixed inset-x-0 top-0 z-10 flex  h-[8.3vh] w-full items-end justify-between px-[10vw] font-medium backdrop-blur-sm">
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
          cart <span className="">({cartLength || 0})</span>
        </p>
      </button>
      <Link
        to="/"
        className="flex w-14 items-end justify-center border-b-2 border-b-asisDark pb-1 sm:w-28"
      >
        {" "}
        <img src="/spade.svg" alt="spade logo" className="w-4 sm:w-6" />
      </Link>
      <Link to="/store" className="flex items-center mb-1 gap-1">
        <GiShop className="h-6 w-6 sm:w-5 sm:h-5" />{" "}
        <p className="hidden items-center gap-x-2 uppercase sm:flex">
          Store
        </p>
      </Link>
    </nav>
  );
};

export default Header;
