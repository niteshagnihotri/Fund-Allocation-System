"use client";
import React from "react";
import TopBar from "@/components/navbar/topbar";
import Sidebar from "@/components/navbar/sidebar";
import { usePathname } from "next/navigation";
import useStore from "@/store/userstore";

function NavbarLayout({ children }) {
  const currentUser = useStore((state)=>state.user);
  const pathName = usePathname();
  const segments = pathName.split("/");
  const heading = segments[1];

  if (heading === "login") {
    return (
      <div className="flex flex-col w-screen lg:w-full ">
        <div className="w-full ">{children}</div>
      </div>
    );
  }

  return (
    <div className="w-full flex">
      <div className="w-[20rem] min-h-screen">
        <Sidebar />
      </div>
      <div className="w-full space-y-8">
       {currentUser?.userAddress && <TopBar data={{ currentUser: currentUser?.userAddress, allowance: currentUser?.balance }} />} 
        <div className="px-8">{children}</div>{" "}
      </div>
    </div>
  );
}

export default NavbarLayout;
