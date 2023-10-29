import React, { useState } from "react";
import Order from "./components/order";
import CheckoutCart from "./components/checkoutCart";
const Page = () => {
  return (
    <main className="flex items-stretch py-[6.5vh]">
      <Order />

      <CheckoutCart />
    </main>
  );
};

export default Page;
