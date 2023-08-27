import React from "react";
// importing icons
import header_logo from "../assets/icons/homeLogo.svg";
import globe from "../assets/icons/globe.svg";
import down from "../assets/icons/down.svg";
import flag from "../assets/icons/flag.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import guestIcon from "../assets/icons/guest.svg";

const Header = ({ setHideCart, setHideWish, cartLength, wishlistData }) => {
  const location = useLocation();
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <div
      className={`sticky top-0 z-10 w-full px-4 pt-4 uppercase backdrop-blur-md ${
        location.pathname == "/" && "hidden"
      }`}
    >
      <div className="flex justify-between border-y border-asisDark backdrop-blur-md ">
        <div className="flex">
          <div
            onClick={() => {
              setHideCart((prev) => !prev);
              // setHideWish(false);
            }}
            className="md:py flex cursor-pointer justify-center px-2  py-2.5 text-xs font-[600] text-[#] text-asisDark sm:text-base md:px-16 "
          >
            <p className="flex items-center gap-x-2">
              cart <span className="">({cartLength || 0})</span>
            </p>
          </div>
        </div>
        <Link
          className={`flex flex-1 items-center justify-center border-x border-x-asisDark py-1 `}
          to="/"
        >
          <img
            src={header_logo}
            alt="header_logo"
            className="ml-5 h-4 cursor-pointer md:h-8"
          />
        </Link>
        <div className="flex ">
          <Link
            to="/shop"
            className="flex cursor-pointer justify-center px-2 py-2.5 text-xs font-[600] text-[#] text-asisDark sm:text-base md:px-16 md:py-2.5 "
          >
            <p className="flex items-center gap-x-2">
              <img
                src={guestIcon}
                alt="guest icon "
                className="w-4 sm:w-auto"
              />{" "}
              Guest
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
