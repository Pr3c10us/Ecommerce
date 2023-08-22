import React from "react";

const Products = ({ name, price, collaborations, images }) => {
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
    <div className="aspect-[9/16] flex justify-between flex-col h-[28rem] w-64 cursor-pointer ">
      <div className="h-96 w-64 border-[1px] border-[#878787] max-md:w-full">
        <img
          src={`${import.meta.env.VITE_BLOB_URL}${images[0]}`}
          alt="products_img"
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="font-semibold uppercase">
        <p className="text-sm font-bold">{name}</p>
        <div className="flex gap-4">{renderCollaborations()}</div>
        <p className="text-sm font-semibold text-asisDark">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(price)}{" "}
          usd
        </p>
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
