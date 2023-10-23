import React, { useEffect } from "react";
import SelectedOneCS from "./selectedOneCS";
import SelectedOne from "./selectedOne";
import SelectedThree from "./selectedThree";
import SelectedTwo from "./selectedTwo";
import Slider from "../components/slider";
import { motion, useAnimation } from "framer-motion";

const Displayed = ({ product, setNavType, bodyRef }) => {
  const [show, setShow] = React.useState(1);

  return (
    <motion.div
      drag="x"
      dragConstraints={bodyRef}
      // dragMomentum={false}
      className="flex h-screen w-max min-w-full flex-nowrap items-start justify-start active:cursor-grabbing cursor-grab"
    >
      {product?.isComingSoon == true ? (
        <SelectedOneCS product={product} setNavType={setNavType} />
      ) : (
        <SelectedOne product={product} setNavType={setNavType} />
      )}
      <SelectedTwo product={product} setNavType={setNavType} />
      <SelectedThree product={product} setNavType={setNavType} />
      {/* <Slider setShow={setShow} show={show} /> */}
    </motion.div>
  );
};

export default Displayed;
