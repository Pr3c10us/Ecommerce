import React from "react";
import { Outlet } from "react-router-dom";

const Products = () => {
  return (
    <main className="space-y-6 pt-7">
      <h1 className="font-semibold">Products</h1>
      <Outlet />
    </main>
  );
};

export default Products;
