import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="relative">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <div
            className="absolute w-full h-full rounded-full border-[2px] border-gray-800 border-r-blue-500 border-b-blue-500 animate-spin"
            style={{ animationDuration: "1.5s" }}
          />
          <div
            className="absolute w-full h-full rounded-full border-[2px] border-gray-800 border-t-blue-400 animate-spin"
            style={{ animationDuration: "1s", animationDirection: "reverse" }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-blue-400/10 animate-pulse rounded-full blur-sm" />
      </div>
    </div>
  );
};

export default Loader;
