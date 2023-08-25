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
      className={`flex justify-between ${
        index % 2 === 0 ? "flex-row-reverse gap-24" : "flex-row gap-12"
      } `}
    >
      <div className="h-min w-full max-w-[32rem] border border-[#878787] ">
        <img
          src={`${import.meta.env.VITE_BLOB_URL}${product.images[0]}`}
          alt="products_img"
          className="object-cover object-top"
        />
      </div>
      <div className="flex max-w-sm flex-col gap-y-12 font-semibold uppercase">
        <p className="text-2xl font-bold">{product.name}</p>
        <p className="text-sm font-semibold text-asisDark">
          {product.description}
        </p>
        <div className="flex items-start">
          <Link
            className="flex w-auto gap-x-2  border border-asisDark px-4 py-2"
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
