import React, { useState, useEffect } from "react";
import Banner from "../components/banner";
import backToTop from "../assets/icons/back_to_top.svg";
import ShopProducts from "./component/shop_products";
import Filter from "./component/filter";
import Search from "./component/search";
import useFetch from "../components/useFetch";
import Loading from "../components/loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Page = () => {
  // States
  const [dynamicUrl, setDynamicUrl] = useState("products");
  const [hideFilter, setHideFilter] = useState(true);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // API URL
  const apiUrl = `${import.meta.env.VITE_API_URL}${dynamicUrl}`;
  // const { data } = useFetch(apiUrl);

  // Scroll to top on component mount
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const res = await axios.get(apiUrl);
        setData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/", { replace: true });
        setIsLoading(false);
      }
    };
    fetchData();
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Determine alignment based on product count
  const align = data?.products?.length <= 3 ? "items-start" : "";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex h-full flex-col md:gap-y-12">
      <div className="animate-text-pulse capitalize flex w-full items-center justify-center pt-8 text-center text-2xl md:text-5xl font-semibold text-green-500">
        <h1>Welcome to our online Store</h1>
      </div>
      <section className="flex h-full justify-start px-4">
        {" "}
        <div className={`flex h-full flex-1 justify-start gap-10`}>
          {/* Shop products */}
          {data && <ShopProducts hideFilter={hideFilter} data={data} />}

          {/* Filter */}
          {/* <div>
                {hideFilter && (
                  <div className="sticky top-12 hidden lg:block ">
                    <Filter setDynamicUrl={setDynamicUrl} />
                  </div>
                )}
              </div> */}
        </div>
      </section>
      <div className="relative mt-16 border-t border-asisDark">
        <img
          src={backToTop}
          alt="back_to_top"
          className="fixed  bottom-8 right-2 w-8 md:w-12 md:right-10 cursor-pointer"
          onClick={() => {
            handleScrollToTop();
          }}
        />
      </div>
    </div>
  );
};

export default Page;
