import React from "react";
import Products from "../../components/products";
import { Link } from "react-router-dom";

const ShopProducts = ({ data }) => {
  return (
    <section className="mt-5">
        <div className="flex flex-wrap justify-center gap-10">
          {/* Map through each product in data */}
          {data.products?.map((product) => (
            <div key={product._id}>
              {/* Link to individual product page */}
              <Link to={`/product/${product._id}`}>
                {/* Render the Products component for each product */}
                <Products
                  name={product.name}
                  price={product.price}
                  collaborations={product.collaborations}
                  images={product.images}
                />
              </Link>
            </div>
          ))}
        </div>
    </section>
  );
};

export default ShopProducts;
