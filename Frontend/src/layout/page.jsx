import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Cart from "../components/cart";
import Wishlist from "../components/wishlist";
import collection_img_2 from "../assets/images/collection_img_2.png";
import Banner from "../components/banner";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../redux/asis";

const Page = () => {
  // State to control the visibility of the cart and wishlist
  const [hideCart, setHideCart] = useState(false);
  // const [hideWish, setHideWish] = useState(false);

  const cartData = useSelector((state) => state.asis.cart);
  const dispatch = useDispatch();

  const handleGetCartContent = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.get(`${import.meta.env.VITE_API_URL}carts`);
      console.log(response.data);
      // setCartData(response.data.products);
      dispatch(setCart(response.data));
      console.log(cartData);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
    handleGetCartContent();
  }, []);

  useEffect(() => {}, []);

  return (
    <main className="h-full  flex flex-col px-8 pb-8">
      <Toaster position="top-right" />
      <Header
        setHideCart={setHideCart}
        // setHideWish={setHideWish}
        cartLength={cartData?.products?.length}
        // wishlistData={wishData}
      />

      {hideCart && (
        <Cart setHideCart={setHideCart} cartData={cartData.products} />
      )}

      <Outlet />
    </main>
  );
};

export default Page;
