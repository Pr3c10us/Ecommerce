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
    name: "Genevive Sweater",
    shortDescription:
      "Lightweight, stretchy pants for hiking and everyday wear. Lorem ipsum duble geralt",
    image: "/GeneviveSweater.png",
  });
  const [icons, setIcons] = React.useState([
    {
      icon: <FaHeart className="aspect-square h-6 text-asisGreen xl:h-8" />,
      text: "100% Organic",
    },
    {
      icon: <FaStar className="aspect-square h-6 text-asisGreen xl:h-8" />,
      text: "100% Organic",
    },
    {
      icon: (
        <FaShoppingBag className="aspect-square h-6 text-asisGreen xl:h-8" />
      ),
      text: "100% Organic",
    },
    {
      icon: <FaTag className="aspect-square h-6 text-asisGreen xl:h-8" />,
      text: "100% Organic",
    },
    {
      icon: <FaCamera className="aspect-square h-6 text-asisGreen xl:h-8" />,
      text: "100% Organic",
    },
    {
      icon: <FaCrown className="aspect-square h-6 text-asisGreen xl:h-8" />,
      text: "100% Organic",
    },
    {
      icon: <FaCheck className="aspect-square h-6 text-asisGreen xl:h-8" />,
      text: "100% Organic",
    },
    {
      icon: <FaGift className="aspect-square h-6 text-asisGreen xl:h-8" />,
      text: "100% Organic",
    },
    {
      icon: (
        <PiCoatHangerBold className="aspect-square h-6 text-asisGreen xl:h-8" />
      ),
      text: "100% Organic",
    },
    {
      icon: <FaClock className="aspect-square h-6 text-asisGreen xl:h-8" />,
      text: "100% Organic",
    },
  ]);
  return (
    <>
      {/* mobile */}
      <section className="bg-gray300 flex h-full w-full flex-col overflow-hidden lg:hidden">
        <div className="overflow-xhidden relative flex basis-[60%] items-center justify-center">
          <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: "0%" }}
            transition={{ type: "tween", ease: "circOut", duration: 1 }}
            className="absolute left-[60vw] top-0 h-[80%] w-20 bg-asisDark"
          />
          <motion.div
            initial={{ top: "100%" }}
            animate={{ top: "20%" }}
            transition={{ type: "tween", ease: "circOut", duration: 1 }}
            className="absolute left-[50vw] top-[20%] h-[80%] w-20 bg-asisGreen"
          />
          <motion.img
            initial={{ width: "0%", height: "0%", opacity: 0 }}
            animate={{
              width: "100%",
              height: "100%",
              opacity: 1,
            }}
            transition={{ type: "tween", duration: 1 }}
            className="object-fit absolute left-[36.5vw] top-0 h-full w-full object-center"
            src={"/rose.svg"}
            alt="rose"
          />
          <motion.img
            initial={{ top: "-150%" }}
            animate={{
              top: "50%",
            }}
            transition={{ type: "tween", ease: "circOut", duration: 1 }}
            className="absolute left-1/2 top-1/2 h-4/5 -translate-x-1/2 -translate-y-1/2 sm:h-full sm:-translate-y-1/3"
            src={demoItem.image}
            alt="rose"
          />
        </div>
        <div className="z-10 basis-[40%] space-y-2">
          <div className="flex flex-col px-4 sm:px-8 md:px-12">
            {demoItem.name.split(" ").map((word, index) => {
              const randomNumber = Math.floor(Math.random() * 10);
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
                      className={`flex w-full items-center text-2xl font-bold uppercase sm:text-4xl`}
                      style={pStyle}
                    >
                      {index > 0 && icons[randomNumber].icon}
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
                            <p className="text-3xl">. . .</p>
                          )}
                        </>
                      )}
                    </p>
                  )}
                </>
              );
            })}
          </div>
          <p className="px-4 text-sm font-semibold sm:px-8 md:px-12">
            {demoItem.shortDescription}
          </p>
          <div className="flex justify-end px-4 pb-2 sm:px-8 md:px-12">
            <button className="flex items-center gap-2 bg-asisGreen px-4 py-2 text-white">
              View Product <img src="/arrow.svg" alt="arrow" />
            </button>
          </div>
          <div className="relative h-full w-full flex-1">
            <motion.div
              initial={{ top: "100%" }}
              animate={{ top: "0%" }}
              transition={{ type: "tween", ease: "circOut", duration: 1 }}
              className="absolute left-[50vw] h-[100%] w-20 bg-asisGreen"
            />
          </div>
        </div>
      </section>
      {/* Desktop */}
      <section className="hidden h-full w-full overflow-hidden  lg:flex lg:grid-cols-2">
        <div className="z-10 flex basis-[50%] flex-col justify-center gap-10 px-[8vw] xl:basis-[50%]">
          <div className="flex flex-col gap-2 px-4">
            {demoItem.name.split(" ").map((word, index) => {
              const randomNumber = Math.floor(Math.random() * 10);
              const marginLeft = index * (80 / demoItem.name.split(" ").length); // Adjust the margin as needed
              const pStyle = {
                paddingLeft: `${marginLeft}%`,
              };
              return (
                <>
                  {index < 3 && (
                    <p
                      key={index + 1}
                      className={`flex w-full items-end text-3xl font-medium uppercase xl:text-4xl 2xl:text-5xl`}
                      style={pStyle}
                    >
                      {index > 0 && icons[randomNumber].icon}
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
                            <p className="text-3xl">. . .</p>
                          )}
                        </>
                      )}
                    </p>
                  )}
                </>
              );
            })}
          </div>
          <p className="px-4 font-semibold xl:text-lg">
            {demoItem.shortDescription}
          </p>
          <div className="flex justify-end px-4 pb-2">
            <button className="flex items-center gap-2 bg-asisGreen px-10 py-2 text-white">
              View Product <img src="/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>{" "}
        <div className="relative flex basis-[50%] xl:basis-[50%]">
          <ComponentMouseFollow
            initialObject={{ top: "-200%" }}
            animateObject={{ top: "0%" }}
            className={`absolute inset-y-0 left-[67%] flex h-full -translate-x-1/2 -translate-y-1/2 items-center`}
            flow={2}
            opposite={false}
          >
            <div className=" h-[50%] w-32 bg-asisDark" />
          </ComponentMouseFollow>
          <ComponentMouseFollow
            initialObject={{ bottom: "-200%" }}
            animateObject={{ bottom: "0%" }}
            className={`absolute bottom-0 left-0 flex h-[90%] w-[22vw] bg-asisDark`}
            flow={5}
            opposite={false}
          />
          <ComponentMouseFollow
            initialObject={{ top: "-200%" }}
            animateObject={{ top: "0%" }}
            className={` absolute left-[35%] flex h-[90%] w-[22vw]  bg-asisGreen`}
            flow={100}
          />
          <ComponentMouseFollow
            className={`absolute left-[17%] top-0 flex aspect-square w-[35vw]`}
            flow={3}
            initialObject={{ left: "200%" }}
            animateObject={{ left: "17%" }}
          >
            <img className="object-fit" src={"/rose.svg"} alt="rose" />
          </ComponentMouseFollow>
          <ComponentMouseFollow
            initialObject={{ bottom: "-50%" }}
            animateObject={{ bottom: "0%" }}
            className={` absolute bottom-0 left-[-10%] flex aspect-square w-[20vw]`}
            flow={3}
          >
            <img
              className="object-fit"
              src={"/butterfly.svg"}
              alt="butterfly"
            />
          </ComponentMouseFollow>{" "}
          <ComponentMouseFollow
            className={` absolute bottom-0 left-[3%] flex h-full items-center `}
            initialObject={{ bottom: "-100%" }}
            animateObject={{ bottom: "0%" }}
            flow={10}
          >
            <img className="object-fit h-full" src={demoItem.image} alt="iem" />
          </ComponentMouseFollow>
        </div>
      </section>
    </>
  );
};

export default SelectedOne;
