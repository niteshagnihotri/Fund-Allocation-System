import React from "react";
import { FiCopy } from "react-icons/fi";
import { handleCopyClick } from "@/constants/constants";

export default function TopBar({ data }) {
  return (
    <div className="w-full py-3 bg-white flex justify-end text-sm font-medium">
      <div className="space-x-3 bg-red-50 px-8 py-1 mr-5 rounded-xl flex items-center">
        {data?.currentUser && (
          <>
            <span>BAL : {data?.allowance}</span> <span>|</span>
            <span className="flex items-center space-x-2 uppercase">
              {(data?.currentUser ? data.currentUser : null).slice(0, 5) +
                "..." +
                (data?.currentUser ? data.currentUser : null).slice(-4)}

              <FiCopy
                onClick={() => {
                  handleCopyClick(data?.currentUser ? data.currentUser : null);
                  setOpen(false);
                }}
                className="ml-2 text-red-300 text-2xl cursor-pointer"
              />
            </span>{" "}
          </>
        )}
      </div>
    </div>
  );
}
