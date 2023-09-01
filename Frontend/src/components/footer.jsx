import React from "react";
import footer_logo from "../assets/icons/footer_logo.svg";
import footer_img from "../assets/images/footer_img.png";
import footer_icon from "../assets/icons/footer_icon.svg";
import facebook from "../assets/icons/facebook.svg";
import Instagram from "../assets/icons/Instagram.svg";
import Reddit from "../assets/icons/Reddit.svg";
import Twitter from "../assets/icons/Twitter.svg";

const Footer = () => {
  return (
    <div className="mt-20 grid w-full grid-cols-4 border-t  border-asisDark max-lg:grid-cols-2">
      <div className="border-b border-asisDark uppercase">
        <p className="ml-3 mt-2 w-[512px] text-[20px]/[32px] font-semibold max-md:w-full  ">
          /subsricb<em className="font-normal">e</em> to our n
          <em className="font-normal">e</em>wslett
          <em className="font-normal">e</em>r & be th
          <em className="font-normal">e</em> first to he
          <em className="font-normal">a</em>r ab
          <em className="font-normal">o</em>ut new pr
          <em className="font-normal">o</em>ducts &{" "}
          <em className="font-normal">e</em>vents
        </p>
      </div>
      <div className="border-b border-asisDark"></div>

      <div className="relative border-b border-l border-asisDark max-lg:border-l-0">
        <input
          type="email"
          placeholder="ENTER YOUR EMAIL ADDRESS"
          className="absolute bottom-3 w-full bg-[transparent] px-5 text-[12px]/[16px] font-semibold text-[#3C3C3C] outline-0"
        />
      </div>
      <div className="relative h-[96px] border-b border-l border-asisDark pl-5 uppercase">
        <div className="absolute bottom-[5px] flex cursor-pointer items-center gap-2">
          <p className="text-[12px]/[16px] font-semibold text-asisDark ">
            agree & subscribe
          </p>
          <img src={footer_icon} alt="footer_icon" />
        </div>
      </div>
      {/* down footer seciton */}
      <div className="h-[392px] border-b  border-r border-asisDark pl-3 pr-4 pt-7 ">
        <div className="h-[348px] w-[305px] max-lg:h-[97%] max-lg:w-[100%] ">
          <img
            src={footer_img}
            alt="footer_img"
            className="h-[100%] w-[100%]  object-cover object-top  "
          />
        </div>
      </div>
      <div className="relative border-b border-asisDark">
        <img
          src={footer_logo}
          alt="footer_logo"
          className="absolute top-8 ml-5 cursor-pointer"
        />
        <p className="absolute top-[30%] ml-5 w-[90%] text-sm font-medium uppercase text-asisDark max-lg:w-[100%]">
          asis offers a carefully curated collection of stylish and versatile
          clothing pieces that are designed to elevate everyday looks. From
          comfortable essentials to trendy statement pieces, asis aims to
          empower individuals to express their unique sense of style with
          confidence.
        </p>
        <div className="absolute bottom-4 ml-5 flex items-center gap-5">
          <img src={facebook} alt="facebook" className="cursor-pointer" />
          <img src={Instagram} alt="Instagram" className="cursor-pointer" />
          <img src={Reddit} alt="Reddit" className="cursor-pointer" />
          <img src={Twitter} alt="Twitter" className="cursor-pointer" />
        </div>
      </div>

      <div className="relative h-[392px] border-b border-l border-asisDark uppercase max-lg:border-l-0 ">
        <p className="absolute top-[30%] ml-5 text-sm font-normal text-[#0b0b0b77]">
          <em>/ site navigation</em>
        </p>
        <ul className="absolute bottom-4 ml-5 list-none text-base font-semibold text-asisDark">
          <li className="my-2 cursor-pointer">homepage</li>
          <li className="my-2 cursor-pointer">shop</li>
          <li className="my-2 cursor-pointer">collections</li>
          <li className="cursor-pointer">contact</li>
        </ul>
      </div>
      <div className="relative border-b border-l border-asisDark  uppercase">
        <p className="absolute top-[30%] ml-5 text-sm font-normal text-asisDark">
          <em>/ customer care</em>
        </p>
        <ul className="absolute bottom-4 ml-5 list-none text-base font-semibold text-asisDark">
          <li className="my-2 cursor-pointer">shipping & payment</li>
          <li className="my-2 cursor-pointer">refund & return policy</li>
          <li className="cursor-pointer">care instructions</li>
        </ul>
      </div>
      <div className="my-8 ml-5 text-xs font-semibold uppercase text-asisDark">
        coyright 2023, asis right reserved{" "}
      </div>
      <div className="max-lg:hidden"></div>
      <div className="my-8 ml-5 text-xs font-semibold uppercase text-asisDark">
        [ terms and conditions ]
      </div>
      <div className="my-8 ml-5 text-right text-xs font-semibold uppercase text-asisDark max-md:text-left">
        [ privacy ]
      </div>
    </div>
  );
};

export default Footer;
