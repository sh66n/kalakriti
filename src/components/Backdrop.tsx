import React from "react";

const Backdrop = ({ children }: any) => {
  return (
    <div className="hover:bg-[#171717] px-4 py-1 rounded-full hover:cursor-pointer">
      {children}
    </div>
  );
};

export default Backdrop;
