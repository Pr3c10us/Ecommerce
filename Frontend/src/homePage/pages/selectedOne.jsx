import React from "react";
import ComponentMouseFollow from "../components/componentMouseFollow";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaStar,
  FaShoppingBag,
  FaTag,
  FaCamera,
  FaCrown,
  FaCheck,
  FaGift,
  FaClock,
} from "react-icons/fa";
import { PiCoatHangerBold } from "react-icons/pi";
import VowelItalicizer from "../../components/vowelItalicizer";

const SelectedOne = () => {
  const [demoItem, setDemoItem] = React.useState({
    name: "Overgrowth Convertible Pant",
    shortDescription:
      "Lightweight, stretchy pants for hiking and everyday wear. Lorem ipsum duble geralt. Consectetur, necessitatibus?",
    image: "/convertiblePant.png",
  });
  const [icons, setIcons] = React.useState([
    {
      icon: <img src="/spiral.svg" className="aspect-square h-8 xl:h-10" />,
      text: "spiral",
    },
    {
      icon: <img src="/rose.svg" className="aspect-square h-8 xl:h-10" />,
      text: "rose",
    },
  ]);
  return (
    <>
      {/* mobile */}
      <section className="bg-gray300 flex h-full w-full flex-col overflow-hidden lg:hidden">
        <div className="relative flex basis-[60%] items-center justify-center sm:basis-[50%]">
          <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: "0%" }}
            transition={{ type: "tween", ease: "circOut", duration: 2 }}
            className="absolute left-[60vw] top-0 h-[80%] w-[25vw] bg-[#121212] sm:h-full sm:w-[18vw]"
          />
          <motion.div
            initial={{ top: "100%" }}
            animate={{ top: "20%" }}
            transition={{ type: "tween", ease: "circOut", duration: 2 }}
            className="absolute left-[50vw] top-[20%] h-[80%] w-[25vw] bg-asisGreen sm:h-[120%] sm:w-[18vw]"
          />

          <motion.img
            initial={{ top: "-150%" }}
            animate={{
              top: "50%",
            }}
            transition={{ type: "tween", ease: "circOut", duration: 2 }}
            className="absolute left-1/2 top-1/2 h-4/5 -translate-x-1/2 -translate-y-1/2 sm:h-[125%] sm:-translate-y-1/3"
            src={demoItem.image}
            alt="rose"
          />
        </div>
        <div className="z-10 basis-[40%] space-y-2">
          <div className="flex flex-col px-4">
            {demoItem.name.split(" ").map((word, index) => {
              const marginLeft =
                index * (100 / demoItem.name.split(" ").length); // Adjust the margin as needed
              const pStyle = {
                paddingLeft: `${marginLeft}%`,
              };
              return (
                <>
                  {index < 3 && (
                    <p
                      key={index + 1}
                      className={`flex w-full items-center justify-center gap-2 text-4xl font-extrabold uppercase text-white sm:text-5xl`}
                      style={pStyle}
                    >
                      {index == 1 && icons[0].icon}
                      {index == 2 && icons[1].icon}

                      <VowelItalicizer
                        text={
                          word.split("").length > 5 && index === 2
                            ? word.substring(0, 5)
                            : word
                        }
                      />
                      {index === 2 && (
                        <>
                          {demoItem.name.split(" ").length > 3 && (
                            <p className="flex h-full items-end text-3xl">
                              . . .
                            </p>
                          )}
                        </>
                      )}
                    </p>
                  )}
                </>
              );
            })}
          </div>
          {/* <p className="px-4 text-center text-4xl font-extrabold sm:px-8 sm:text-5xl md:px-12">
            <VowelItalicizer text={demoItem.name} />
          </p> */}
          <p className="px-4 text-center text-sm font-bold sm:px-8 sm:text-base md:px-12">
            {demoItem.shortDescription}
          </p>
          <div className="flex justify-center px-4 pb-2 sm:px-8 md:px-12">
            <button className="flex items-center gap-2 bg-asisGold px-4 py-2 text-sm text-white">
              View Product <img src="/arrow.svg" alt="arrow" />
            </button>
          </div>
          <div className="relative h-full w-full flex-1">
            <motion.div
              initial={{ top: "100%" }}
              animate={{ top: "0%" }}
              transition={{ type: "tween", ease: "circOut", duration: 1 }}
              className="absolute left-[50vw] h-[100%] w-[25vw] bg-asisGreen sm:w-[18vw]"
            />
          </div>
        </div>
      </section>
      {/* Desktop */}
      <section className="hidden h-full w-full overflow-hidden  lg:flex lg:grid-cols-2">
        <div className="z-10 flex basis-[50%] flex-col justify-center gap-10 px-[4vw] xl:basis-[50%]">
          {/* <p className="text-right text-6xl font-extrabold uppercase 2xl:text-[4vw]">
            <VowelItalicizer text={demoItem.name} />
          </p> */}
          <div className="flex gap-4 flex-col px-4">
            {demoItem.name.split(" ").map((word, index) => {
              // const marginLeft =
              //   index * (50 / demoItem.name.split(" ").length); // Adjust the margin as needed
              // const pStyle = {
              //   paddingLeft: `${marginLeft}%`,
              // };
              return (
                <>
                  {index < 3 && (
                    <p
                      key={index + 1}
                      className={`flex w-full items-center gap-2 text-5xl font-extrabold uppercase text-white xl:text-6xl 2xl:text-[4.5vw] ${
                        index === 1 && "justify-end"
                      } ${index === 2 && "justify-end"}`}
                      // style={pStyle}
                    >
                      {index == 1 && icons[0].icon}
                      {index == 2 && icons[1].icon}

                      <VowelItalicizer
                        text={
                          word.split("").length > 5 && index === 2
                            ? word.substring(0, 5)
                            : word
                        }
                      />
                      {index === 2 && (
                        <>
                          {demoItem.name.split(" ").length > 3 && (
                            <p className="flex h-full items-end text-3xl">
                              . . .
                            </p>
                          )}
                        </>
                      )}
                    </p>
                  )}
                </>
              );
            })}
          </div>
          <p className="px-4 font-bold xl:text-lg">
            {demoItem.shortDescription}
          </p>
          <div className="flex justify-end px-4 pb-2">
            <button className="flex items-center gap-2 bg-asisGold px-10 py-1.5 text-white 2xl:py-2 2xl:text-lg">
              View Product Page <img src="/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>{" "}
        <div className="relative flex basis-[50%] xl:basis-[50%]">
          <ComponentMouseFollow
            initialObject={{ top: "-200%" }}
            animateObject={{ top: "0%" }}
            className={`absolute inset-y-0 left-[35%] flex h-full -translate-x-1/2 -translate-y-1/2 items-center`}
            flow={10}
            opposite={false}
          >
            <div className=" h-[50%] w-[22vw] bg-asisGreen xl:w-[18vw]" />
          </ComponentMouseFollow>
          <ComponentMouseFollow
            initialObject={{ bottom: "-200%" }}
            animateObject={{ bottom: "0%" }}
            className={`absolute bottom-0 left-0 flex h-[90%] w-[22vw] bg-asisGreen xl:w-[18vw]`}
            flow={10}
            opposite={false}
          />
          <ComponentMouseFollow
            initialObject={{ top: "-200%" }}
            animateObject={{ top: "0%" }}
            className={` absolute left-[25%] flex h-[90%] w-[22vw] bg-[#121212]  xl:w-[18vw]`}
            flow={100}
          />
          <ComponentMouseFollow
            className={` absolute bottom-0 left-[3%] flex h-full items-center `}
            initialObject={{ bottom: "-100%" }}
            animateObject={{ bottom: "0%" }}
            flow={10}
          >
            <img
              className="h-[85%] object-contain"
              src={demoItem.image}
              alt="iem"
            />
          </ComponentMouseFollow>
        </div>
      </section>
    </>
  );
};

export default SelectedOne;
