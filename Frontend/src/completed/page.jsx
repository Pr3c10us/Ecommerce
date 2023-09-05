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
import arrow from "../assets/icons/upRightArrow.svg";

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
        `${import.meta.env.VITE_BACKEND_URL}products/random`,
      );
      let { data: orderData } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}orders/clientSecret`,
        { clientSecret },
      );
      console.log({ orderData, productData });
      setOrderInfo(orderData.order);
      setProducts(productData);
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
      <main className="my-10 grid w-full flex-col-reverse gap-12 md:flex-row lg:grid-cols-2 lg:gap-0">
        <section className="flex w-full px-4 py-5 lg:items-center lg:justify-center">
          <div className="w-full max-w-xl space-y-4 object-cover object-center lg:h-[50rem] lg:w-[36rem] lg:max-w-none">
            <img
              className="w-full border border-asisDark object-cover"
              src={`${import.meta.env.VITE_BLOB_URL}${products[0].images[0]}`}
              alt="thankyouImg"
            />
            <h2 className="text-2xl font-bold uppercase">
              {products[0].name}
            </h2>
            <p className="text-xs font-medium">{products[0].brief}</p>
            <Link
              className="mr-auto flex w-auto max-w-xs items-center justify-center gap-x-2 border-2 border-asisDark px-2 py-1 text-sm font-medium md:px-4 md:py-2 md:text-base"
              to={`/product/${products[0]._id}`}
            >
              View Product
              <img src={arrow} alt="arrow" className="w-4" />
            </Link>
          </div>
        </section>
        <section className="flex flex-col overflow-auto  lg:py-16">
          <div>
            <div className="flex max-w-xl flex-col gap-y-8 px-4 py-5">
              <h1 className="flex  w-full flex-col gap-y-4 text-5xl font-semibold uppercase md:text-5xl lg:text-6xl xl:text-7xl">
                <span>Thank you</span>
                <span className="flex w-full justify-end ">For your</span>
                <span className="pl-8">Order</span>
              </h1>
              <p className="flex w-full flex-col gap-y-4 text-left text-xs font-semibold uppercase">
                <span className="flex flex-col gap-2 leading-6 sm:flex-row sm:items-center">
                  YOUR ORDER NUMBER ID:{" "}
                  <span className="text-base  font-bold underline">
                    {orderInfo._id}
                  </span>{" "}
                </span>
                <span className="flex flex-col gap-2 leading-6 sm:flex-row sm:items-center">
                  YOUR ORDER PAYMENT STATUS IS:{" "}
                  <span
                    className={`text-base font-bold ${
                      orderInfo.paymentStatus == "successful" &&
                      "text-green-500"
                    } 
                   ${
                     orderInfo.paymentStatus == "processing" &&
                     "text-orange-500"
                   }
                  ${
                    (orderInfo.paymentStatus == "failed" ||
                      orderInfo.paymentStatus == "canceled") &&
                    "text-red-500"
                  }`}
                  >
                    {orderInfo.paymentStatus}{
                      orderInfo.paymentStatus == "processing" && ". . ."
                    }
                  </span>{" "}
                </span>
                <span className="flex flex-col gap-2 leading-6 sm:flex-row sm:items-center">
                  YOUR ORDER STATUS IS:{" "}
                  <span className="text-base font-bold tracking-wider ">
                    {" "}
                    {orderInfo.status == "pending"
                      ? "Placed"
                      : orderInfo.status}
                  </span>{" "}
                </span>
                <Link
                  className="ml-auto flex w-auto max-w-xs items-center justify-center gap-x-2 border-b-2 border-b-asisDark px-1 py-0.5 text-sm font-medium capitalize italic"
                  to={`/shop`}
                >
                  Continue Shopping
                  <img src={arrow} alt="arrow" className="w-4 rotate-45" />
                </Link>
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
          </div>
        </section>
      </main>
    );
  }
};

export default OrderComplete;
