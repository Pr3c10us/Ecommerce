import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Layout from "./layout/page.jsx";
import HomePage from "./homePage/page.jsx";
import HomePage2 from "./homePage/page2.jsx";
import BrandPage from "./brandPage/page.jsx";
import SuperSpecialCategory from "./superSpecialCategory/page.jsx";
import Shop from "./shop/page.jsx";
import Product from "./product/page.jsx";
import Checkout from "./checkout/page.jsx";
import Receipt from "./receipt/page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "../redux/store";
import { Provider } from "react-redux";
import OrderComplete from "./completed/page.jsx";
import Login from "./login/page";
import Signup from "./signup/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage2 />,
      },
      {
        path: "brandpage",
        element: <BrandPage />,
      },
      {
        path: "/superspecialcategory/:id",
        element: <SuperSpecialCategory />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/complete",
        element: <OrderComplete />,
      },
      {
        path: "/receipt/:id",
        element: <Receipt />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
