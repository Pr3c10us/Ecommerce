import React from "react";
import Logo from "../assets/homeLogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import CountInStock from "./components/countInStock";
import CountInStockDisplay from "./components/countInStockDisplay";

const AddProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState([
    "clothes",
    "footwear",
    "accessories",
    "Others",
  ]);
  const [selectedCategory, setSelectedCategory] = React.useState("clothes");
  const [countInStock, setCountInStock] = React.useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      brief: "",
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      setSubmitting(false);
    },

    validationSchema: Yup.object({
      name: Yup.string().required("name is Required"),
      price: Yup.string()
        .matches(/^[0-9.]+$/, "enter a valid price")
        .required("can not be empty"),

      description: Yup.string().required("description is Required"),
      brief: Yup.string().required("brief is Required"),
    }),
  });
  return (
    <main className="py-12 font-[500]">
      <form className="flex flex-col gap-y-8" onSubmit={formik.handleSubmit}>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="name">
            product Name
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <input
              type="text"
              id="name"
              name="name"
              {...formik.getFieldProps("name")}
              className=" w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-2/5"
            />
            <div className="h-2">
              {formik.touched.name && formik.errors.name ? (
                <p className="text-xs capitalize text-red-500">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="brief">
            product Brief
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <input
              type="text"
              id="brief"
              name="brief"
              {...formik.getFieldProps("brief")}
              className=" w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-2/5"
            />
            <div className="h-2">
              {formik.touched.brief && formik.errors.brief ? (
                <p className="text-xs capitalize text-red-500">
                  {formik.errors.brief}
                </p>
              ) : null}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row">
          <label className="basis-[20%] capitalize" htmlFor="description">
            product details
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <textarea
              type="text"
              id="description"
              name="description"
              {...formik.getFieldProps("description")}
              className="min-h-[8rem] w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-3/4"
            />
            <div className="h-2">
              {formik.touched.description && formik.errors.description ? (
                <p className="text-xs capitalize text-red-500">
                  {formik.errors.description}
                </p>
              ) : null}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="brief">
            product Price
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <input
              type="number"
              id="price"
              name="price"
              min={0}
              {...formik.getFieldProps("price")}
              className=" w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-2/5"
            />
            <div className="h-2">
              {formik.touched.price && formik.errors.price ? (
                <p className="text-xs capitalize text-red-500">
                  {formik.errors.price}
                </p>
              ) : null}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="brief">
            Category
          </label>
          <div className="flex w-full flex-wrap gap-4 text-asisDark ">
            {category.map((item, index) => (
              <button
                type="button"
                key={index}
                className={`${
                  selectedCategory == item
                    ? "bg-asisDark text-white"
                    : "border border-asisDark bg-transparent text-asisDark"
                } rounded px-4 py-2 capitalize font-normal`}
                onClick={() => setSelectedCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="brief">
            Count in Stock
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <CountInStock
              countInStock={countInStock}
              setCountInStock={setCountInStock}
            />
            <CountInStockDisplay
              countInStock={countInStock}
              setCountInStock={setCountInStock}
            />
          </section>
        </section>
      </form>
    </main>
  );
};

export default AddProduct;
// name: 'Genevive Sweater Swagger lee',
//   price: '300',
//   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tempus libero. Morbi a bibendum lacus. Mauris blandit, ipsum id elementum pellentesque, augue augue aliquam risus, non egestas quam dui vitae ipsum. Ut sodales tempus tortor, eget sagittis mauris molestie et. Aliquam placerat augue at ipsum ornare, id egestas elit pulvinar. Morbi a massa aliquet, pellentesque dolor vitae, dignissim felis.',
//   brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   category: 'Shirts',
//   countInStock: [
//     [Object: null prototype] { size: 'xl', quantity: '5' },
//     [Object: null prototype] { size: 'lg', quantity: '5' },
//     [Object: null prototype] { size: 'md', quantity: '5' },
//     [Object: null prototype] { size: 'sm', quantity: '5' }
//   ],
