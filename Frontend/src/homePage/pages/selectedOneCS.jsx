import React from "react";
import ComponentMouseFollow from "../components/componentMouseFollow";
import { AnimatePresence, motion } from "framer-motion";
import VowelItalicizer from "../../components/vowelItalicizer";
import { Link } from "react-router-dom";
import Curve from "../components/curve";

const SelectedOneCS = ({ product, setNavType,direction, }) => {
  const [wait, setWait] = React.useState(true);

  React.useEffect(() => {
    setNavType(2);
    setTimeout(() => {
      setWait(false);
    }, 1000);
  }, []);

  return (
    <>
      {/* <AnimatePresence>
        {wait && (
          <motion.div
            initial={{
              x: `calc(${direction == "incr" ? -100 : 100}% + 100px)`,
            }}
            animate={{
              x: "0",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              x: `calc(${direction == "incr" ? 100 : -100}%)`,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed z-10 h-screen w-screen bg-black"
          >
            <Curve />
          </motion.div>
        )}
      </AnimatePresence> */}
      <section className="flex h-full w-screen flex-col-reverse sm:flex-row">
        <article className="flex basis-[30%] flex-col justify-center gap-5 px-5 sm:basis-[55.5%] sm:py-0 sm:pl-[10.4vw] sm:pr-0 lg:gap-0">
          <div className="flex grid-cols-2 items-center justify-start lg:justify-end">
            <div className="hidden min-w-[260px] flex-col items-center text-center text-sm font-extrabold uppercase lg:flex">
              <img
                src="/spade.svg"
                alt="spade logo"
                className="pointer-events-none w-[240px]"
              />
              <p>
                Your <span className="text-gray-500 ">Digital</span> Tailor
              </p>
            </div>
            <div className="flex h-full w-full flex-col items-center justify-center px-4 font-cinzel sm:gap-6">
              {product?.name.split(" ").map((word, index) => {
                return (
                  <p
                    key={index + 1}
                    className={`flex w-full items-center justify-center gap-2 text-2xl uppercase text-asisDark sm:text-4xl sm:font-medium xl:text-5xl`}
                  >
                    {word}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex w-full justify-end">
            <h2 className="flex w-full flex-col font-comforter text-5xl uppercase leading-tight sm:w-full sm:text-[6vw] ">
              <span className="text-right">Newest </span>{" "}
              <span className="text-left sm:text-center">Collection!</span>
            </h2>
          </div>
          <div className="flex items-center justify-center sm:justify-end">
            <Link
              to={`/product/${product?.product._id}`}
              className="flex items-center gap-2 rounded bg-black px-4 py-1.5 text-xs text-white sm:px-6 sm:py-2 sm:text-sm"
            >
              View Product{" "}
              <img src="/arrow.svg" alt="arrow" className="w-3 sm:w-4" />
            </Link>
          </div>
        </article>
        <div className="relative flex h-full basis-[70%] items-end justify-center pt-[10vh] sm:basis-[45.5%] sm:items-center sm:pb-[3.9vh] sm:pt-[11.8vh]">
          <img
            src="/eclipse.svg"
            alt="eclipse"
            className="fixed -bottom-10 -z-10 w-full scale-150 sm:hidden"
          />
          <div className="absolute bottom-0 hidden w-full justify-center rounded-t-full sm:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="512"
              height="23"
              viewBox="0 0 512 23"
              fill="none"
            >
              <g filter="url(#filter0_f_1414_4383)">
                <path
                  d="M2 33.8542C2 29.7542 2 27.7041 3.21061 26.2978C4.42123 24.8914 6.46498 24.584 10.5525 23.9691C197.572 -4.16419 307.783 -6.00327 501.486 23.9378C505.557 24.567 507.592 24.8816 508.796 26.286C510 27.6904 510 29.732 510 33.8152V50C510 54.714 510 57.0711 508.536 58.5355C507.071 60 504.714 60 500 60H12C7.28595 60 4.92893 60 3.46447 58.5355C2 57.0711 2 54.714 2 50V33.8542Z"
                  fill="black"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_1414_4383"
                  x="0"
                  y="0.169922"
                  width="512"
                  height="61.8301"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="1"
                    result="effect1_foregroundBlur_1414_4383"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <img
            src={`${import.meta.env.VITE_BLOB_URL}${product?.images[0]}`}
            alt="product image"
            className="pointer-events-none h-[55vh] object-contain sm:h-full"
          />
        </div>
      </section>
    </>
  );
};

export default SelectedOneCS;
