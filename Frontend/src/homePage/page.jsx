import React, { useRef } from "react";
import SelectedOne from "./pages/selectedOne";
import SelectedOneCS from "./pages/selectedOneCS";
import SelectedThree from "./pages/selectedThree";
import SelectedTwo from "./pages/selectedTwo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Displayed from "./pages/displayed";
import Displayed2 from "./pages/displayed2";
import Header from "./components/header";

const page2 = () => {
  const navigate = useNavigate();

  const bodyRef = useRef(null);

  const [displayProduct, setDisplayProduct] = React.useState(null);
  const [fallbackProducts, setFallbackProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [navType, setNavType] = React.useState(1);

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}home`,
      );
      const displayProduct = data.product;
      setDisplayProduct(displayProduct);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}products?limit=5`,
          );
          setFallbackProducts(data.products);
          setLoading(false);
        } catch (error) {
          console.log(error);
          // navigate("/store");
        }
      } else {
        console.log(error);
        // navigate("/store");
      }
    }
  };

  React.useEffect(() => {
    handleFetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[100svh] items-center justify-center sm:h-screen">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden" ref={bodyRef}>
      <Header type={navType} />
      {/* {displayProduct != null ? (
        <Displayed
          bodyRef={bodyRef}
          product={displayProduct}
          setNavType={setNavType}
        />
      ) : (
        <></>
      )} */}
      {displayProduct != null ? (
        <Displayed2
          bodyRef={bodyRef}
          product={displayProduct}
          setNavType={setNavType}
        />
      ) : (
        <></>
      )}
    </main>
  );
};

export default page2;
