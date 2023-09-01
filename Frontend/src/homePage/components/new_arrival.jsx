import React from "react";
import left_button from "../../assets/icons/left_button.svg";
import right_button from "../../assets/icons/right_button.svg";
import new1 from "../../assets/images/new1.png";
import new2 from "../../assets/images/new2.png";
import new3 from "../../assets/images/new3.png";
import up_arrow from "../../assets/icons/up_arrow.svg";

const New_Arrival = () => {
  return (
    <section className="relative mt-7 flex items-start justify-between border-t-[1.5px] border-black pt-16 max-md:block">
      <article className=" h-[100%]">
        <div className="w-[194px] uppercase ">
          <p className="text-right text-[40px]/[40px] font-medium">
            n<em className="font-[400]">e</em>w{" "}
          </p>
          <p className="text-right text-[40px]/[40px]  font-medium">
            arriv<em className="font-[400]">a</em>l
          </p>
        </div>
        <div className="mt-[20px] w-[194px] ">
          <div className="ml-[auto] flex w-[96px] items-center justify-between">
            <img
              src={left_button}
              alt="left_button"
              className="cursor-pointer"
            />
            <img
              src={right_button}
              alt="right_button"
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-[80px] flex h-[32px] w-[104px] items-center justify-center gap-2 border-[1.5px] border-black uppercase">
          <p className="text-[12px]/[16px] font-medium">view all</p>
          <img src={up_arrow} alt="up_arrow" />
        </div>
      </article>
      <article className="ml-[auto] flex gap-4 border-b-[1px] border-[#B0B0B0] pb-5 max-md:block">
        <div className="h-[541px] w-[336px] uppercase">
          <img src={new1} alt="new1" />
          <div className="mt-2">
            <p className="text-[16px]/[20px] font-[600] text-asisDark">
              mvif denim jean
            </p>
            <p className="text-[12px]/[16px] font-[600] text-[#17A500]">
              asis X CARHARRT
            </p>
            <p className="text-[12px]/16px] font-[600] text-asisDark">
              172,000 NGN
            </p>
          </div>
        </div>
        <div className="h-[541px] w-[336px] uppercase">
          <img src={new2} alt="new2" />
          <div className="mt-2">
            <p className="text-[16px]/[20px] font-[600] text-asisDark">
              mvif denim jean
            </p>
            <p className="text-[12px]/[16px] font-[600] text-[#17A500]">
              asis X CARHARRT
            </p>
            <p className="text-[12px]/16px] font-[600] text-asisDark">
              172,000 NGN
            </p>
          </div>
        </div>
        <div className="h-[541px] w-[336px] uppercase">
          <img src={new3} alt="new3" />
          <div className="mt-2">
            <p className="text-[16px]/[20px] font-[600] text-asisDark">
              mvif denim jean
            </p>
            <p className="text-[12px]/[16px] font-[600] text-[#17A500]">
              asis X CARHARRT
            </p>
            <p className="text-[12px]/16px] font-[600] text-asisDark">
              172,000 NGN
            </p>
          </div>
        </div>
      </article>

      <div className=""></div>
    </section>
  );
};

export default New_Arrival;
