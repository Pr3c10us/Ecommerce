import React from "react";
import useFetch from "./useFetch.jsx";
import Products from "./products.jsx";
import { Link } from "react-router-dom";
const Category = () => {
  const { data } = useFetch(
    `${import.meta.env.VITE_BACKEND_URL}products/?limit=3`,
  );
  console.log(data);
  return (
    <section className=" flex w-full items-start justify-between border-t-[1.5px] border-asisDark pt-12 uppercase">
      <article className="w-[200px] text-right text-[40px]/[40px] font-[600]">
        /masked scroll variants
      </article>
      <article>
        {data && (
          <div className="flex gap-10">
            {data.products.map((data) => {
              return (
                <div key={data._id}>
                  <Link to={`/product/${data._id}`}>
                    <Products
                      name={data.name}
                      price={data.price}
                      collaborations={data.collaborations}
                      images={data.images}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
};

export default Category;
