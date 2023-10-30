import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./components/nav";
import { BsArrowUp } from "react-icons/bs";

const Layout = () => {
  const location = useLocation();
  return (
    <main>
      <Nav />
      {location.pathname === "/" ? (
        <div className="w-full py-12 flex items-center justify-center gap-2 text-center text-2xl underline ">
          Select an Option <BsArrowUp className="animate-bounce" />
        </div>
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default Layout;
