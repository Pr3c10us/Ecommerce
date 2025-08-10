import React from "react";
import Logo from "../assets/vite.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AddImages from "./components/addImages";
import Loading from "../loading";
import { FaTrash } from "react-icons/fa";
import Select from "react-select";

const EditProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [imageDelete, setImageDelete] = React.useState("");
  const [productDetails, setProductDetails] = React.useState({});
  const [display, setDisplay] = React.useState(
    productDetails?.display || false,
  );
  const [products, setProducts] = React.useState([]);

  const [fileList, setFileLIst] = React.useState([]);
  const [images, setImages] = React.useState(productDetails.images || []);
  const lorem =
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tempus libero. Morbi a bibendum lacus. Mauris blandit, ipsum id elementum pellentesque, augue augue aliquam risus, non egestas quam dui vitae ipsum. Ut sodales tempus tortor, eget sagittis mauris molestie et. Aliquam placerat augue at ipsum ornare, id egestas elit pulvinar. Morbi a massa aliquet, pellentesque dolor vitae, dignissim felis.";

  const [selectedProduct, setSelectedProduct] = React.useState(
    productDetails?.product,
  );
  React.useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}home/${
          location.pathname.split("/")[2]
        }`,
      );
      setProductDetails((prev) => ({ ...prev, ...res.data.product }));
      setImages(res.data.product.images);
      setSelectedProduct(res.data.product.product);
      setDisplay(res.data.product.display);
      formik.setFieldValue("name", res.data.product.name);
      formik.setFieldValue("description", res.data.product.description);
      formik.setFieldValue(
        "shortDescription",
        res.data.product.shortDescription,
      );
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}products`;
      const response = await axios.get(apiUrl);
      setProducts(response.data.products);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    getProductDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: productDetails.name,
      price: productDetails.price,
      description: productDetails.description,
      shortDescription: productDetails.shortDescription,
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const data = {
        name: values.name,
        description: values.description,
        shortDescription: values.shortDescription,
        display: display,
        product: selectedProduct,
      };

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}home/${
            location.pathname.split("/")[2]
          }`,
          data,
        )
        .then((res) => {
          toast.success("Edit Complete");
          // navigate("/products");
          console.log(res.data);
          setProductDetails((prev) => ({ ...prev, ...res.data.product }));
          setImages(res.data.product.images);
          formik.setFieldValue("name", res.data.product.name);
          formik.setFieldValue("description", res.data.product.description);
          formik.setFieldValue(
            "shortDescription",
            res.data.product.shortDescription,
          );

          setSubmitting(false);
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
    }),
  });

  const handleDeleteImage = async (imageName) => {
    setImageDelete(imageName);
    try {
      const imageNames = [imageName];
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}home/${
          location.pathname.split("/")[2]
        }/image`,
        {
          data: { imageNames },
        },
      );
      setImages((prev) => prev.filter((item) => item !== imageName));
      toast.success("Image Deleted Successfully");
      setImageDelete("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something went wrong");
    }
  };

  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}home/${
          location.pathname.split("/")[2]
        }`,
      );
      toast.success("Product Deleted Successfully");
      navigate("/products");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something went wrong");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
            Short Description
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
            Description
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
          <label className="basis-[20%] capitalize" htmlFor="shortDescription">
            Display Product
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
          <label className="basis-[20%] capitalize" htmlFor="product">
            Products
          </label>
          <div className=" w-full flex-wrap gap-4 text-asisDark ">
            <Select
              styles={customStyles}
              onChange={(selectedOption) => {
                setSelectedProduct(selectedOption.value);
              }}
              value={{
                value: selectedProduct,
                label: products?.find(
                  (product) => product._id === selectedProduct,
                )?.name,
              }}
              options={products?.map((product) => {
                return { value: product._id, label: product.name };
              })}
            />
          </div>
        </section>

        <section className="flex w-full items-end justify-end gap-4">
          <button
            type="button"
            disabled={formik.isSubmitting}
            onClick={handleDeleteProduct}
            className={`rounded bg-red-500 px-8 py-1.5 text-white ${
              formik.isSubmitting && "cursor-not-allowed opacity-50"
            }`}
          >
            Delete
          </button>
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className={`rounded bg-green-500 px-8 py-1.5 text-white ${
              formik.isSubmitting && "cursor-not-allowed opacity-50"
            }`}
          >
            Edit Details
          </button>
        </section>

        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="shortDescription">
            Add more Images
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <AddImages
              fileList={fileList}
              setImages={setImages}
              images={images}
              id={location.pathname.split("/")[2]}
            />
          </section>
        </section>
        <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
          <label className="basis-[20%] capitalize" htmlFor="shortDescription">
            Delete Product Images
          </label>
          <section className="flex w-full flex-col gap-y-4 text-asisDark">
            <div className="flex flex-wrap items-center gap-4">
              {images?.map((file, index) => {
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center gap-2 `}
                  >
                    {imageDelete === file ? (
                      <div className="flex h-32 w-32 items-center justify-center border border-asisDark/20 bg-asisDark/20 object-cover">
                        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-t-asisDark"></div>
                      </div>
                    ) : (
                      <img
                        src={`${import.meta.env.VITE_BLOB_URL}${file}`}
                        alt="product"
                        className="h-32 w-32 object-cover"
                      />
                    )}

                    <button
                      disabled={imageDelete == file}
                      type="button"
                      onClick={() => {
                        handleDeleteImage(file);
                      }}
                      className={`flex w-full items-center justify-center gap-1 rounded border border-asisDark/50 py-1 text-sm  ${
                        imageDelete == file && "cursor-not-allowed opacity-50"
                      }`}
                    >
                      <FaTrash className="text-red-500" /> Delete
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </section>

        
      </form>
    </main>
  );
};

export default EditProduct;
// name: 'Genevive Sweater Swagger lee',
//   price: '300',
//   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet tempus libero. Morbi a bibendum lacus. Mauris blandit, ipsum id elementum pellentesque, augue augue aliquam risus, non egestas quam dui vitae ipsum. Ut sodales tempus tortor, eget sagittis mauris molestie et. Aliquam placerat augue at ipsum ornare, id egestas elit pulvinar. Morbi a massa aliquet, pellentesque dolor vitae, dignissim felis.',
//   shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   category: 'Shirts',
//   measurements: [
//     [Object: null prototype] { size: 'xl', quantity: '5' },
//     [Object: null prototype] { size: 'lg', quantity: '5' },
//     [Object: null prototype] { size: 'md', quantity: '5' },
//     [Object: null prototype] { size: 'sm', quantity: '5' }
//   ],
