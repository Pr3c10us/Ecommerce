import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LayoutFashion from "./layoutFashion/page.jsx";
// import LayoutHomePage from "./layoutFashion/page.jsx";
import store from "../redux/store";
import { Provider } from "react-redux";
import ProductsFashion from "./productsFashion/page.jsx";
// import HomePage from "./homepage/page.jsx";
import ThankYouFashion from "./thankYouFashion/page.jsx";
import OrdersFashion from "./ordersFashion/page.jsx";
import ShippingFashion from "./shippingFashion/page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root/page.jsx";
import AddProduct from "./addProductFashion/page";
import ProductsDisplay from "./productsFashion/components/productsDisplay";
import HomePageDisplay from "./homepage/components/productsDisplay";
import EditProduct from "./editProductFashion/page";
import AddHomePageProduct from "./addHomeProduct/page";
import EditHomePageProduct from "./editHomeProduct/page";
import Login from "./login/page";
import Signup from "./signup/page";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <LayoutFashion />,
        children: [
          {
            path: "products",
            element: <ProductsFashion />,
            children: [
              {
                path: "",
                element: <ProductsDisplay />,
              },
              {
                path: ":id",
                element: <EditProduct />,
              },
              {
                path: "addProduct",
                element: <AddProduct />,
              },
            ],
          },
          {
            path: "homepage",
            // element: <HomePage />,
            children: [
              {
                path: "",
                element: <HomePageDisplay />,
              },
              {
                path: ":id",
                element: <EditHomePageProduct />,
              },
              {
                path: "addProduct",
                element: <AddHomePageProduct />,
              },
            ],
          },
          {
            path: "orders",
            element: <OrdersFashion />,
          },
          {
            path: "ThankYou",
            element: <ThankYouFashion />,
          },
          {
            path: "shipping",
            element: <ShippingFashion />,
          },
          // {
          //   path: "addProduct",
          //   element: <AddProduct />,
          // },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
