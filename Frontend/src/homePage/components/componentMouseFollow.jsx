import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const ComponentMouseFollow = ({
  flow = 3,
  opposite = true,
  children,
  className,
  initialObject,
  animateObject,
}) => {
  const ref = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const mouseMove = (e) => {
    let direction = opposite ? 1 : -1;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (direction * (clientX - (left + width / 8))) / (flow * 10);
    const y = (direction * (clientY - (top + height / 8))) / (flow * 15);
    setPosition({ x, y });
  };
  const mouseLeave = () => {
    // setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseleave", mouseLeave);
    return () => {
      document.removeEventListener("mousemove", mouseLeave);
    };
  }, []);

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      initial={{ x: 0, y: 0, ...initialObject }}
      animate={{ x, y, ...animateObject }}
      transition={{ type: "tween", ease: "circOut", duration: 2 }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ComponentMouseFollow;
