import React, { useState } from "react";
import { LiaOpencart } from "react-icons/lia";
import Select from "react-select";
import axios from "axios";
import toast from "react-hot-toast";

const Order = ({ orders }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const options = [
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "pending", label: "Pending" },
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
      overflow: "auto",
      backgroundColor: "transparent",
      outline: "none",
      width: "250px",
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

  const updateOrderStatus = async (orderId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}orders/${orderId}`,
        { status },
      );
      console.log(data);
      toast.success("Order Status Updated");

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || "Order Status Update Failed");
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  return (
    <section className="flex flex-col gap-8 font-medium">
      {orders.map((order) => (
        <section className="rounded-d hadow-xl flex flex-col gap-6 border-b-2 border-asisDark/50 py-8 md:px-8 ">
          <div className="grid flex-col gap-2 lg:md:grid-cols-2">
            <h2 className="text-lg font-semibold uppercase underline lg:col-span-2">
              Products Bought
            </h2>
            {order?.products.map((item, index) => (
              <div
                className="grid grid-cols-2 gap-4 sm:flex"
                key={item?._id || index}
              >
                {item.product?.images[0] ? (
                  <img
                    src={`${import.meta.env.VITE_BLOB_URL}${
                      item.product?.images[0]
                    }`}
                    alt={item.name}
                    className="w-full sm:w-24"
                  />
                ) : (
                  <div className="flex h-32 w-24 items-center justify-center border border-asisDark/20">
                    <LiaOpencart className="h-12 w-12 text-asisDark/50" />
                  </div>
                )}

                <div className="grid gap-4 text-sm md:grid-cols-3 md:text-base">
                  <p className="md:col-span-3">Product Name: {item.name}</p>
                  <p>Size: {item.size}</p>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold uppercase underline">
              Customer Contact INFO
            </h2>
            <div className="grid gap-2 md:grid-cols-2">
              <p className="">
                Name: {order?.firstName} {order?.lastName}
              </p>
              <p className="">Email: {order?.email}</p>
              <p className="">Phone: {order?.phone}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold uppercase underline">
              SHIPPING ADDRESS
            </h2>
            <div className="grid gap-2 md:grid-cols-2">
              <p className="">Street: {order?.address}</p>
              <p className="">City: {order?.city}</p>
              <p className="">State: {order?.state}</p>
              <p className="">Country: {order?.country}</p>
              <p className="">ZipCode: {order?.zip}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold uppercase underline">
              SHIPPING Method
            </h2>
            {order?.shipping.map((item, index) => {
              return (
                <div className="grid gap-2 md:grid-cols-2" key={index}>
                  <p className="">Shipping Method: {item.name}</p>
                  <p className="">Price [₦]: {item.fee}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold uppercase underline">
              Payment
            </h2>

            <div className="grid gap-2 md:grid-cols-2">
              <p className="">
                Payment Status:{" "}
                <span
                  className={`text-lg font-bold uppercase ${
                    order.paymentStatus == "successful" && "text-green-500"
                  } 
                   ${order.paymentStatus == "processing" && "text-orange-500"}
                  ${
                    (order.paymentStatus == "failed" ||
                      order.paymentStatus == "canceled") &&
                    "text-red-500"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold uppercase underline">
              Order Status
            </h2>

            <div className="flex flex-wrap gap-4 sm:flex-row">
              <Select
                options={options}
                defaultValue={options.find(
                  (option) => option.value === order.status,
                )}
                styles={customStyles}
                classNamePrefix="change status"
                closeMenuOnSelect={false}
                isLoading={isLoading}
                isClearable={true}
                // value={{}}
                isSearchable={true}
                name="Select Token"
                onChange={(selectedOption) => {
                  setStatus(selectedOption.value);
                }}
              />
              <button
                onClick={() => {
                  updateOrderStatus(order._id);
                }}
                className="rounded-md bg-asisDark px-4 py-2 text-white"
              >
                update
              </button>
            </div>
          </div>
        </section>
      ))}
      <section></section>
    </section>
  );
};

export default Order;
// ["processing", "canceled", "failed", "successful"]
