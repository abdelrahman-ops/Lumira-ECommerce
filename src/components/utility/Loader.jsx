import React, { useState, useEffect } from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-transparent border-purple-500 rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="text-white text-xl font-light tracking-wider animate-pulse">
          Loading...
        </p>

        {/* Optional: Futuristic Glow Effect */}
        <div className="absolute w-24 h-24 bg-purple-500 rounded-full opacity-20 blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;