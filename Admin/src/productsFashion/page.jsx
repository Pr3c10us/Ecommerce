import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const Products = () => {
  const location = useLocation();
  return (
    <main className="flex flex-col gap-y-6 pt-7">
      {location.pathname === "/products" && (
        <h1 className="font-semibold">Products</h1>
      )}
      <Outlet />
    </main>
  );
};

export default Products;
