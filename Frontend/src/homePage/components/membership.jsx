import React from "react";
import logo_white from "../../assets/icons/logo_white.svg";
const Membership = () => {
  return (
    <section className=" mt-[100px] flex justify-between border-t-[1.5px] border-asisDark pt-14 max-md:block">
      <div className="w-[264px] text-[40px]/[40px] font-medium uppercase">
        <p>
          <span className="font-[400]">/</span>asis m
          <em className="font-[400]">e</em>mb<em className="font-[400]">e</em>
          rship
        </p>
      </div>
      <article className="relative flex h-[296px] basis-[75%] items-start justify-start bg-[#A67700] p-5">
        <article className="basis-[50%]">
          <div className="w-[221px] text-[40px]/[40px] font-[600] uppercase text-[#FFFEF5]">
            <p>
              Bec<em className="font-[400]">o</em>me a m
              <em className="font-[400]">e</em>mb
              <em className="font-[400]">e</em>r
            </p>
          </div>
          <div
            className="absolute bottom-10
flex gap-5 text-[16px]/[24px] font-medium uppercase text-asisDark"
          >
            <p className="flex h-[48px] w-[190px] cursor-pointer items-center justify-center bg-[#FFFEF5] max-md:h-full max-md:w-full">
              Join us
            </p>
            <p className="flex h-[48px] w-[190px] cursor-pointer items-center justify-center bg-[#FFFEF5]  max-md:h-full max-md:w-full">
              sign in
            </p>
          </div>
        </article>
        <div className="basis-[50%]">
          <img src={logo_white} alt="logo_white" />
        </div>
      </article>
    </section>
  );
};

export default Membership;
