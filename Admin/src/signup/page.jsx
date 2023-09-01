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
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const { name, phone, email, password } = values;
      const userInfo = { name, phone, email, password };
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}auth/admin/signup`, userInfo)
        .then((res) => {
          toast.success("Account Created Successfully");
          navigate("/login");
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
      name: Yup.string().required("Full Name is Required"),
      phone: Yup.string().required("Phone Number is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("email is Required"),
      password: Yup.string()
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1}).*$/,
          "use 8+ chars, mix of letters, numbers & symbols",
        )
        .required("password is Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("confirm password is Required"),
    }),
  });
  return (
    <main className="flex h-full flex-col gap-8 pb-8 md:gap-20">
      <div className="flex w-full justify-center border-b border-b-asisDark/20 py-4">
        <img src={Logo} alt="Logo" className="h-8 md:h-20" />
      </div>

      <form
        className="flex flex-col items-center gap-8"
        onSubmit={formik.handleSubmit}
      >
        <header className="flex w-full justify-center">
          <h1 className="text-lg font-normal">Create Account</h1>
        </header>
        <section className="grid w-full max-w-2xl gap-x-5 gap-y-4 px-4 md:grid-cols-2">
          <Input
            touched={formik.touched.name}
            errors={formik.errors.name}
            fieldProps={formik.getFieldProps("name")}
            name="name"
            placeholder="Full Name"
          />
          <Input
            touched={formik.touched.phone}
            errors={formik.errors.phone}
            fieldProps={formik.getFieldProps("phone")}
            name="phone"
            placeholder="Phone Number"
          />
          <Input
            touched={formik.touched.email}
            errors={formik.errors.email}
            fieldProps={formik.getFieldProps("email")}
            name="email"
            placeholder="email Address"
          />
          <Input
            touched={formik.touched.password}
            errors={formik.errors.password}
            fieldProps={formik.getFieldProps("password")}
            name="password"
            placeholder="password"
          />
          <Input
            touched={formik.touched.confirmPassword}
            errors={formik.errors.confirmPassword}
            fieldProps={formik.getFieldProps("confirmPassword")}
            name="confirmPassword"
            placeholder="Confirm Password"
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
              <span>Create Account</span>
            )}
          </button>
          <Link to="/login" className="text-sm text-asisDark underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Page;
