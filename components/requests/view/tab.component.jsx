import React from "react";

const Tab = ({ children, onClick, active, count }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center font-medium py-3 mx-2  border-b-4 ${
        active ? "border-b-4 border-primary" : "border-b-transparent"
      } `}
    >
      {children}
      <span
        className={`rounded text-[10px]  px-[3px] ml-2 ${
          active ? "bg-primary text-white" : "bg-[#F9F9F9] text-primary"
        }`}
      >
        {count}
      </span>
    </div>
  );
};

export default Tab;
