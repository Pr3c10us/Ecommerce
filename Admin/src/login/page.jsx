import React from "react";
import Logo from "../assets/homeLogo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "./components/inputs";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Page = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const { name, phone, email, password } = values;
      const userInfo = { name, phone, email, password };
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}auth/admin/login`, userInfo)
        .then((res) => {
          toast.success("Signed in successfully");
          navigate("/fashion/products");
        })
        .catch((error) => {
          if (error.response) {
            const errorMsg = error.response.data.msg;
            toast.error(errorMsg);
          }
          setSubmitting(false);
        });

      // setSubmitting(false);
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("email is Required"),
      password: Yup.string().required("password is Required"),
    }),
  });
  return (
    <main className="flex h-full flex-col gap-20 pb-8">
      <div className="flex w-full justify-center border-b border-b-asisDark/20 py-4">
        <img src={Logo} alt="Logo" className="h-8 md:h-20" />
      </div>

      <form
        className="flex flex-col items-center gap-8"
        onSubmit={formik.handleSubmit}
      >
        <header className="flex w-full justify-center">
          <h1 className="text-lg font-normal capitalize">Sign in</h1>
        </header>
        <section className="grid w-full max-w-lg gap-x-5 gap-y-4 px-4">
          <Input
            touched={formik.touched.email}
            errors={formik.errors.email}
            fieldProps={formik.getFieldProps("email")}
            name="email"
            placeholder="email"
          />
          <Input
            touched={formik.touched.password}
            errors={formik.errors.password}
            fieldProps={formik.getFieldProps("password")}
            name="password"
            placeholder="password"
          />
        </section>
        <div className="flex flex-col gap-y-2 text-center">
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="flex h-10 items-center justify-center rounded bg-asisDark px-4 text-sm font-thin text-white focus:outline-none focus:ring-0"
          >
            {formik.isSubmitting ? (
              <span className="h-4 w-4 animate-spin rounded-full border-t-2 border-t-white"></span>
            ) : (
              <span>Sign in</span>
            )}
          </button>
          <Link to="/signup" className="text-sm text-asisDark underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Page;
