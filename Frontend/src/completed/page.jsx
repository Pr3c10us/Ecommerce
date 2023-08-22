import React, { useEffect, useState } from "react";
import thankyouImg from "../assets/images/thankyou.png";
import VowelItalicizer from "../components/vowelItalicizer";
import { useSearchParams, Link } from "react-router-dom";
import Loading from "../components/loading";
import axios from "axios";
import Products from "../components/products";
import left_button from "../assets/icons/left_button.svg";
import right_button from "../assets/icons/right_button.svg";
import up_arrow from "../assets/icons/up_arrow.svg";
const OrderComplete = () => {
  // http://localhost:5173/complete?payment_intent=pi_3NhfRLGXKsHfO3r91xoOWZQM&payment_intent_client_secret=pi_3NhfRLGXKsHfO3r91xoOWZQM_secret_gSzi3swWt5tLvxGvRvS4ToPYS&redirect_status=succeeded
  let [searchParams, setSearchParams] = useSearchParams();
  const [clientSecret, setClientSecret] = useState(
    searchParams.get("payment_intent_client_secret"),
  );
  const [redirectStatus, setredirectStatus] = useState(
    searchParams.get("redirect_status"),
  );
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState({});

  const handleEffect = async () => {
    setIsLoading(true);
    try {
      let { data: productData } = await axios.get(
        `${import.meta.env.VITE_API_URL}products/?limit=10`,
      );
      let { data: orderData } = await axios.post(
        `${import.meta.env.VITE_API_URL}orders/clientSecret`,
        { clientSecret },
      );
      console.log({ orderData, productData });
      setOrderInfo(orderData.order);
      setProducts(productData.products);
      return setIsLoading(false);
    } catch (error) {
      console.log(error);
      return setIsLoading(false);
    }
  };

  useEffect(() => {
    handleEffect();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (redirectStatus == "succeeded") {
    return (
      <main className="my-10 grid w-full flex-col-reverse border-y border-t-asisDark md:grid-cols-2 md:flex-row">
        <section className="flex border-r-asisDark px-10 py-5 md:border-r">
          <div className="h-[50rem] w-[36rem] border border-asisDark object-cover object-center">
            <img
              className="h-full object-cover"
              src={thankyouImg}
              alt="thankyouImg"
            />
          </div>
        </section>
        <section className="flex flex-col overflow-auto md:px-10">
          <div>
            <div className="flex flex-col gap-y-2 border-b border-b-asisDark py-5">
              <h1 className="flex w-full max-w-xl flex-col gap-y-4 text-6xl font-semibold uppercase sm:text-7xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span>
                  /<VowelItalicizer text={"Thank you"} />
                </span>
                <span className="flex w-full justify-end ">
                  <VowelItalicizer text={"For your"} />
                </span>
                <span>
                  <VowelItalicizer text={"Order"} />
                </span>
              </h1>
              <p className="flex w-full flex-col gap-y-4 text-right text-xs font-semibold uppercase">
                <span className="flex flex-col leading-6">
                  YOUR ORDER NUMBER IS:{" "}
                  <span className="text-sm font-bold italic underline">
                    {orderInfo._id}
                  </span>{" "}
                </span>
                <span className="flex flex-col leading-6">
                  YOUR ORDER PAYMENT STATUS IS:{" "}
                  <span className="text-sm font-bold italic underline">
                    {orderInfo.paymentStatus}
                  </span>{" "}
                </span>
                <span className="flex flex-col leading-6">
                  YOUR ORDER STATUS IS:{" "}
                  <span className="text-sm font-bold italic underline">
                    {orderInfo.status}
                  </span>{" "}
                </span>
              </p>
            </div>
            {/* <div>
              <h1 className="text-4xl font-semibold uppercase">
                / <VowelItalicizer text={"your products"} />{" "}
              </h1>
              <div className="grid grid-cols-3 gap-4">
                {orderInfo.products.map((data) => {
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
            </div> */}
            <div className="flex w-full flex-col">
              <section>
                <section className="relative flex w-full flex-col items-stretch justify-between gap-8 border-t border-asisDark py-14 pt-12 uppercase">
                  <div className=" flex flex-col gap-y-8 text-left text-2xl font-semibold">
                    <div className="flex w-full items-end justify-between">
                      <p>
                        {" "}
                        /{" "}
                        <VowelItalicizer
                          text={"you may also be interested in"}
                        />{" "}
                      </p>
                      {/* <div className="">
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
                      </div> */}
                    </div>
                    <div className="ml-auto w-56">
                      <Link to={`/shop`}>
                        <div className=" ml-auto flex h-8 w-32 cursor-pointer items-center justify-center gap-2 border border-black px-5 uppercase">
                          <p className="text-xs font-medium">view all</p>
                          <img src={up_arrow} alt="up_arrow" />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <article className="scroll-container scroll-snap-x mandatory scrollbar-width-thin scrollbar-thumb-gray-500 w-full flex-1 overflow-x-auto scroll-smooth pb-5 transition-all duration-300">
                    {products.length > 0 && (
                      <div className="flex gap-10 pr-4">
                        {products.map((data) => {
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
              </section>
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default OrderComplete;
