import React, { useEffect, useState } from "react";
import Loading from "../loading";
import axios from "axios";
import Order from "./components/order";
import Select from "react-select";

const OrdersFashion = () => {
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleEffect = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}orders/admin?orderId=${orderId}`,
      );
      setOrders(data.orders);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };
  const handleSearch = async () => {
    setSearching(true);
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }orders/admin?orderId=${orderId}&status=${status}&paymentStatus=${paymentStatus}`,
      );
      setOrders(data.orders);
      setSearching(false);
    } catch (error) {
      console.log(error);
      setSearching(false);
    }
  };

  useEffect(() => {
    handleEffect();
  }, []);
  useEffect(() => {
    handleSearch();
  }, [orderId, status, paymentStatus]);

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "pending", label: "Pending" },
  ];
  const paymentStatusOptions = [
    { value: "", label: "All Payments Status" },
    { value: "processing", label: "Processing" },
    { value: "canceled", label: "Canceled" },
    { value: "failed", label: "Failed" },
    { value: "successful", label: "Successful" },
  ];
  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      "&:hover": {
        backgroundColor: state.isSelected ? "#000" : "rgba(0,0,0,0.05)",
      },
      // color: state.isSelected ? "#191970" : "#000",
      backgroundColor: state.isSelected ? "#000" : "#fff",
      // borderWidth: "3px",
      // backgroundColor: "#000",
      padding: "10px 12px",
    }),

    control: (defaultStyles, state) => ({
      ...defaultStyles,
      borderWidth: "1px",
      // borderRadius: "8px",
      maxHeight: "60px",
      width: "250px",
      overflow: "auto",
      backgroundColor: "transparent",
      outline: "none",
      ring: "0px none transparent",
      borderColor: "rgb(0 0 0 )",
      padding: "2px 4px",
      boxShadow: "none",

      "&:hover": {
        // borderColor: state.isFocused ? "transparent" : "#000",
      },
      // border: "none",
      // boxShadow: "none",
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#000" }),
  };

  if (loading) return <Loading />;

  return (
    <main className="flex flex-col gap-8 py-12">
      <section className="flex w-full flex-wrap place-items-center justify-end gap-4 ">
        <h1 className="w-full text-lg font-semibold">Sort and search</h1>
        <div className="relative w-full max-w-md">
          <label htmlFor="Search" className="sr-only">
            {" "}
            Search{" "}
          </label>

          <input
            type="text"
            id="Search"
            placeholder="Search for order with id..."
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full rounded-md border border-asisDark/50 bg-transparent px-2.5 py-3 pe-10 shadow-sm outline-none ring-0 sm:text-sm"
          />

          {searching ? (
            <div className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-asisDark"></div>
            </div>
          ) : (
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="cursor-default text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          )}
        </div>
        <Select
          options={statusOptions}
          styles={customStyles}
          classNamePrefix="status"
          closeMenuOnSelect={false}
          isLoading={searching}
          isClearable={true}
          // value={{}}
          defaultValue={statusOptions[0]}
          isSearchable={true}
          name="status"
          onChange={(selectedOption) => {
            setStatus(selectedOption.value);
          }}
        />
        <Select
          options={paymentStatusOptions}
          styles={customStyles}
          classNamePrefix="payment status"
          closeMenuOnSelect={false}
          isLoading={searching}
          isClearable={true}
          // value={{}}
          defaultValue={paymentStatusOptions[0]}
          isSearchable={true}
          name="payment option"
          onChange={(selectedOption) => {
            setPaymentStatus(selectedOption.value);
          }}
        />
      </section>

      <h1 className="w-full border-b-2 border-b-asisDark/20 text-lg font-semibold">
        Orders
      </h1>
      {searching ? <br /> : <Order orders={orders} />}
    </main>
  );
};

export default OrdersFashion;
