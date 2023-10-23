import React, { useEffect } from "react";
import SelectedOneCS from "./selectedOneCS";
import SelectedOne from "./selectedOne";
import SelectedThree from "./selectedThree";
import SelectedTwo from "./selectedTwo";
import Slider from "../components/slider";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Curve from "../components/curve";

const Displayed = ({ product, setNavType, bodyRef }) => {
  const [show, setShow] = React.useState(1);
  const [direction, setDirection] = React.useState("incr");
  const [wait, setWait] = React.useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setWait(false);
  //   }, 1000);
  // }, []);

  return (
    <motion.div
      // drag="x"
      // dragConstraints={bodyRef}
      // dragMomentum={false}
      className="flex h-[100svh] w-max min-w-full flex-nowrap items-start justify-start sm:h-screen"
    >
      {show == 1 &&
        (product?.isComingSoon == true ? (
          <SelectedOneCS
            product={product}
            setNavType={setNavType}
            direction={direction}
            wait={wait}
          />
        ) : (
          <SelectedOne
            product={product}
            setNavType={setNavType}
            direction={direction}
            wait={wait}
          />
        ))}
      {show == 2 && (
        <SelectedTwo
          product={product}
          setNavType={setNavType}
          direction={direction}
          wait={wait}
        />
      )}
      {show == 3 && (
        <SelectedThree
          product={product}
          setNavType={setNavType}
          direction={direction}
          wait={wait}
        />
      )}
      <Slider
        setShow={setShow}
        show={show}
        setDirection={setDirection}
        setWait={setWait}
      />
      <AnimatePresence>
        {wait && (
          <motion.div
            initial={{
              x: `calc(${direction == "incr" ? 100 : -100}% + ${
                direction == "incr" ? 100 : -100
              }px)`,
            }}
            animate={{
              x: "0",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              x: `calc(${direction == "incr" ? -100 : 100}% + ${
                direction == "incr" ? -100 : 100
              }px)`,
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
            }}
            className="fixed z-10 h-screen w-screen bg-black"
          >
            <Curve direction={direction} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Displayed;
