import React from "react";
import ComponentMouseFollow from "../components/componentMouseFollow";
import { motion } from "framer-motion";
import VowelItalicizer from "../../components/vowelItalicizer";

const SelectedThree = () => {
  const [demoItem, setDemoItem] = React.useState({
    name: "Overgrowth Convertible Pant",
    shortDescription:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus quasi tempora consectetur accusantium qui architecto voluptates, omnis voluptate totam minima, nesciunt aut ducimus? Sapiente sed, est tempore commodi veniam, impedit voluptatem repellat aut necessitatibus maxime, distinctio quidem modi doloribus repudiandae?",
    image: "/convertiblePant.png",
  });

  return (
    <>
      {/* mobile */}
      <section className="bg-gray300 flex h-full w-full flex-col overflow-hidden pt-16 lg:hidden">
        <img
          src="/eclipse.svg"
          alt="eclipse"
          className="fixed -right-1/2 z-0 object-center lg:right-0 lg:scale-125"
        />
        <div className="relative flex basis-[40%] items-center justify-center sm:basis-[50%]">
          <motion.div
            initial={{ top: "100%" }}
            animate={{ top: "20%" }}
            transition={{ type: "tween", ease: "circOut", duration: 2 }}
            className="absolute left-1/2 top-[20%] h-[80%] w-16 -translate-x-1/2 bg-asisDark"
          />

          <motion.img
            initial={{ top: "-150%" }}
            animate={{
              top: "50%",
            }}
            transition={{ type: "tween", ease: "circOut", duration: 2 }}
            className="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 object-contain"
            src={demoItem.image}
            alt="rose"
          />
        </div>
        <div className="z-10 basis-[40%] space-y-6 p-4">
          <p className="text-center text-4xl sm:px-8 sm:text-5xl md:px-12">
            <VowelItalicizer text={demoItem.name} />
          </p>
          <p className="text-xs font-semibold sm:px-8 sm:text-base md:px-12">
            {demoItem.shortDescription}
          </p>
          <div className="flex justify-center px-4 pb-2 sm:px-8 md:px-12">
            <button className="flex items-center gap-2 bg-asisDark px-4 py-1.5 text-sm text-white">
              View Product <img src="/arrow.svg" alt="arrow" />
            </button>
          </div>
          <div className="relative h-full w-full flex-1">
            <motion.div
              initial={{ top: "100%" }}
              animate={{ top: "0%" }}
              transition={{ type: "tween", ease: "circOut", duration: 1 }}
              className="absolute left-1/2 h-[100%] w-16 -translate-x-1/2 bg-asisDark"
            />
          </div>
        </div>
      </section>
      {/* Desktop */}
      <section className="hidden h-full w-full overflow-hidden  lg:flex lg:grid-cols-2">
        <div className="z-10 flex basis-[50%] flex-col justify-center gap-10 px-[6vw] xl:basis-[50%]">
          <p className="text-5xl uppercase xl:text-6xl">
            <VowelItalicizer text={demoItem.name} />
          </p>
          <p className="font-semibold">{demoItem.shortDescription}</p>
          <div className="flex justify-end px-4 pb-2">
            <button className="flex items-center gap-2 bg-asisDark px-10 py-1 text-white 2xl:py-1 2xl:text-lg">
              View Product <img src="/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>{" "}
        <div className="relative flex basis-[50%] xl:basis-[50%]">
          <div className="fixed left-1/2 h-[200%] w-screen -translate-x-1/2 -translate-y-1/3">
            <div
              className={`fixed inset-y-0 left-1/2 w-[12vw] -translate-x-1/2 -rotate-[30deg]  bg-asisDark`}
              flow={100}
            />
          </div>
          <motion.img
            initial={{ x: "-200vw", rotate: "360deg" }}
            animate={{ x: "0vw", rotate: "0deg" }}
            transition={{ type: "tween", duration: 3 }}
            src="/eclipse.svg"
            alt="eclipse"
            className="fixed -bottom-10 -right-1/2 w-[60vw] object-center lg:-right-24"
          />
          <ComponentMouseFollow
            className={` absolute bottom-0 left-[3%] flex h-full items-center `}
            initialObject={{ bottom: "-100%" }}
            animateObject={{ bottom: "0%" }}
            flow={10}
          >
            <img
              className="h-full object-contain"
              src={demoItem.image}
              alt="iem"
            />
          </ComponentMouseFollow>
        </div>
      </section>
    </>
  );
};

export default SelectedThree;
