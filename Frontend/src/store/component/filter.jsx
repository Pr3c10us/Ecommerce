import React, { useState } from "react";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import { GiTireIronCross } from "react-icons/gi";
import { menuSlide } from "./anim";
import Curve from "./curve";

const Filter = ({
  category,
  setCategory,
  sort,
  setSort,
  gender,
  setGender,
}) => {
  const [hideFilter, setHideFilter] = useState(true);
  const sortArray = [
    { keyWord: "-createdAt", displayText: "Newest Product" },
    { keyWord: "createdAt", displayText: "Oldest Product" },
    { keyWord: "name", displayText: "Product name A-Z" },
    { keyWord: "-name", displayText: "Product name Z-A" },
    { keyWord: "price", displayText: "Lowest Price" },
    { keyWord: "-price", displayText: "Highest Price" },
  ];

  const categoryArray = [
    { keyWord: "", displayText: "all category" },
    { keyWord: "clothes", displayText: "Clothes" },
    { keyWord: "footwear", displayText: "Footwear" },
    { keyWord: "accessories", displayText: "accessories" },
    { keyWord: "others", displayText: "others" },
  ];

  const genderArray = [
    { keyWord: "", displayText: "all" },
    { keyWord: "male", displayText: "male" },
    { keyWord: "female", displayText: "female" },
    { keyWord: "unisex", displayText: "unisex" },
  ];
  return (
    <>
      <nav className="mb-10 flex w-full items-center px-2 md:px-6">
        {/* <div className="flex w-full items-center gap-4 font-playfair text-2xl uppercase">
          <h2>Acees</h2>
          <div className="flex">
            {" "}
            <img src="/left.svg" alt="left" />{" "}
            <img src="/left.svg" alt="left" />
          </div>{" "}
          <h2>Store</h2>
          <div className="flex">
            {" "}
            <img src="/left.svg" alt="left" />{" "}
            <img src="/left.svg" alt="left" />
          </div>{" "}
          <h2>{category ? category : "All Category"}</h2>
        </div> */}

        <div className="flex w-full items-center justify-end gap-2 font-light">
          <span className="md:hidden font-medium" >Filter</span>
          <button
            className="group flex flex-col items-center gap-3 border-2 border-asisDark px-2 py-3 text-lg transition-all duration-500 md:flex-row md:gap-2 md:px-4 md:py-1 md:hover:bg-white"
            onClick={() => setHideFilter((prev) => !prev)}
          >
            <span className="hidden md:block">Filters</span>
            <span className="relative flex h-full w-10 items-center md:w-24">
              <div className="h-0.5 w-full bg-asisDark" />
              <div className="absolute left-1 h-3 w-3  rounded-full border-2 border-white bg-asisDark transition-all duration-500 md:left-2 md:group-hover:translate-x-[550%]" />
            </span>
          </button>
          {/* {showCategory && (
              <motion.div className="absolute left-1/2 z-50 h-48 w-48 -translate-x-1/2 rounded-xl bg-black"></motion.div>
            )} */}
        </div>
      </nav>
      <AnimatePresence mode="wait">
        {!hideFilter && (
          <motion.nav
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="fixed right-0 top-0 z-10 h-screen w-screen space-y-8 sm:space-y-10 bg-asisDark px-5 py-5 sm:py-10 text-white sm:w-1/2 lg:w-1/3"
          >
            <div className="flex justify-between font-playfair text-4xl sm:text-[5vw] lg:text-[3vw]">
              <h2>Filters</h2>
              <button
                onClick={() => {
                  setHideFilter(true);
                }}
                className="transition-all duration-300 hover:rotate-90"
              >
                <GiTireIronCross />
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:gap-5">
              <h3 className="text-lg">Sort By:</h3>
              <div className="flex flex-col gap-2">
                {sortArray.map((sortKey, index) => (
                  <button
                    key={sortKey.keyWord}
                    onClick={() => {
                      setSort(sortKey.keyWord);
                      setHideFilter(true);
                    }}
                    className="flex items-center gap-4 font-extralight capitalize"
                  >
                    <div
                      className={`h-6 w-6 rounded-full ${
                        sort === sortKey.keyWord
                          ? "bg-white "
                          : "border-2 border-white "
                      }`}
                    />
                    {sortKey.displayText}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-5">
              <h3 className="text-lg">Category:</h3>
              <div className="flex flex-wrap gap-2">
                {categoryArray.map((catKey, index) => (
                  <button
                    key={catKey.keyWord}
                    onClick={() => {
                      setCategory(catKey.keyWord);
                      setHideFilter(true);
                    }}
                    className={`flex items-center gap-4 rounded-full px-4 py-1.5 capitalize ${
                      category == catKey.keyWord
                        ? "bg-white text-asisDark"
                        : "border-2"
                    }`}
                  >
                    {catKey.displayText}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-5">
              <h3 className="text-lg">Gender:</h3>
              <div className="flex flex-wrap gap-2">
                {genderArray.map((genderKey, index) => (
                  <button
                    key={genderKey.keyWord}
                    onClick={() => {
                      setGender(genderKey.keyWord);
                      setHideFilter(true);
                    }}
                    className={`flex items-center gap-4 rounded-full px-4 py-1.5 capitalize ${
                      gender == genderKey.keyWord
                        ? "bg-white text-asisDark"
                        : "border-2"
                    }`}
                  >
                    {genderKey.displayText}
                  </button>
                ))}
              </div>
            </div>
            <Curve />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Filter;
