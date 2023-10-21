import React from "react";

const Slider = ({ setShow, show }) => {
  return (
    <nav className="pb-2 absolute w-full inset-x-0 bottom-0 z-10  flex h-[10vh] items-center justify-center">
      <div className=" flex items-center gap-2 rounded-2xl px-6 py-2 ">
        <div
          onClick={() => setShow(1)}
          className={`h-4 w-4 transition-all duration-300 cursor-pointer rounded-full ${
            show === 1 ? "h-5 w-5 bg-asisDark" : "border-asisDark bg-white"
          } `}
        />
        <div
          onClick={() => setShow(2)}
          className={`h-4 w-4 transition-all duration-300 cursor-pointer rounded-full ${
            show === 2 ? "h-5 w-5 bg-asisDark" : "border-asisDark bg-white"
          } `}
        />
        <div
          onClick={() => setShow(3)}
          className={`h-4 w-4 transition-all duration-300 cursor-pointer rounded-full ${
            show === 3 ? "h-5 w-5 bg-asisDark" : "border-asisDark bg-white"
          } `}
        />
      </div>
    </nav>
  );
};

export default Slider;
