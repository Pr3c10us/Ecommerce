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
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OrderComplete = () => {
  const navigate = useNavigate();
  // http://localhost:5173/complete?payment_intent=pi_3NhfRLGXKsHfO3r91xoOWZQM&payment_intent_client_secret=pi_3NhfRLGXKsHfO3r91xoOWZQM_secret_gSzi3swWt5tLvxGvRvS4ToPYS&redirect_status=succeeded
  let [searchParams, setSearchParams] = useSearchParams();
  const [clientSecret, setClientSecret] = useState(
    searchParams.get("reference"),
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
      if (productData.length <= 0) {
        navigate("/store");
      }
      return setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      navigate("/store");
      return setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    handleEffect();
  }, []);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loading"
        // exit={{ opacity: 0 }}
        // className="flex h-screen w-full items-center justify-center bg-white"
        >
          <Loading />
        </motion.div>
      ) : (
        <main className="min-h-screen w-full px-4 py-12 font-['Inter'] text-[#1A1A1A] md:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            {/* Left Column: Success Message & Details */}
            <div className="flex flex-col justify-center space-y-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center space-x-4"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9.135-9.135"
                    />
                  </motion.svg>
                </div>
                <div>
                  <h3 className="font-['Playfair_Display'] text-lg text-gray-500">
                    <VowelItalicizer text="Payment Successful" />
                  </h3>
                  <p className="text-sm font-medium text-gray-400">
                    {new Date().toLocaleDateString(undefined, {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </motion.div>

              <div className="space-y-4">
                <h1 className="font-['Playfair_Display'] text-5xl font-bold leading-tight text-black sm:text-6xl md:text-7xl">
                  <VowelItalicizer text="Thank You" />
                  <br />
                  <span className="italic text-gray-400"><VowelItalicizer text="for your order." /></span>
                </h1>
                <p className="max-w-md text-lg text-gray-600">
                  Your order has been placed and is being processed. You will
                  receive an email confirmation shortly.{" "}
                  <span className="font-semibold text-gray-500">
                    (Please check your spam folder if you don't see it).
                  </span>
                </p>
              </div>

              <div className="">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Order ID
                    </p>
                    <p className="font-mono text-base font-bold">
                      {orderInfo._id}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Status
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium md:px-3 md:py-1 md:text-sm ${orderInfo.paymentStatus === "successful"
                        ? "bg-green-100 text-green-800"
                        : orderInfo.paymentStatus === "processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                        }`}
                    >
                      {orderInfo.paymentStatus === "processing"
                        ? "Processing..."
                        : orderInfo.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    to="/store"
                    className="group flex items-center justify-center gap-2 rounded-full border border-black bg-black px-8 py-3 text-sm font-bold text-white transition-all hover:bg-gray-800"
                  >
                    Continue Shopping
                    <motion.img
                      src={arrow}
                      alt="arrow"
                      className="w-4 invert filter"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        repeatDelay: 1,
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Product Showcase */}
            <div className="relative flex items-center justify-center">
              {products[0] && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative w-full max-w-md"
                >
                  <div className="absolute -inset-4 rotate-2 rounded-[2rem] bg-gradient-to-tr from-gray-100 to-gray-200 opacity-70 blur-2xl" />
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-white shadow-2xl">
                    <img
                      src={`${import.meta.env.VITE_BLOB_URL}${products[0].images[0]
                        }`}
                      alt={products[0].name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white">
                      <p className="mb-2 font-['Playfair_Display'] text-sm italic opacity-90">
                        Featured Collection
                      </p>
                      <h3 className="text-2xl font-bold uppercase tracking-wide">
                        <VowelItalicizer text={products[0].name} />
                      </h3>
                      <Link
                        to={`/product/${products[0]._id}`}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                      >
                        View Product
                        <img
                          src={arrow}
                          alt="arrow"
                          className="w-4 invert filter"
                        />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </main>
      )}
    </AnimatePresence>
  );
};

export default OrderComplete;
