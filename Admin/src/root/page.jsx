import React from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/homeLogo.svg";
import { useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();
  return (
    <main className="xl:px-44 px-4 sm:px-12 py-5 space-y-12">
      <section className="flex flex-col items-center gap-y-3">
        <img src={Logo} alt="Logo" className="h-8" />
        <div className="relative grid w-full font-[500] grid-cols-2 place-items-center pb-3 text-sm sm:text-base md:text-lg text-asisDark">
          <Link
            to="/fashion/"
            className={`${
              !location.pathname.includes("/fashion") && "text-asisDark/50"
            }`}
          >
            Asis Fashion Store
          </Link>
          <Link
            to="/retail/"
            className={`${
              !location.pathname.includes("/retail") && "text-asisDark/50"
            }`}
          >
            Asis Retail Store
          </Link>
          <div className="absolute bottom-0 h-0.5 w-full bg-asisDark/20">
            <div
              className={`absolute h-full w-1/2 bg-asisDark transition-all duration-200 ${
                location.pathname.includes("/fashion") && "translate-x-0"
              }
                ${location.pathname.includes("/retail") && "translate-x-full"}
             `}
            ></div>
          </div>
        </div>
      </section>
      <Outlet />
    </main>
  );
};

export default Root;
