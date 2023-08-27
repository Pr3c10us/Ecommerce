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
      <main className="my-10 grid w-full flex-col-reverse lg:grid-cols-2 md:flex-row">
        <section className="flex justify-center items-center px-10 py-5">
          <div className="border border-asisDark object-cover object-center w-full md:h-[50rem] md:w-[36rem]">
            <img
              className="object-cover"
              src={thankyouImg}
              alt="thankyouImg"
            />
          </div>
        </section>
        <section className="flex flex-col lg:py-16 overflow-auto md:px-10">
          <div>
            <div className="flex flex-col gap-y-8 px-4 py-5">
              <h1 className="flex  w-full max-w-xl flex-col gap-y-4 text-5xl font-semibold uppercase sm:text-7xl md:text-5xl lg:text-6xl xl:text-7xl">
                <span>Thank you</span>
                <span className="flex w-full justify-end ">For your</span>
                <span className="pl-8">Order</span>
              </h1>
              <p className="flex w-full flex-col gap-y-4 text-left text-xs font-semibold uppercase">
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
          </div>
        </section>
      </main>
    );
  }
};

export default OrderComplete;
