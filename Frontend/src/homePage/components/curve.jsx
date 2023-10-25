import React from "react";
import { motion } from "framer-motion";

export default function Curve({ direction }) {
  const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${
    window.innerHeight / 2
  } 100 0`;
  const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${
    window.innerHeight / 2
  } 100 0`;

  const rightInitialPath = `M0 0 L0 ${window.innerHeight} Q200 ${
    window.innerHeight / 2
  } 0 0`;
  const rightTargetPath = `M0 0 L0 ${window.innerHeight} Q0 ${
    window.innerHeight / 2
  } 0 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
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
      <svg
        className={`absolute -left-[99px] top-0 h-full w-[100px]  stroke-none`}
      >
        <motion.path
          variants={curve}
          initial="initial"
          animate="enter"
          exit="exit"
        ></motion.path>
      </svg>
      <svg
        className={`absolute -right-[99px] top-0 h-full w-[100px]   stroke-none`}
      >
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
