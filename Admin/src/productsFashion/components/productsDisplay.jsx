import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../loading";
import ProductItem from "./productItem";
import AddIcon from "../../assets/add.svg";
import ThinAddIcon from "../../assets/thinAdd.svg";

import { Link } from "react-router-dom";

const ProductsDisplay = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}products`;

  // Scroll to top on component mount
  const fetchData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;
      const res = await axios.get(apiUrl);
      setProducts(res.data.products);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // navigate("/", { replace: true });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="2xl:grid-cols- grid gap-x-8 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-16">
        <div className="flex flex-col gap-y-4">
          <Link
            to={`/products/addProduct`}
            className="flex h-[25rem] items-center justify-center border border-asisDark bg-white/50"
          >
            <img src={ThinAddIcon} alt="edit" className="h-30" />
          </Link>
          <Link
            className="flex items-center justify-center gap-2 rounded border border-asisDark py-2 text-sm font-medium capitalize"
            to={`/products/addProduct`}
          >
            <img src={AddIcon} alt="edit" className="h-6" />
            Add Product
          </Link>
        </div>
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              image={product.images[0]}
              id={product._id}
              name={product.name}
            />
          );
        })}
      </section>
    </>
  );
};

export default ProductsDisplay;
