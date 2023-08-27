import React, { useEffect, useState } from "react";

const ArticleCarousel = ({
  children: slides,
  autoSlide = true,
  autoSlideInterval = 5050,
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
    <div className="w-full h-full flex overflow-x-hidden">
      <div
        className={`flex h-full w-full transition-all duration-500 ease-out`}
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides}
      </div>
    </div>
  );
};

export default ArticleCarousel;
