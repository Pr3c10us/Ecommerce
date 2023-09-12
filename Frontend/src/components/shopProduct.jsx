import React from "react";
import { Link } from "react-router-dom";
import arrow from "../assets/icons/upRightArrow.svg";

const Products = ({ product, index }) => {
  const renderCollaborations = () => {
    if (collaborations) {
      return collaborations.map((data, index) => (
        <p key={index} className="text-xs text-[#17A500]">
          {data}
        </p>
      ));
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col items-center justify-between gap-4 md:items-start ${
        index % 2 === 0
          ? "md:flex-row-reverse md:gap-24"
          : "md:flex-row md:gap-12"
      } `}
    >
      <div className="h-min w-full max-w-[38rem] md:border border-[#878787] ">
        <img
          src={`${import.meta.env.VITE_BLOB_URL}${product.images[0]}`}
          alt="products_img"
          className="object-cover object-top w-full"
        />
      </div>
      <div className="flex flex-col items-center gap-y-4 font-semibold  uppercase md:max-w-sm md:items-start md:gap-y-12 ">
        <p
          className="text-center text-2xl font-semibold md:font-bold sm:text-4xl md:text-left md:text-2xl"
        >
          {product.name}
        </p>
        <p className="text-sm sm:text-base font-semibold text-asisDark md:text-sm">
          {product.description}
        </p>
        <div className="flex items-center md:items-start">
          <Link
            className="flex w-auto gap-x-2  border-2 border-asisDark px-2 text-sm md:text-base sm:px-4 py-1 md:py-2"
            to={`/product/${product._id}`}
          >
            View Product Page
            <img src={arrow} alt="arrow" className="w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
// {
//   Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//   }).format(price);
// }
