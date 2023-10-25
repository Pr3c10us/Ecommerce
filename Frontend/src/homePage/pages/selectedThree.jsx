import React from "react";
import ComponentMouseFollow from "../components/componentMouseFollow";
import { AnimatePresence, motion } from "framer-motion";
import VowelItalicizer from "../../components/vowelItalicizer";
import { Link } from "react-router-dom";
import Curve from "../components/curve";

const SelectedThree = ({ product, setNavType, direction }) => {
  const [wait, setWait] = React.useState(true);

  React.useEffect(() => {
    setNavType(1);
    setTimeout(() => {
      setWait(false);
    }, 1000);
  }, []);
  const words = product?.description.split(" ");

  const halfDesc = words.slice(0, 60).join(" ");
  const restDesc = words.slice(60).join(" ");

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
      <section className="flex h-full w-screen flex-col px-[5.2vw] py-[14vh] sm:justify-center lg:px-[10.4vw]">
        <article className="mb-[6vh] flex">
          <div className="text- hidden w-[18vw] flex-col items-center text-center font-extrabold uppercase lg:flex">
            <img
              src="/spade.svg"
              alt="spade logo"
              className="pointer-events-none w-[18vw]"
            />
            <p className="w-[18vw] text-center">
              An <span className="text-gray-500">acees</span> creation
            </p>
          </div>
          <div className="grid text-center sm:grid-cols-2 sm:text-left">
            <div className="mb-4 flex flex-col justify-center gap-2 font-cinzel sm:gap-8">
              {product?.name.split(" ").map((word, index) => {
                return (
                  <p
                    key={index + 1}
                    className={`flex w-full items-center justify-center text-2xl uppercase text-asisDark sm:gap-2 sm:text-4xl xl:text-5xl `}
                  >
                    {word}
                  </p>
                );
              })}
            </div>
            <p className="hidden items-center text-xs font-medium sm:flex sm:text-base lg:max-w-[29vw] xl:text-lg">
              {halfDesc},
            </p>
            <p className="hidden text-xs font-medium sm:col-span-2 sm:block sm:text-base xl:text-lg">
              {restDesc}
            </p>
            <p className="text-xs sm:hidden font-medium sm:col-span-2 sm:text-base xl:text-lg">{product?.description}</p>
          </div>
        </article>
          <div className="flex w-full items-center justify-center">
            <Link
              to={`/product/${product?.product._id}`}
              className="flex items-center gap-2 rounded bg-black px-4 py-1.5 text-xs text-white sm:text-sm md:px-6 md:py-2"
            >
              View Product{" "}
              <img src="/arrow.svg" alt="arrow" className="w-3 lg:w-4" />
            </Link>
          </div>
      </section>
    </>
  );
};

export default SelectedThree;
