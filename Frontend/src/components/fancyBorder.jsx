import React from "react";
import topLeft from "../assets/icons/topLeft.svg";
import topRight from "../assets/icons/topRight.svg";
import bottomLeft from "../assets/icons/bottomLeft.svg";
import bottomRight from "../assets/icons/bottomRight.svg";

const FancyBorder = () => {
  return (
    <div className="absolute inset-0">
      <img src={topLeft} alt="topLeft" className="absolute left-0 top-0" />
      <img src={topRight} alt="topRight" className="absolute right-0 top-0" />

      <img
        src={bottomLeft}
        alt="bottomLeft"
        className="absolute bottom-0 left-0"
      />
      <img
        src={bottomRight}
        alt="bottomRight"
        className="absolute bottom-0 right-0"
      />
    </div>
  );
};

export default FancyBorder;
