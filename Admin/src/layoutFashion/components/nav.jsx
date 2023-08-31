import React from "react";
import { Link, useLocation } from "react-router-dom";
import ProductsPageIcon from "../../assets/productPageIcon.svg";
import OrdersPageIcon from "../../assets/ordersPageIcon.svg";
import ThankYouPageIcon from "../../assets/thankYouPageIcon.svg";
import ProductsPageDarkIcon from "../../assets/productPageDarkIcon.svg";
import OrdersPageDarkIcon from "../../assets/ordersPageDarkIcon.svg";
import ThankYouPageDarkIcon from "../../assets/thankYouPageDarkIcon.svg";

const Nav = () => {
  const location = useLocation();
  const pages = [
    {
      name: "Products",
      href: "/fashion/products",
      icon: ProductsPageIcon,
      darkIcon: ProductsPageDarkIcon,
    },
    {
      name: "thankYou",
      href: "/fashion/ThankYou",
      icon: ThankYouPageIcon,
      darkIcon: ThankYouPageDarkIcon,
    },
    {
      name: "orders",
      href: "/fashion/orders",
      icon: OrdersPageIcon,
      darkIcon: OrdersPageDarkIcon,
    },
  ];
  return (
    <nav className="flex justify-between gap-2 sm:gap-6 sm:px-8">
      {pages.map((page) => {
        return (
          <Link
          key={page.name}
            to={page.href}
            className={`flex w-full items-center justify-center gap-2 rounded py-2 ${
              location.pathname.includes(page.href)
                ? "bg-asisDark text-white"
                : "border border-asisDark text-asisDark"
            } `}
          >
            {location.pathname.includes(page.href) ? (
              <img src={page.icon} alt={page.name} className="h-4 sm:h-auto" />
            ) : (
              <img
                src={page.darkIcon}
                alt={page.name}
                className="h-4 sm:h-auto"
              />
            )}
            <span className="text-xs sm:text-sm">{page.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
