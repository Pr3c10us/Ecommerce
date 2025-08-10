import React, { useEffect } from "react";
import Logo from "../assets/vite.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Measurements from "./components/measurements";
import MeasurementsDisplay from "./components/measurementsDisplay";
import AddImages from "./components/addImages";
import Select from "react-select";
import AddVideos from "./components/addVideo";

const AddProduct = () => {
  const navigate = useNavigate();
  const [category, setCategory] = React.useState([
    "clothes",
    "footwear",
    "accessories",
    "others",
  ]);
  const [products, setProducts] = React.useState([]);
  const [fileList, setFileLIst] = React.useState([]);
  const [videoFileList, setVideoFileList] = React.useState([]);
  const [display, setDisplay] = React.useState(false);
  const lorem =
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tempus libero. Morbi a bibendum lacus. Mauris blandit, ipsum id elementum pellentesque, augue augue aliquam risus, non egestas quam dui vitae ipsum. Ut sodales tempus tortor, eget sagittis mauris molestie et. Aliquam placerat augue at ipsum ornare, id egestas elit pulvinar. Morbi a massa aliquet, pellentesque dolor vitae, dignissim felis.";
  const [selectedProduct, setSelectedProduct] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      shortDescription: "",
      urlForSizeChart: "",
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      
      if (fileList.length === 0) {
        toast.error("Please Upload atleast one image");
        setSubmitting(false);
        return;
      }
      if (videoFileList.length === 0) {
        toast.error("Please Upload atleast one video");
        setSubmitting(false);
        return;
      }

      const data = new FormData();
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("shortDescription", values.shortDescription);
      data.append("product", selectedProduct);
      // data.append("isComingSoon", comingSoon);
      data.append("display", display);
      fileList.forEach((file) => {
        data.append("images", file);
      });
      videoFileList.forEach((file) => {
        data.append("video", file);
      });
      console.log(data);

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}home/`, data)
        .then((res) => {
          toast.success("Product Added Successfully");
          navigate("/homepage");
        })
        .catch((err) => {
          toast.error(err.response.data.msg || "Something went wrong");
          setSubmitting(false);
        });
    },

    validationSchema: Yup.object({
      name: Yup.string().required("name is Required"),
      description: Yup.string().required("description is Required"),
      shortDescription: Yup.string().required("shortDescription is Required"),
      // add yup validator for a url making sure it is a url
      
    }),
  });

  const apiUrl = `${import.meta.env.VITE_BACKEND_URL}products`;

  // Scroll to top on component mount
  const fetchData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      axios.defaults.withCredentials = true;
      const res = await axios.get(apiUrl);
      setProducts(res.data.products);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      // navigate("/", { replace: true });
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.05)",
      },
      backgroundColor: state.isSelected ? "#000" : "#fff",
      padding: "10px 12px",
    }),

    control: (defaultStyles, state) => ({
      ...defaultStyles,
      borderWidth: "2px",
      borderRadius: "0px",
      maxHeight: "60px",
      overflow: "auto",
      backgroundColor: "transparent",
      outline: "none",
      ring: "0px none transparent",
      borderColor: state.isFocused ? "rgb(11 11 11)" : "rgb(11 11 11 / 0.3)",
      padding: "8px 12px",
      boxShadow: "none",

      "&:hover": {
        // borderColor: state.isFocused ? "transparent" : "#000",
      },
      // border: "none",
      // boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#000" }),
  };

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
          <label className="basis-[20%] capitalize" htmlFor="shortDescription">
            short Description
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              {...formik.getFieldProps("shortDescription")}
              className=" w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-2/5"
            />
            <div className="h-2">
              {formik.touched.shortDescription &&
              formik.errors.shortDescription ? (
                <p className="text-xs capitalize text-red-500">
                  {formik.errors.shortDescription}
                </p>
              ) : null}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row">
          <label className="basis-[20%] capitalize" htmlFor="description">
            Full Description
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <textarea
              type="text"
              id="description"
              name="description"
              {...formik.getFieldProps("description")}
              className="min-h-[12rem] w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-3/4"
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
          <label className="basis-[20%] capitalize" htmlFor="display">
            Display This Product
          </label>
          <div className="flex w-full flex-col text-asisDark ">
            <input
              type="checkbox"
              id="display"
              name="display"
              checked={display}
              onChange={() => setDisplay(!display)}
              className=" w-full cursor-pointer border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-2/5"
            />
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="shortDescription">
            Products
          </label>
          <div className=" w-full flex-wrap gap-4 text-asisDark ">
            <Select
              styles={customStyles}
              onChange={(selectedOption) => {
                setSelectedProduct(selectedOption.value);
              }}
              options={products.map((product) => {
                return { value: product._id, label: product.name };
              })}
            />
          </div>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="shortDescription">
            Image Upload & Preview
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <AddImages fileList={fileList} setFileLIst={setFileLIst} />
          </section>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="shortDescription">
            Video Upload & Preview
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <AddVideos
              fileList={videoFileList}
              setFileLIst={setVideoFileList}
            />
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
//   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   category: 'Shirts',
//   measurements: [
//     [Object: null prototype] { name: 'xl', unit: '5' },
//     [Object: null prototype] { name: 'lg', unit: '5' },
//     [Object: null prototype] { name: 'md', unit: '5' },
//     [Object: null prototype] { name: 'sm', unit: '5' }
//   ],
