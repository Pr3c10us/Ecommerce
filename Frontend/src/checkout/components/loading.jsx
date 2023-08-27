import React from "react";

const Loading = () => {
  return (
    <div className="fixed backdrop-blur-sm inset-0 z-50">
      <div className="flex h-full items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-t-4 border-asisDark"></div>
      </div>
    </div>
  );
};

export default Loading;
