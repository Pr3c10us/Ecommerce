import React, { useEffect, useState } from "react";
import Products from "./products.jsx";
import { Link } from "react-router-dom";
import left_button from "../assets/icons/left_button.svg";
import right_button from "../assets/icons/right_button.svg";
import up_arrow from "../assets/icons/up_arrow.svg";
import Loading from "./loading.jsx";
import axios from "axios";
import VowelItalicizer from "./vowelItalicizer.jsx";

const SpecialCategory = ({ name, category, except }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchProducts = async () => {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}products/?limit=10&category=${
          category || ""
        }`,
      );
      if (data.products.length == 1) {
        let { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}products/?limit=10`,
        );
        setProducts(data.products);
        return setIsLoading(false);
      }
      setProducts(data.products);
      return setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleFetchProducts();
  }, []);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (increment) => {
    const container = document.querySelector(".scroll-container");
    if (container) {
      const newPosition = Math.max(
        0,
        Math.min(
          container.scrollWidth - container.clientWidth,
          scrollPosition + increment,
        ),
      );
      setScrollPosition(newPosition);
      container.scrollLeft = newPosition;
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="relative flex h-full w-full items-stretch justify-between gap-x-12 border-t border-asisDark py-14 uppercase">
      <div className=" flex flex-col items-end text-left text-4xl font-semibold">
        <div className="flex flex-col items-end">
          <p>
            {" "}
            / <VowelItalicizer text={name} />{" "}
          </p>
          <div className="mt-5 w-56 ">
            <div className="ml-auto flex w-24  items-center justify-between">
              <img
                src={left_button}
                alt="left_button"
                className="w-8 cursor-pointer"
                onClick={() => handleScroll(-305)}
              />
              <img
                src={right_button}
                alt="right_button"
                className="w-8 cursor-pointer"
                onClick={() => handleScroll(305)}
              />
            </div>
          </div>
        </div>
        <div className="mt-auto w-56">
          <Link to={`/store`}>
            <div className=" ml-auto flex h-8 w-32 cursor-pointer items-center justify-center gap-2 border border-black px-5 uppercase">
              <p className="text-xs font-medium">view all</p>
              <img src={up_arrow} alt="up_arrow" />
            </div>
          </Link>
        </div>
      </div>
      <article className="scroll-container scroll-snap-x mandatory scrollbar-width-thin scrollbar-thumb-gray-500 scroll-smooths w-[70%] flex-1 overflow-x-auto pb-4 transition-all duration-300">
        {products.length > 0 && (
          <div className="flex gap-10 pr-4">
            {products.map((data) => {
              if (data._id === except) return null;
              return (
                <div key={data._id}>
                  <Link to={`/product/${data._id}`}>
                    <Products
                      name={data.name}
                      price={data.price}
                      collaborations={data.collaborations}
                      images={data.images}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
};

export default SpecialCategory;
