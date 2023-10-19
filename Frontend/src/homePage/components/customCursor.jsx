import React, { useRef } from "react";
import { motion } from "framer-motion";
// import {FiArrowUpRight} from ""

const CustomCursorInDiv = ({ children, mouseText = "" }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);
  const ref = useRef();

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
    setOpacity(1);
    console.log({
      x,
      y,
      clientX,
      clientY,
      left,
      top,
      width,
      height,
    });
  };
  const mouseLeave = (e) => {
    // setPosition({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={mouseMove}
      onMouseLeave={mouseLeave}
      className="cursor-none relative flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute pointer-events-none z-10 flex h-32 w-32 items-center justify-center rounded-full bg-[#1A1C1A] p-2 text-white"
        animate={{ x: position.x, y: position.y, opacity }}
        transition={{ type: "tween", ease: "backOut"  }}
      >
        {mouseText}
      </motion.div>
      {children}
    </motion.div>
  );
};

export default CustomCursorInDiv;
