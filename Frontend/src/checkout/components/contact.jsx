import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { setOrder } from "../../../redux/asis";
import VowelItalicizer from "../../components/vowelItalicizer";
import ContactInput from "./contactInput";

const Contact = ({ setActiveStep }) => {
  const orderDetails = useSelector((state) => state.asis.order);
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    zip,
    country,
  } = orderDetails;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      country,
    },
    onSubmit: (values) => {
      dispatch(setOrder(values));
      setActiveStep(2);
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-8 py-8">
      <h2 className="text-lg font-semibold uppercase md:text-2xl">
        Contact Information
      </h2>
      <section className="grid gap-x-4 gap-y-4 md:grid-cols-2">
        <ContactInput
          touched={formik.touched.firstName}
          errors={formik.errors.firstName}
          fieldProps={formik.getFieldProps("firstName")}
          name="firstName"
          placeholder="FIRST NAME *"
        />
        <ContactInput
          touched={formik.touched.lastName}
          errors={formik.errors.lastName}
          fieldProps={formik.getFieldProps("lastName")}
          name="lastName"
          placeholder="LAST NAME *"
        />
        <ContactInput
          touched={formik.touched.email}
          errors={formik.errors.email}
          fieldProps={formik.getFieldProps("email")}
          name="email"
          placeholder="EMAIL *"
        />
        <ContactInput
          touched={formik.touched.phone}
          errors={formik.errors.phone}
          fieldProps={formik.getFieldProps("phone")}
          name="phone"
          placeholder="PHONE NUMBER *"
        />
      </section>
      <h2 className="text-lg font-semibold uppercase md:text-2xl">
        Shipping Address
      </h2>
      <section className="grid gap-x-4 gap-y-4 md:grid-cols-2">
        <ContactInput
          touched={formik.touched.address}
          errors={formik.errors.address}
          fieldProps={formik.getFieldProps("address")}
          name="address"
          placeholder="STREET *"
        />
        <ContactInput
          touched={formik.touched.city}
          errors={formik.errors.city}
          fieldProps={formik.getFieldProps("city")}
          name="city"
          placeholder="CITY *"
        />
        <ContactInput
          touched={formik.touched.state}
          errors={formik.errors.state}
          fieldProps={formik.getFieldProps("state")}
          name="state"
          placeholder="STATE *"
        />
        <ContactInput
          touched={formik.touched.country}
          errors={formik.errors.country}
          fieldProps={formik.getFieldProps("country")}
          name="country"
          placeholder="COUNTRY *"
        />
        <ContactInput
          touched={formik.touched.zip}
          errors={formik.errors.zip}
          fieldProps={formik.getFieldProps("zip")}
          name="zip"
          placeholder="ZIP CODE *"
        />
      </section>
      <section className="flex justify-end gap-4 md:pl-4">
        {/* <button
          onClick={setActiveStep(1)}
          className="border-b-2 border-asisDark px-2 py-1 text-sm font-bold"
        >
          Go back
        </button> */}
        <button
          type="submit"
          onClick={() => setActiveStep(1)}
          className=" w-full rounded md:w-1/2 bg-asisDark py-3  font-bold text-white"
        >
          Go to Shipping
        </button>
      </section>
    </form>
  );
};

export default Contact;
