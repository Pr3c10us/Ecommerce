import React from "react";
import SelectedOne from "./pages/selectedOne";
import SelectedOneCS from "./pages/selectedOneCS";
import SelectedThree from "./pages/selectedThree";
import SelectedTwo from "./pages/selectedTwo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Displayed from "./pages/displayed";
import Header from "./components/header";

const page2 = () => {
  const navigate = useNavigate();

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
          // navigate("/shop");
        }
      } else {
        console.log(error);
        // navigate("/shop");
      }
    }
  };

  React.useEffect(() => {
    handleFetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <main className="flex h-[100svh] sm:h-screen flex-col items-center">
      <Header type={navType} />
      {displayProduct != null ? (
        <Displayed product={displayProduct} setNavType={setNavType} />
      ) : (
        <></>
      )}
    </main>
  );
};

export default page2;
