import React from "react";
import VowelItalicizer from "../../components/vowelItalicizer";
import { Link } from "react-router-dom";

const FrameOne = ({ product }) => {
  return (
    <article className="flex aspect-[9/16] w-[90vw] bg-hite font-playfair sm:aspect-video ">
      <section className="relative z-10 flex w-full flex-col sm:basis-[68%]">
        <div className="flex h-full w-full flex-1 ">
          <div className="h-full w-full overflow-hidden sm:relative sm:basis-[74%] ">
            <img
              src={`${import.meta.env.VITE_BLOB_URL}${product.images[0]}`}
              alt={product.name}
              className="absolute left-0 top-0 -z-10 h-full w-full object-cover object-top"
            />
          </div>
          <div className="hidden h-full basis-[26%] items-end px-4 pt-10 text-center text-[0.5rem] sm:flex lg:text-xs xl:px-8 xl:text-sm">
            <p>{product?.description.split(" ").slice(0, 40).join(" ")}...</p>
          </div>
        </div>
        <div className="flex h-full w-full flex-1 flex-col-reverse items-end px-2 sm:grid">
          <div className="flex sm:hidden w-full h-full justify-center">
            <Link className="flex gap-1 text-xs h-max p-2 lg:text-lg bg-white">
              View Product{" "}
              <img
                src="/arrowBlack.svg"
                alt="arrowBlack"
                className="w-2 lg:w-4"
              />
            </Link>
          </div>
          <div className="flex h-full justify-center text-center sm:h-auto sm:items-end">
            <p className="text-xs font-bold  sm:max-w-[15rem] sm:text-[0.55rem] text-black  lg:max-w-xs lg:text-sm">
              {product?.brief}
              {product?.brief}
            </p>
          </div>
          <div className="flex h-full w-full items-end text-center justify-center sm:justify-start sm:items-start sm:pl-11 sm:text-right text-black ">
            <h1 className="text-[10vw] font-bold capitalize sm:translate-x-[5vw] sm:text-5xl sm:font-medium lg:text-7xl xl:text-8xl">
              <VowelItalicizer text={product?.name} />
            </h1>
          </div>
        </div>
      </section>
      <section className="hidden h-full basis-[32%] flex-col py-6 sm:flex">
        <div className="relative flex h-full items-center">
          <img
            src={`${import.meta.env.VITE_BLOB_URL}${
              product.images[1] || product.images[0]
            }`}
            alt={product.name}
            className="absolute h-4/5 w-[90%] object-cover object-top"
          />
        </div>
        <Link className="flex justify-end gap-1 pr-10 text-xs  lg:text-lg">
          View Product{" "}
          <img src="/arrowBlack.svg" alt="arrowBlack" className="w-2 lg:w-4" />
        </Link>
      </section>
    </article>
  );
};

export default FrameOne;
