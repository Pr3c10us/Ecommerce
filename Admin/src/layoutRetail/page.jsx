import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <h1>Layout Retail</h1>
      <Outlet />
    </main>
  );
};

export default Layout;
