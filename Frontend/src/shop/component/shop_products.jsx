import React from "react";
import Products from "../../components/shopProduct";
import { Link } from "react-router-dom";

const ShopProducts = ({ data }) => {
  return (
    <section className="mt-5 flex h-full flex-1">
      <div className="flex h-full w-full flex-col items-center justify-center gap-y-24">
        {/* Map through each product in data */}
        {data.products?.map((product, index) => (
          <div key={product._id} className="flex w-full items-center justify-center flex-1">
            {/* Render the Products component for each product */}
            <Products product={product} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopProducts;
