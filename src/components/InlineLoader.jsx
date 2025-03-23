import React from "react";

const InlineLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>

      {/* Optional: Loading Text */}
      <p className="text-gray-600 text-sm font-light tracking-wider">
        Loading content...
      </p>

      {/* Optional: Subtle Glow Effect */}
      <div className="absolute w-16 h-16 bg-blue-500 rounded-full opacity-10 blur-lg animate-pulse"></div>
    </div>
  );
};

export default InlineLoader;