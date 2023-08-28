// Create a LoadingSpinner component (or you can use a library like react-loader-spinner)
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mt-0 backdrop-blur-lg">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4  border-t-asisDark"></div>
    </div>
  );
};

export default Loading;
