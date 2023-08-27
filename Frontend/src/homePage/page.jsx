import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import homeLogo from "../assets/icons/homeLogo.svg";
import Marquee from "../components/marquee";
import Loading from "../components/loading";
import VowelItalicizer from "../components/vowelItalicizer";
import Carousel from "../components/carousel";
import ArticleCarousel from "../components/articleCarousel";
import FancyBorder from "../components/fancyBorder";

const Page = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}dashboard`,
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
    <section className="flex min-h-screen flex-col items-center py-4 gap-y-4 sm:h-full sm:gap-y-8">
      <div className="flex w-full justify-center px-4">
        <img src={homeLogo} alt="homeLogo" className="h-12 sm:h-24" />
      </div>
      <Marquee />
      <article className="flex flex-1 w-full max-w-5xl flex-col h-full sm:gap-4">
        <h1 className="text-center text-2xl  font-semibold uppercase sm:text-left sm:text-4xl">
          Our newest products
        </h1>
        <div className="flex flex-1 items-stretch gap-8 px-4">
          <div className="relative aspect-square basis-[100%] py-6 px-2 sm:px-6 sm:basis-[30%]">
            <ArticleCarousel>
              {data.map((product, index) => {
                return (
                  <div
                    className={`absolute h-full w-full space-y-4 `}
                    style={{ left: `${index * 100}%` }}
                  >
                    <h2 className="text-center text-2xl font-semibold sm:text-left sm:text-base sm:font-bold">
                      {product.name}
                    </h2>
                    <div className="relative flex h-80 w-full items-center overflow-hidden p-4 sm:h-auto sm:p-0">
                      <div className="sm:hidden">
                        <FancyBorder />
                      </div>
                      <img
                        src={`${import.meta.env.VITE_BLOB_URL_DASHBOARD}${
                          product.smallImage[0]
                        }`}
                        alt={product.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <p className="font-semibold">{product.description}</p>
                  </div>
                );
              })}
            </ArticleCarousel>
          </div>
          <div className="relative hidden aspect-square flex-1 p-6 sm:block">
            <div className="relative flex items-center p-6">
              <FancyBorder />
              <Carousel>
                {data.map((product) => {
                  return (
                    <img
                      src={`${import.meta.env.VITE_BLOB_URL_DASHBOARD}${
                        product.largeImage[0]
                      }`}
                      alt={product.name}
                      className="object-cover"
                    />
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </article>
      <div className="flex w-full px-[15vw] flex-col items-center justify-start gap-2 sm:flex-row sm:items-start sm:justify-center">
        <div className=" grid grid-cols-2 sm:flex w-full gap-x-2 sm:w-auto">
          <button className="cursor-not-allowed border border-asisDark px-6 py-2 sm:py-1 font-semibold capitalize">
            Sign In
          </button>
          <button className="cursor-not-allowed border border-asisDark px-6 py-2 sm:py-1 font-semibold capitalize">
            Sign Up
          </button>
        </div>
        <Link
          to="/shop"
          className="w-full bg-asisDark px-6 py-2 sm:py-1 capitalize text-white sm:w-auto"
        >
          Continue to shop as guest
        </Link>
      </div>
    </section>
  );
};

export default Page;
