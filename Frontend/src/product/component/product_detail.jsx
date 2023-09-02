import React, { useState, useEffect } from "react";
import down from "../../assets/icons/down.svg";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCart } from "../../../redux/asis";
import CartLoading from "../../components/cartLoader";
import AddToCartLoading from "./addToCartLoading";
import VowelItalicizer from "../../components/vowelItalicizer";

const Product_detail = ({ data }) => {
  // States
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const dispatch = useDispatch();

  function getFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
  const [currentTime, setCurrentTime] = useState(getFormattedTime());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
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
    if (selectedSize) {
      try {
        axios.defaults.withCredentials = true;
        let item = {
          productId: data._id,
          size: selectedSize,
          quantity: 1,
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
      toast.error("Select a size to add to cart", {
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

  return (
    <section className="product_container flex h-full flex-col border-asisDark lg:border-y-2">
      {/* Product details */}
      {data ? (
        <section className="flex h-full flex-col items-stretch gap-5 lg:flex-row">
          {/* Thumbnail images */}
          <div className="flex flex-col-reverse lg:flex-row">
            <section className="gap flex basis-7 flex-wrap items-center justify-center py-5 lg:flex-col lg:justify-start">
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
                    className="h-16 w-14 object-cover object-center "
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

          <section className="w-full flex-1 space-y-6 py-4 lg:px-4">
            <p className=" text-3xl font-medium uppercase text-asisDark">
              {data.name}
            </p>
            {/* Sizes */}
            <section className="flex flex-wrap gap-x-5 gap-y-3">
              {data.countInStock?.map((sizeData, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSize(sizeData.size)}
                  className={`flex cursor-pointer items-center justify-center rounded border px-3 py-2 text-xs font-medium uppercase ${
                    selectedSize === sizeData.size
                      ? " border-asisDark text-asisDark"
                      : " border-[#C4C4C4] text-[#C4C4C4]"
                  }`}
                >
                  {sizeData.size}
                </div>
              ))}
            </section>

            {/* Additional details */}
            <section className="">
              {/* Time */}
              {/* <article className="flex mb-4 items-center justify-between text-sm md:text-base font-semibold">
                <p className="uppercase text-asisDark">time</p>
                <p className="text-[#17A500]">{currentTime}</p>
              </article> */}

              {/* Description */}
              <p className="text-sm font-medium text-asisDark">{data.brief}</p>

              {/* Add to cart */}

              <button
                className={`relative my-4 flex max-h-12 w-full justify-center rounded  py-4 text-center text-xs font-semibold uppercase ${
                  selectedSize
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
                    }).format(data.price)}{" "}
                    USD
                  </p>
                )}
              </button>

              {/* Add to wishlist */}
              {/* <button className="relative mb-3 w-full cursor-pointer border border-asisDark py-4 text-center text-xs font-semibold uppercase text-asisDark">
                add to wishlist
              </button> */}

              {/* Accordion */}
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

                {/* <article className="flex cursor-pointer items-center justify-between py-2">
                  <p>size guild</p>
                  <img src={down} alt="down" />
                </article> */}
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
        </section>
      ) : (
        <section>product not found</section>
      )}
    </section>
  );
};

export default Product_detail;
