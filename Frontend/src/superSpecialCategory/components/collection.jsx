import React from "react";
import Products from "../../components/products";
import down from "../../assets/icons/down_category.svg";
import { Link } from "react-router-dom";
const Collection = ({ product_data, id }) => {
  const superSpecialCategoryData = [
    "pre-fall 2023",
    "uncommon [limited time sale]",
    "essentials 2023",
  ];

  // Find the index of the matching data item based on the provided id
  const matchingIndex = superSpecialCategoryData.findIndex(
    (data) => data === id,
  );

  // If matchingIndex is valid (greater than or equal to 0), remove the matched item and reinsert it at the end
  if (matchingIndex >= 0) {
    const matchedData = superSpecialCategoryData.splice(matchingIndex, 1)[0];
    superSpecialCategoryData.push(matchedData);
  }

  return (
    <div>
      <section className="mt-12 text-asisDark">
        <p className="mb-5 w-[35vw] text-[48px]/[48px] font-[400]">/{id}</p>
        <article className="flex w-full items-start justify-between border-t-[1.5px] border-asisDark pb-14 pt-7 ">
          <div className="flex gap-6">
            <Products
              name={product_data.name}
              price={product_data.price}
              collaborations={product_data.collaborations}
              images={product_data.images}
            />
            <Products
              name={product_data.name}
              price={product_data.price}
              collaborations={product_data.collaborations}
              images={product_data.images}
            />
          </div>
          <div className="w-[340px]">
            <p className="mb-3 text-[32px]/[32px] font-medium">collections</p>
            <div className="text-[16px]/[24px] font-[400] text-[#5C5C5C]">
              {superSpecialCategoryData.map((data, index) => (
                <div key={index}>
                  <Link to={`/superspecialcategory/${data}`}>
                    <div
                      className={`flex w-full cursor-pointer items-center justify-between border-t-[1px] border-[#5C5C5C] py-2 ${
                        index === superSpecialCategoryData.length - 1
                          ? "border-y-[1px] border-asisDark pl-14 text-center font-medium italic text-asisDark"
                          : ""
                      }`}
                    >
                      {data}
                      <img src={down} alt="down" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Collection;
