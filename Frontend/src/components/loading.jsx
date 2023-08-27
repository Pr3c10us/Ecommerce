// Create a LoadingSpinner component (or you can use a library like react-loader-spinner)
import React from "react";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-[url('./assets/images/bg_img.png')]">
      <div className="flex h-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-t-asisDark"></div>
      </div>
    </div>
  );
};

export default Loading;
