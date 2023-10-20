import React from "react";
import SelectedOneCS from "./selectedOneCS";
import SelectedOne from "./selectedOne";
import SelectedThree from "./selectedThree";
import SelectedTwo from "./selectedTwo";

const Displayed = ({ product,setNavType }) => {
  const [show, setShow] = React.useState(1);

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setShow((prev) => {
//         if (prev == 3) {
//           return 1;
//         } else {
//           return prev + 1;
//         }
//       });
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);
  return (
    <>
      {show == 1 &&
        (product?.isComingSoon == true ? (
          <SelectedOneCS product={product} setNavType={setNavType} />
        ) : (
          <SelectedOne product={product} setNavType={setNavType} />
        ))}
      {show == 2 && <SelectedTwo />}
      {show == 3 && <SelectedThree />}
    </>
  );
};

export default Displayed;
