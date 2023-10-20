import React from "react";
import ComponentMouseFollow from "../components/componentMouseFollow";
import { motion } from "framer-motion";
import VowelItalicizer from "../../components/vowelItalicizer";
import { Link } from "react-router-dom";

const SelectedThree = ({ product, setNavType }) => {
  React.useEffect(() => {
    setNavType(1);
  }, []);
  const words = product?.description.split(" ");

  const halfDesc = words.slice(0, 60).join(" ");
  const restDesc = words.slice(60).join(" ");

  return (
    <section className="flex h-full w-full flex-col justify-center px-[5.2vw] py-[10vh] lg:px-[10.4vw]">
      <article className="mb-[6vh] flex">
        <div className="hidden w-[18vw] flex-col items-center text-center font-extrabold uppercase lg:flex">
          <img src="/spade.svg" alt="spade logo" className="w-[18vw]" />
          <p className="w-[18vw] text-center">
            An <span className="text-gray-600">acees</span> creation
          </p>
        </div>
        <div className="grid sm:grid-cols-2">
          <div className="flex flex-col justify-center gap-2 sm:gap-8 font-cinzel mb-4">
            {product?.name.split(" ").map((word, index) => {
              return (
                <p
                  key={index + 1}
                  className={`flex w-full items-center justify-center text-2xl sm:gap-2 sm:text-4xl font-semibold uppercase text-asisDark xl:text-5xl `}
                >
                  {word}
                </p>
              );
            })}
          </div>
          <p className="flex items-center text-xs font-semibold sm:text-base lg:max-w-[29vw] xl:text-lg">
            {halfDesc}
          </p>
          <p className="text-xs font-semibold sm:col-span-2 sm:text-base xl:text-lg">
            {restDesc}
            {restDesc}
          </p>
        </div>
      </article>
      {!product?.isComingSoon && (
        <Link
          className="flex w-full items-center justify-center"
          to={`/product/${product?.product._id}`}
        >
          <button className="flex items-center gap-2 rounded bg-black px-2 py-1 text-sm text-white md:px-6 md:py-2 md:text-lg">
            View Product{" "}
            <img src="/arrow.svg" alt="arrow" className="w-3 lg:w-4" />
          </button>
        </Link>
      )}
    </section>
  );
};

export default SelectedThree;
