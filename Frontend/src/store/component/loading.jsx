// Create a LoadingSpinner component (or you can use a library like react-loader-spinner)
import React from "react";

const Loading = () => {
  return (
    <div className=" left-0 top-0 h-[40vh] w-[60vw] bg-[url('./assets/images/bg_img.png')] ">
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-asisDark"></div>
      </div>
    </div>
  );
};

export default Loading;
