import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../../../redux/asis";
import axios from "axios";
import VowelItalicizer from "../../components/vowelItalicizer";
import { toast } from "react-hot-toast";
import Loading from "./loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = ({ setActiveStep }) => {
  const orderDetails = useSelector((state) => state.asis.order);
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
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  const [shippingMethods, setShippingMethods] = useState({});

  const getShippingMethods = async () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}shippings/${shipping}`;
    try {
      const { data } = await axios.get(apiUrl);
      setShippingMethods(data);
    } catch (error) {
      console.log(error);
      setActiveStep(1);
    }
  };
  const handleEffect = async () => {
    setIsLoading(true);
    const apiUrl = `${import.meta.env.VITE_API_URL}orders/stripe`;
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
    if (!shipping) {
      setActiveStep(2);
      return;
    }
    try {
      await getShippingMethods();
      let { data } = await axios.post(apiUrl, orderDetails);
      const { clientSecret,_id } = data.order;
      setClientSecret(clientSecret);
      setOrderId(_id)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleEffect();
  }, []);

  const appearance = {
    theme: "flat",
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: "1.5",
      borderRadius: "0px",

      colorBackground: "transparent",
      colorPrimaryText: "#262626",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input": {
        padding: "16px 16px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#0B0B0B",
        // make input background transparent
        backgroundColor: "transparent",
      },
      ".Input:focus": {
        borderColor: "#0B0B0B",
        // remove ring around input
        boxShadow: "none",
        ring: "0",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#0B0B0B",
        backgroundColor: "transparent",
      },
      ".Tab:hover": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#0B0B0B",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "transparent",
        boxShadow:
          "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative flex flex-col gap-12 py-8">
      <h2 className="text-2xl font-semibold uppercase">
        {/* / <VowelItalicizer text={"Payment method"} /> */}
        Payment method
      </h2>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            firstName={firstName}
            lastName={lastName}
            email2={email}
            phone={phone}
            address={address}
            city={city}
            state={state}
            zip={zip}
            country={country}
            shipping={shipping}
            shippingMethods={shippingMethods}
            orderId={orderId}
          />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
