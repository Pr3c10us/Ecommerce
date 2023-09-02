import React, { useEffect, useState } from "react";
import Loading from "../loading";
import axios from "axios";
import Order from "./components/order";

const OrdersFashion = () => {
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleEffect = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}orders/admin?orderId=${orderId}`,
      );
      setOrders(data.orders);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleSearch = async () => {
    setSearching(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}orders/admin?orderId=${orderId}`,
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
  }, [orderId]);

  if (loading) return <Loading />;

  return (
    <main className="flex flex-col gap-8 py-12">
      <h1 className="w-full border-b-2 border-b-asisDark/20 text-lg font-semibold">
        All Orders
      </h1>

      <section className="grid w-full place-items-center gap-4 ">
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

          {searching && (
            <div className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-asisDark"></div>
            </div>
          )}
        </div>
      </section>

      {searching ? <br /> : <Order orders={orders} />}
    </main>
  );
};

export default OrdersFashion;
