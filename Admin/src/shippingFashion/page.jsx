import React from "react";
import Logo from "../assets/homeLogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../loading";
import { FaPlus, FaTimes, FaTrash } from "react-icons/fa";

const ShippingFashion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = React.useState(false);
  const [shippings, setShippings] = React.useState([]);

  React.useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}shippings`,
      );
      setShippings(res.data.shipping);
      setLoading(false);
      console.log(res.data);
    };
    getProductDetails();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      fee: 0,
      description: "",
      durationInDays: "",
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);

      const data = {
        name: values.name,
        fee: values.fee,
        description: values.description,
        durationInDays: values.durationInDays,
      };

      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}shippings`, data)
        .then((res) => {
          toast.success("Edit Complete");
          // navigate("/fashion/products");
          console.log(res.data);
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}shippings`)
            .then((res) => {
              setShippings(res.data.shipping);
            })
            .catch((err) => {
              toast.error(err.response.data.msg || "Something went wrong");
              setSubmitting(false);
            });

          // setShippings((prev) => ({ ...prev, ...res.data.shipping }));
          setSubmitting(false);
        })
        .catch((err) => {
          toast.error(err.response.data.msg || "Something went wrong");
          setSubmitting(false);
        });
    },

    validationSchema: Yup.object({
      name: Yup.string().required("name is Required"),
      fee: Yup.number().min(1).positive().required("fee is Required"),
      description: Yup.string().required("durationInDays is Required"),
      durationInDays: Yup.string().required("category is Required"),
    }),
  });

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}shippings/${id}`);
      toast.success("Deleted Shipping");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}shippings`,
      );
      setShippings(res.data.shipping);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="py-12 font-medium">
      <form className="flex flex-col gap-y-12" onSubmit={formik.handleSubmit}>
        <section className="flex w-full flex-col gap-y-4">
          <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row ">
            <label className="basis-[20%] capitalize" htmlFor="name">
              shipping Name
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
            <label className="basis-[20%] capitalize" htmlFor="durationInDays">
              shipping duration
            </label>
            <div className="flex w-full flex-col text-asisDark ">
              <input
                type="text"
                id="durationInDays"
                name="durationInDays"
                {...formik.getFieldProps("durationInDays")}
                className=" w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-2/5"
              />
              <div className="h-2">
                {formik.touched.durationInDays &&
                formik.errors.durationInDays ? (
                  <p className="text-xs capitalize text-red-500">
                    {formik.errors.durationInDays}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-x-12 gap-y-2 md:flex-row">
            <label className="basis-[20%] capitalize" htmlFor="description">
              shipping details
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
            <label className="basis-[20%] capitalize" htmlFor="durationInDays">
              shipping fee
            </label>
            <div className="flex w-full flex-col text-asisDark ">
              <input
                type="number"
                id="fee"
                name="fee"
                min={0}
                {...formik.getFieldProps("fee")}
                className=" w-full border-2 border-asisDark/30 bg-transparent px-3 py-3 text-sm text-asisDark md:w-2/3 lg:w-2/5"
              />
              <div className="h-2">
                {formik.touched.fee && formik.errors.fee ? (
                  <p className="text-xs capitalize text-red-500">
                    {formik.errors.fee}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          <section className="flex w-full items-end justify-end gap-4">
            <button
              disabled={formik.isSubmitting}
              type="submit"
              className={`rounded bg-green-500 px-8 py-1.5 text-white ${
                formik.isSubmitting && "cursor-not-allowed opacity-50"
              }`}
            >
              Add a shipping method
            </button>
          </section>
        </section>{" "}
        <section className="flex w-full flex-col gap-y-4 text-left text-asisDark ">
          <h1 className="text-lg font-bold">Shipping Details</h1>
          <div className="flex flex-col gap-8">
            {shippings.map((shipping) => (
              <div
                className="flex  grid-cols-6 flex-col gap-y-2 rounded-lg border border-asisDark py-4 text-sm capitalize shadow-lg md:grid md:flex-row md:items-center"
                key={shipping?._id}
              >
                <div className="flex w-full justify-end px-6 md:hidden md:py-3">
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleDeleteProduct(shipping?._id)}
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
                <div className="px-6 md:py-3">
                  <span className="text-base font-medium capitalize">
                    Name:
                  </span>{" "}
                  {shipping.name}
                </div>
                <div className="px-6 md:py-3">
                  <span className="text-base font-medium capitalize">Fee:</span>{" "}
                  {shipping.fee} usd
                </div>
                <div className="px-6 md:col-span-2 md:py-3">
                  <span className="text-base font-medium capitalize">
                    Description:
                  </span>{" "}
                  {shipping.description}
                </div>
                <div className="px-6 py-3">
                  <span className="text-base font-medium capitalize">
                    duration:
                  </span>{" "}
                  {shipping.durationInDays} days
                </div>
                <div className="md:flex w-full justify-end px-6 hidden md:py-3">
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleDeleteProduct(shipping?._id)}
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </form>
    </main>
  );
};

export default ShippingFashion;
