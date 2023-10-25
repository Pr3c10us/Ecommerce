import React from "react";
import { motion } from "framer-motion";

export default function Curve({ direction }) {
  const initialPath = `M0 100 L${window.innerWidth} 100  Q${
    window.innerWidth / 2
  } 100 0 100`;
  const exitPath = `M0 100 L${window.innerWidth} 100  Q${
    window.innerWidth / 2
  } -100 0 100`;
  const targetPath = `M0 100 L${window.innerWidth} 100  Q${
    window.innerWidth / 2
  } -100 0 100`;

  const rightInitialPath = `M0 0 L${window.innerWidth} 0 Q${
    window.innerWidth / 2
  } 200 0 0`;
  const rightTargetPath = `M0 0 L${window.innerWidth} 0 Q${
    window.innerWidth / 2
  } 0 0 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: exitPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const curveRight = {
    initial: {
      d: rightInitialPath,
    },
    enter: {
      d: rightTargetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: rightInitialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <>
      <svg className={`absolute -top-[99px] h-[100px] w-full  stroke-none hidden sm:block`}>
        <motion.path
          variants={curve}
          initial="initial"
          animate="enter"
          exit="exit"
        ></motion.path>
      </svg>
      <svg className={`absolute -bottom-[99px] h-[100px] w-full  stroke-none`}>
        <motion.path
          variants={curveRight}
          initial="initial"
          animate="enter"
          exit="exit"
        ></motion.path>
      </svg>
    </>
  );
}
