import React from "react";
// importing icons
import header_logo from "../assets/icons/header_logo.svg";
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
      className={`sticky top-[-66px] z-10 w-full pt-[10px] uppercase ${
        location.pathname == "/homepage" && "hidden"
      }`}
    >
      <section className=" flex justify-end px-4 py-3">
        <div className="flex gap-6">
          <div className="flex w-[139px] cursor-pointer items-center gap-3 border border-asisDark px-[8px] py-[5px] font-[500] text-asisDark ">
            <img src={globe} alt="globe" />
            <p className="text-xs">language</p>
            <img src={down} alt="down" />
          </div>
          <div className="item-center flex h-[32px] w-[99px]  cursor-pointer justify-center border border-asisDark px-[8px] py-[12px] font-[500] text-asisDark">
            <div className="flex items-center gap-2">
              <img src={flag} alt="globe" />
              <p className="text-xs">ngn</p>
              <img src={down} alt="down" />
            </div>
          </div>
        </div>
      </section>
      <div className="flex  justify-between border-y border-asisDark backdrop-blur-md ">
        <div className="flex ">
          <Link
            to="/shop"
            className="flex flex-1 cursor-pointer justify-center px-16 py-2.5 text-[14px]/[21px] font-[600] text-[#] text-asisDark  max-lg:hidden"
          >
            <p className="flex items-center gap-x-2">
              <img src={guestIcon} alt="guest icon " /> Guest
            </p>
          </Link>
        </div>
        <Link
          className="flex flex-1 py-1 justify-center border-x border-x-asisDark"
          to="/homepage"
        >
          <img
            src={header_logo}
            alt="header_logo"
            className="ml-5 cursor-pointer"
          />
        </Link>
        <div className="flex">
          {location.pathname !== "/checkout" && (
            <div
              onClick={() => {
                setHideCart((prev) => !prev);
                // setHideWish(false);
              }}
              className="flex min-w-[172px] flex-1 cursor-pointer justify-center  px-16 py-2.5 text-[14px]/[21px] font-[600] text-[#] text-asisDark  max-lg:hidden"
            >
              <p className="flex items-center gap-x-2">
                cart <span className="">({cartLength || 0})</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
