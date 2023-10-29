import React, { useState, useEffect } from "react";
import down from "../../assets/icons/down.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "../../../redux/asis";
import AddToCartLoading from "./addToCartLoading";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiArrowLongRight } from "react-icons/hi2";
import Measurements from "./measurements";

const Product_detail = ({ data }) => {
  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [measurements, setMeasurements] = React.useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setMeasurements(data.measurements);
  }, []);

  // Effect to set initial selected image
  useEffect(() => {
    if (data.images && data.images.length > 0) {
      setSelectedImage(data.images[0]);
    }
  }, [data]);

  // Handle adding to cart
  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // check if all item value in measurements is filled
    measurements.forEach((measurement) => {
      if (
        !measurement.value ||
        measurement.value === "" ||
        measurement.value <= 0
      ) {
        setIsFilled(false);
      }
    });
    if (isFilled) {
      try {
        axios.defaults.withCredentials = true;
        let item = {
          productId: data._id,
          measurements,
          quantity,
        };
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}carts`,
          item,
        );
        dispatch(setCart(response.data.cart));
        toast.success("Item added to cart", {
          style: {
            border: "1px solid green",
            padding: "8px 16px",
            color: "green",
            borderRadius: "4px",
          },
          iconTheme: {
            primary: "green",
            secondary: "#FFFAEE",
          },
        });
        setIsAddingToCart(false);
      } catch (error) {
        console.log(error);
        toast.error(
          error.response.data.msg || "Failed to add item, try again",
          {
            style: {
              border: "1px solid red",
              padding: "8px 16px",
              color: "red",
              borderRadius: "4px",
            },
          },
        );
        setIsAddingToCart(false);
      }
    } else {
      toast.error("Fill all measurements", {
        style: {
          border: "1px solid red",
          padding: "8px 16px",
          color: "red",
          borderRadius: "4px",
        },
      });
      setIsAddingToCart(false);
    }
  };

  useEffect(() => {
    measurements.forEach((measurement) => {
      if (
        !measurement.value ||
        // measurement.value === "" ||
        measurement.value <= 0
      ) {
        setIsFilled(false);
      } else {
        setIsFilled(true);
      }
    });
  }, [measurements]);

  return (
    <section className="product_container flex h-full flex-col border-asisDark lg:border-y-2">
      {/* Product details */}
      {data ? (
        <section className="flex h-full flex-col items-stretch gap-5 lg:flex-row">
          {/* Thumbnail images */}
          <div className="flex flex-col-reverse lg:flex-row">
            <section className="gap-2 flex basis-7 flex-wrap items-center justify-center py-5 lg:flex-col lg:justify-start">
              {data.images?.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`flex h-20 w-24 cursor-pointer items-center justify-center bg-contain bg-center bg-no-repeat ${
                    img === selectedImage
                      ? `bg-[url('./assets/images/frames.png')]`
                      : ""
                  }`}
                >
                  <img
                    src={`${import.meta.env.VITE_BLOB_URL}${img}`}
                    alt="collection_img"
                    className="h-16 w-14 object-contain object-top "
                  />
                </div>
              ))}
            </section>

            {/* Selected image */}
            <section className="flex items-center justify-center border-asisDark px-4 py-5 lg:border-x-2 lg:px-3">
              {selectedImage && (
                <img
                  src={`${import.meta.env.VITE_BLOB_URL}${selectedImage}`}
                  className="w-[32rem] object-contain object-top lg:h-[47rem]"
                />
              )}
            </section>
          </div>
          {/* Product information */}
          {!data.comingSoon && (
            <section className="w-full flex-1 space-y-6 py-4 lg:px-4">
              <p className=" font-cinzel text-3xl font-bold uppercase text-asisDark">
                {data.name}
              </p>
              {/* Description */}
              <p className="text-sm font-medium capitalize text-asisDark">
                {data.brief}
              </p>
              {/* Quantity */}
              <section className="flex flex-col gap-2">
                {" "}
                <h2 className="font-medium">Quantity</h2>
                <div className="flex items-center">
                  <div
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((prev) => prev - 1);
                      }
                    }}
                    className="peer flex h-10 w-10 cursor-pointer items-center justify-center border border-asisDark bg-transparent py-2 text-center text-xs"
                  >
                    <AiOutlineMinus />
                  </div>
                  <div className="peer flex h-10 w-10 cursor-pointer items-center justify-center border-y border-y-asisDark bg-transparent py-2 text-center text-xs">
                    {quantity}
                  </div>
                  <div
                    onClick={() => {
                      setQuantity((prev) => prev + 1);
                    }}
                    className="peer flex h-10 w-10 cursor-pointer items-center justify-center border border-asisDark bg-transparent py-2 text-center text-xs"
                  >
                    <AiOutlinePlus />
                  </div>
                </div>
              </section>

              {/* Measurements */}
              <section className="flex flex-col gap-2">
                <h2 className="font-medium">MEASUREMENTS</h2>
                <section className="flex flex-wrap items-center gap-5">
                  <Measurements
                    measurements={measurements}
                    setMeasurements={setMeasurements}
                  />
                </section>
              </section>

              {/* Additional details */}
              <section className="">
                {/* Add to cart */}
                <button
                  className={`relative my-4 flex max-h-12 w-full justify-center rounded  py-4 text-center text-xs font-semibold uppercase ${
                    isFilled
                      ? "bg-asisDark text-[#FFFFFF]"
                      : "bg-asisDark/70 text-[#C4C4C4]"
                  }`}
                  disabled={isAddingToCart}
                  onClick={() => {
                    handleAddToCart();
                  }}
                >
                  {isAddingToCart ? (
                    <AddToCartLoading />
                  ) : (
                    <p>
                      Add to cart-{" "}
                      {Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(data.price * quantity)}{" "}
                      USD
                    </p>
                  )}
                </button>
                <section
                  onClick={() => setShowDescription((prev) => !prev)}
                  className="border-y border-asisDark text-sm uppercase text-asisDark "
                >
                  <article className="border-b1 flex cursor-pointer items-center justify-between border-asisDark py-2 font-semibold">
                    <p>product details</p>
                    <img
                      className={`transition-all duration-300 ${
                        showDescription ? "rotate-180 transform" : ""
                      }`}
                      src={down}
                      alt="down"
                    />
                  </article>
                </section>
                <div
                  className={`grid text-sm text-asisDark/80 transition-all duration-300 ${
                    showDescription ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"
                  } `}
                >
                  <p className="overflow-hidden">{data.description}</p>
                </div>
              </section>
            </section>
          )}
          {data.comingSoon && (
            <section className="flex flex-1 flex-col gap-4 py-4">
              <p className="text-3xl font-medium uppercase text-asisDark">
                {data.name}
              </p>
              {/* <div className="flex gap-4 text-xl items-center">
                <HiArrowLongRight /> Coming soon
              </div> */}
              <div className="flex items-center gap-4 text-3xl font-bold">
                <h1>This Product would be</h1>
                <h2 className="w-64 bg-asisDark p-2 text-white">
                  Launching Soon.
                </h2>
              </div>
            </section>
          )}
        </section>
      ) : (
        <section>product not found</section>
      )}
    </section>
  );
};

export default Product_detail;
