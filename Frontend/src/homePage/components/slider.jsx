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
    <nav className="absolute inset-x-0 bottom-0 z-10 flex h-[10vh]  w-full items-center justify-center pb-2">
      <div
        onClick={prev}
        className={`fixed left-0 top-1/2 flex h-[30vh] w-[30vw] -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 sm:h-[10vw] sm:w-[10vw] sm:rounded-full sm:bg-asisDark`}
      >
        <BsChevronRight
          className="sm:p-auto absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white bg-opacity-10 p-2 backdrop-blur-lg sm:h-12 sm:w-12 sm:bg-transparent sm:text-white sm:backdrop-blur-none"
        />
      </div>
      <div
        onClick={next}
        className={`fixed right-0 top-1/2 flex h-[30vh] w-[30vw] -translate-y-1/2 translate-x-1/2 cursor-pointer transition-all duration-300 sm:h-[10vw] sm:w-[10vw] sm:rounded-full sm:bg-asisDark`}
      >
        <BsChevronRight
          className="sm:p-auto absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 rotate-180 items-center justify-center rounded-full bg-white bg-opacity-10 p-2 backdrop-blur-lg sm:h-12 sm:w-12 sm:bg-transparent sm:text-white sm:backdrop-blur-none"
        />
      </div>{" "}
    </nav>
  );
};

export default Slider;
