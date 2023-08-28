import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LayoutFashion from "./layoutFashion/page.jsx";
import LayoutRetail from "./layoutRetail/page.jsx";
import store from "../redux/store";
import { Provider } from "react-redux";
import ProductsFashion from "./productsFashion/page.jsx";
import ThankYouFashion from "./thankYouFashion/page.jsx";
import OrdersFashion from "./ordersFashion/page.jsx";
import ProductsRetail from "./productsRetail/page.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root/page.jsx";
import AddProduct from "./addProductFashion/page";
import ProductsDisplay from "./productsFashion/components/productsDisplay";
import EditProduct from "./editProductFashion/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/fashion",
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
            path: "orders",
            element: <OrdersFashion />,
          },
          {
            path: "ThankYou",
            element: <ThankYouFashion />,
          },
          // {
          //   path: "addProduct",
          //   element: <AddProduct />,
          // },
        ],
      },
      {
        path: "/retail",
        element: <LayoutRetail />,
        children: [
          {
            path: "",
            element: <ProductsRetail />,
          },
        ],
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
