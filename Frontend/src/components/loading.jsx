// Create a LoadingSpinner component (or you can use a library like react-loader-spinner)
import React from "react";
import Marquee from "./marquee";
import { AnimatePresence, motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div
      key={"loading"}
      initial={{ y: 0}}
      animate={{ y: 0 }}
      exit={{
        y: window.innerHeight,
        transition: {
          duration: 1,
          delay: 2,
          ease: [0.76, 0, 0.24, 1],
        },
      }}
      transition={{
        duration: 1,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="fixed left-0 top-0 z-50 h-screen w-screen bg-black"
    >
      <div className="flex h-full flex-col justify-around">
        <img
          src="/whiteSpade.svg"
          className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 md:w-1/4 lg:w-1/5"
        />
        <div>
          <Marquee direction={1} word={"· ACEES · ACEES"} />
        </div>
        <div>
          <Marquee direction={-1} word={"· ACEES · ACEES "} />
        </div>
      </div>
    </motion.div>
  );
};

export default Loading;
