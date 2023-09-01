import React, { useEffect, useState } from "react";

const Carousel = ({
  children: slides,
  autoSlide = true,
  autoSlideInterval = 5000,
  setCursorType,
}) => {
  const [curr, setCurr] = useState(0);
  const next = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const prev = () => {
    setCurr((curr) => (curr >= slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(prev, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, []);
  return (
    <div className="relative flex aspect-[9/16] h-full  overflow-hidden">
      <div
        className={`relative flex transition-all duration-500 ease-out`}
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
    </div>
  );
};

export default Carousel;
