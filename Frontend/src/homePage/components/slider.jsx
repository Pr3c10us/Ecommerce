import React from "react";
import { BsChevronRight } from "react-icons/bs";

const Slider = ({ setShow, show, setDirection, setWait }) => {
  const next = () => {
    setDirection("incr");
    setWait(true);
    setTimeout(() => {
      if (show == 3) {
        setShow(1);
      } else {
        setShow(show + 1);
      }
      setWait(false);
    }, 1000);
  };

  const prev = () => {
    setDirection("decr");
    setWait(true);
    setTimeout(() => {
      if (show == 1) {
        setShow(3);
      } else {
        setShow(show - 1);
      }
      setWait(false);
    }, 1000);
  };
  return (
    <>
      <img
        onClick={prev}
        src="/leftBtn.svg"
        alt=""
        className="fixed left-0 top-1/2 -translate-y-1/2"
      />
      <img
        onClick={next}
        src="/rightBtn.svg"
        alt=""
        className="fixed right-0 top-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default Slider;
