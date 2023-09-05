import React from "react";
import Logo from "../assets/homeLogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import CountInStock from "./components/countInStock";
import CountInStockDisplay from "./components/countInStockDisplay";
import AddImages from "./components/addImages";

const AddProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState([
    "clothes",
    "footwear",
    "accessories",
    "others",
  ]);
  const [fileList, setFileLIst] = React.useState([]);
  const lorem =
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tempus libero. Morbi a bibendum lacus. Mauris blandit, ipsum id elementum pellentesque, augue augue aliquam risus, non egestas quam dui vitae ipsum. Ut sodales tempus tortor, eget sagittis mauris molestie et. Aliquam placerat augue at ipsum ornare, id egestas elit pulvinar. Morbi a massa aliquet, pellentesque dolor vitae, dignissim felis.";

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
      if (countInStock.length === 0) {
        toast.error("Please add atleast one size");
        setSubmitting(false);
        return;
      }
      if (fileList.length === 0) {
        toast.error("Please Upload atleast one image");
        setSubmitting(false);
        return;
      }
      const data = new FormData();
      data.append("name", values.name);
      data.append("price", values.price);
      data.append("description", values.description);
      data.append("brief", values.brief);
      data.append("category", selectedCategory);
      countInStock.forEach((item, index) => {
        data.append(`countInStock[${index}][size]`, item.size);
        data.append(`countInStock[${index}][quantity]`, item.quantity);
      });
      fileList.forEach((file) => {
        data.append("images", file);
      });

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}products/`, data)
        .then((res) => {
          toast.success("Product Added Successfully");
          navigate("/products");
        })
        .catch((err) => {
          toast.error(err.response.data.msg || "Something went wrong");
          setSubmitting(false);
        });
    },

    validationSchema: Yup.object({
      name: Yup.string().required("name is Required"),
      price: Yup.number().min(1).positive().required("price is Required"),

      description: Yup.string().required("description is Required"),
      brief: Yup.string().required("brief is Required"),
    }),
  });
  return (
    <main className="py-12 font-medium">
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
            product Price [$]
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
                } rounded px-4 py-2 font-normal capitalize`}
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
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="brief">
            Image Upload & Preview
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <AddImages fileList={fileList} setFileLIst={setFileLIst} />
          </section>
        </section>
        <section className="flex w-full items-end justify-end gap-4">
          <button
            type="button"
            disabled={formik.isSubmitting}
            onClick={() => navigate("/products")}
            className={`rounded bg-red-500 px-8 py-1.5 text-white ${
              formik.isSubmitting && "cursor-not-allowed opacity-50"
            }`}
          >
            cancel
          </button>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={`rounded bg-green-500 px-8 py-1.5 text-white ${
              formik.isSubmitting && "cursor-not-allowed opacity-50"
            }`}
          >
            Add Product
          </button>
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
