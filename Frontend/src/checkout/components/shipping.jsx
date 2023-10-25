import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../../../redux/asis";
import axios from "axios";
import VowelItalicizer from "../../components/vowelItalicizer";
import { toast } from "react-hot-toast";
import Loading from "./loading";

const Shipping = ({ setActiveStep }) => {
  const orderDetails = useSelector((state) => state.asis.order);
  const cartData = useSelector((state) => state.asis.cart);
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    country,
    shipping,
  } = orderDetails;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedShipping, setSelectedShipping] = useState(shipping || null);
  const [selectedShippingPrice, setSelectedShippingPrice] = useState(0);

  const dispatch = useDispatch();

  const handleAddShippingDetails = () => {
    setIsLoading(true);
    if (!selectedShipping) {
      toast.error("Select a shipping method", {
        style: {
          border: "1px solid red",
          padding: "8px 16px",
          color: "red",
          borderRadius: "4px",
        },
      });

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return;
    }
    dispatch(setOrder({ shipping: selectedShipping }));
    setActiveStep(3);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleFetchShippingDetails = async () => {
    setIsLoading(true);
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}shippings`;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !country
    ) {
      setActiveStep(1);
      return;
    }
    try {
      let { data } = await axios.get(apiUrl);
      setData(data.shipping);
      if (selectedShipping) {
        setSelectedShippingPrice(
          data.shipping.find((item) => item._id === selectedShipping).fee,
        );
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    handleFetchShippingDetails();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex w-full  flex-col gap-y-12 py-8">
      <h2 className="text-2xl font-semibold uppercase">
        {/* / <VowelItalicizer text={"Shipping method"} /> */}
        Shipping method
      </h2>
      <section className="flex flex-col gap-8">
        {data.map((shippingDetail) => (
          <div
            key={shippingDetail._id}
            className="flex cursor-pointer items-center gap-x-6 px-2 py-2 text-sm font-semibold text-asisDark/40 backdrop-blur-md sm:text-base"
            onClick={() => {
              setSelectedShipping(shippingDetail._id);
              dispatch(setOrder({ shipping: shippingDetail._id }));
              setSelectedShippingPrice(shippingDetail.fee);
            }}
          >
            <div className=" flex h-5 w-5 items-center justify-center rounded-full border-2 border-asisDark">
              <div
                className={`h-3 w-3 rounded-full ${
                  selectedShipping === shippingDetail._id && "bg-asisDark"
                }`}
              ></div>
            </div>
            <h3
              className={`flex-1 capitalize ${
                selectedShipping === shippingDetail._id && "text-asisDark"
              }`}
            >
              {shippingDetail.name}
            </h3>
            <p
              className={`flex-1 text-sm ${
                selectedShipping === shippingDetail._id && "text-asisDark"
              }`}
            >
              {shippingDetail.durationInDays} DAYS
            </p>
            <p
              className={`flex-1 text-right text-sm ${
                selectedShipping === shippingDetail._id && "text-asisDark"
              }`}
            >
              {Intl.NumberFormat(
                shippingDetail.currency == "USD" ? "en-US" : "en-NG",
                {
                  style: "currency",
                  currency: shippingDetail.currency,
                },
              ).format(shippingDetail.fee)}{" "}
              {shippingDetail.currency}
            </p>
          </div>
        ))}
      </section>
      <section className="border-2 border-asisDark px-2 py-4 text-xs sm:px-8">
        <div className="mb-2 flex items-start justify-between">
          <h2 className="">Contact Information: </h2>
          <p className=" text-right font-semibold ">
            {` `}
            {firstName},{lastName},{email},<br className="block sm:hidden"></br>
            {phone}
          </p>
        </div>
        <div className="mb-2 flex items-start justify-between">
          <h2 className="">Shipping Address: </h2>
          <p className=" text-right font-semibold">
            {` `}
            {address},{city},<br></br>
            {state},{country},{zip}
          </p>
        </div>
      </section>
      <section className="flex items-end justify-between gap-1 pl-4 ">
        <button
          onClick={() => setActiveStep(1)}
          className="mt-3 h-min border-b-2 border-asisDark px-4 pb-1.5 text-xs font-bold sm:mt-auto sm:text-sm "
        >
          Go back
        </button>
        <button
          disabled={isLoading}
          onClick={handleAddShippingDetails}
          className={`w-8/12 rounded-md bg-asisDark py-3 text-xs  font-bold text-white sm:w-9/12 sm:text-base ${
            selectedShipping ? "" : "opacity-50 "
          }`}
        >
          Go to Payment -{" "}
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(cartData.totalPrice + selectedShippingPrice)}{" "}
          USD
        </button>
      </section>
    </div>
  );
};

export default Shipping;
