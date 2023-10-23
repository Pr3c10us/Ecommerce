import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import homeLogo from "../assets/icons/homeLogo.svg";
import Loading from "../components/loading";
import VowelItalicizer from "../components/vowelItalicizer";
import Carousel from "../components/carousel";
import ArticleCarousel from "../components/articleCarousel";
import FancyBorder from "../components/fancyBorder";
import arrow from "../assets/icons/upRightArrow.svg";

const Page = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}products?limit=4`,
    );
    setData(data.products);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (loading) return <Loading />;

  const transform = (index) => {
    return `translate-x-[${index * 100}%]`;
  };

  return (
    <section className="flex min-h-screen flex-col items-center gap-y-4 py-4 md:h-full md:gap-y-8">
      <div className="flex w-full justify-center px-4">
        <img src={homeLogo} alt="homeLogo" className="h-12 md:h-24" />
      </div>
      <article className="flex h-full w-full max-w-5xl flex-1 flex-col md:gap-4">
        <h1 className="px-10 text-center text-2xl font-normal uppercase md:text-left md:text-4xl md:font-semibold">
          Our newest products
        </h1>
        <div className="flex flex-1 items-stretch gap-8 px-4">
          <div className="relative aspect-square basis-[100%] px-2 py-6 md:basis-[30%] md:px-6">
            <ArticleCarousel>
              {data.map((product, index) => {
                return (
                  <div
                    className={`absolute h-full w-full space-y-4 `}
                    style={{ left: `${index * 100}%` }}
                  >
                    <h2 className="text-center text-2xl font-normal md:text-left md:text-base md:font-semibold">
                      {product.name}
                    </h2>
                    <div className="relative flex h-80 w-full items-center overflow-hidden p-4 md:h-auto md:p-0">
                      <div className="md:hidden">
                        <FancyBorder />
                      </div>
                      <img
                        src={`${import.meta.env.VITE_BLOB_URL}${
                          product.images[1] || product.images[0]
                        }`}
                        alt={product.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <p className="font-normal">{product.description}</p>
                    <Link
                      className="mx-2 flex w-auto max-w-xs items-center justify-center gap-x-2 border-2 border-asisDark px-2 py-1 text-sm md:px-4 md:py-2 md:text-base"
                      to={`/product/${product._id}`}
                    >
                      View Product
                      <img src={arrow} alt="arrow" className="w-4" />
                    </Link>
                  </div>
                );
              })}
            </ArticleCarousel>
          </div>
          <div className="relative hidden aspect-square flex-1 p-6 md:block">
            <div className="relative flex items-center p-6">
              <FancyBorder />
              <Carousel>
                {data.map((product) => {
                  return (
                    <img
                      src={`${import.meta.env.VITE_BLOB_URL}${
                        product.images[0]
                      }`}
                      alt={product.name}
                      className="aspect-[9/16] h-full object-cover object-center "
                    />
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </article>
      <div className="flex w-full flex-col items-center justify-start gap-2 px-[15vw] md:flex-row md:items-start md:justify-center">
        <div className=" grid w-full grid-cols-2 gap-x-2 md:flex md:w-auto">
          <Link
            to={"/login"}
            className="border border-asisDark px-6 py-2 font-semibold capitalize md:py-1"
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className="border border-asisDark px-6 py-2 font-semibold capitalize md:py-1"
          >
            Sign Up
          </Link>
        </div>
        <Link
          to="/store"
          className="w-full bg-asisDark px-6 py-2 text-center capitalize text-white md:w-auto md:py-1"
        >
          Continue to store as guest
        </Link>
      </div>
    </section>
  );
};

export default Page;
