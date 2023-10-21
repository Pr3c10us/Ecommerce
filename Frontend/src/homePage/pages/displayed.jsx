import React from "react";
import SelectedOneCS from "./selectedOneCS";
import SelectedOne from "./selectedOne";
import SelectedThree from "./selectedThree";
import SelectedTwo from "./selectedTwo";
import Slider from "../components/slider";

const Displayed = ({ product, setNavType }) => {
  const [show, setShow] = React.useState(1);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShow((prev) => {
  //       if (prev == 3) {
  //         return 1;
  //       } else {
  //         return prev + 1;
  //       }
  //     });
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);
  return (
    <>
      {show == 1 &&
        (product?.isComingSoon == true ? (
          <SelectedOneCS product={product} setNavType={setNavType} />
        ) : (
          <SelectedOne product={product} setNavType={setNavType} />
        ))}
      {show == 2 && <SelectedTwo product={product} setNavType={setNavType} />}
      {show == 3 && <SelectedThree product={product} setNavType={setNavType} />}
      <Slider setShow={setShow} show={show} />
    </>
  );
};

export default Displayed;
