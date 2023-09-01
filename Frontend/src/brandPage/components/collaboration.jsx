import React from "react";
import nike from "../../assets/icons/nike.svg";
import kappa from "../../assets/icons/kappa.svg";
import ck from "../../assets/icons/ck.svg";
import carhartt from "../../assets/icons/carhartt.svg";
import umbro from "../../assets/icons/umbro.svg";
import lv from "../../assets/icons/lv.svg";

const Collaboration = () => {
  return (
    <section>
      <div className="relative mt-[40px]   border-t-[1.5px] border-asisDark"></div>
      <p className="mb-16 mt-10 text-[30px]/[30px] font-medium uppercase">
        /C<em className="font-[400]">o</em>llaborati
        <em className="font-[400]">o</em>ns
      </p>
      <div className=" flex items-center justify-center">
        <div className="grid w-[80%] grid-cols-3  items-center justify-between gap-x-40">
          <img src={nike} alt="nike" />
          <img src={kappa} alt="kappa" />
          <img src={ck} alt="ck" />
          <img src={carhartt} alt="carhartt" />
          <img src={umbro} alt="umbro" />
          <img src={lv} alt="lv" />
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
