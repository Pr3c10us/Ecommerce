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
    <section className="flex h-full min-h-screen flex-col items-center gap-y-8">
      <div className="flex w-full justify-center p-4">
        <img src={homeLogo} alt="homeLogo" className="h-24" />
      </div>
      <Marquee />
      <article className="flex h-full w-full max-w-5xl flex-col gap-4">
        <h1 className="text-4xl font-bold uppercase">
          <VowelItalicizer text={"Our newest products"} />
        </h1>
        <div className="flex flex-1 gap-8">
          <div className="relative aspect-square basis-[30%] p-6">
            <ArticleCarousel>
              {data.map((product, index) => {
                return (
                  <div
                    className={`absolute h-full w-full space-y-2 `}
                    style={{ left: `${index * 100}%` }}
                  >
                    <h2 className="font-bold">{product.name}</h2>
                    <img
                      src={`${import.meta.env.VITE_BLOB_URL_DASHBOARD}${
                        product.smallImage[0]
                      }`}
                      alt={product.name}
                      className="object-cover"
                    />
                    <p className="font-semibold">{product.description}</p>
                  </div>
                );
              })}
            </ArticleCarousel>
          </div>
          <div className="relative aspect-square flex-1 p-6">
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
      <div className="flex w-full justify-center gap-x-2">
        <button className="cursor-not-allowed border border-asisDark px-6 py-1 font-semibold capitalize">
          Sign In
        </button>
        <button className="cursor-not-allowed border border-asisDark px-6 py-1 font-semibold capitalize">
          Sign Up
        </button>
        <Link
          to="/shop"
          className="bg-asisDark px-6 py-1 capitalize text-white"
        >
          Continue to shop as guest
        </Link>
      </div>
    </section>
  );
};

export default Page;
