import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import Collection from "./components/collection";
// import new3 from "../assets/images/new3.png";
// import Category from "../components/Category";
// import SpecialCategory from "../components/specialCategory";
const Page = () => {
  const { id } = useParams();
  console.log(id)
  const name = "MASKED SCROLL VARIANTS"
  const product_data = {
    name: "asis alako real",
    price: 50000,
    collaborations: ["nike", "yezzy"],
    images: [new3, new3],
  };
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div className=" h-full p-0 uppercase">
      {/* <Collection product_data={product_data} id={id} />
      <Category />
      <SpecialCategory name={name}/>
      <Category />      */}
    </div>
  );
};

export default Page;
