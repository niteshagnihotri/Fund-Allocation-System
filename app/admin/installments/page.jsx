'use client'
import { useRouter } from "next/navigation";
import React from "react";
import InstallmentSectionComponent from "@/components/admin/installmentsection.component";
import Tab from "@/components/requests/view/tab.component";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersInstallmentCount } from "@/utils/common-apis";
import LoadingButtonComponent from "@/components/inputs/loadingbutton.component";

export default function InstallmentsPage (){

  const router = useRouter();

  const { data: installmentcount, status } = useQuery({
    queryKey: ["installmentcount"],
    queryFn: () => getAllUsersInstallmentCount(),
  });

  if(status === "loading") {
    return <LoadingButtonComponent />
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Installments List</h1>
          <p className="text-[#7B7B7B] text-sm">
            view, reject & approve installments request
          </p>
        </div>
        <button
        onClick={() => router.push("/")}
        className="inline-flex items-center space-x-2 text-xs border border-primary px-4 py-2 rounded-3xl text-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
      >
         <span>
            <HiOutlineDocumentSearch className="text-sm" />
          </span>
        <span>View New Requests</span>
      </button>
      </div>
      <div className="bg-white flex flex-col gap-4 md:flex-row rounded-lg justify-between py-2 px-4">
        <div className="flex items-center text-sm cursor-pointer md:px-4 gap-0 md:gap-8 overflow-x-scroll md:overflow-hidden no-scrollbar capitalize">
          <Tab
            onClick={() => {}}
            active={true}
            count={installmentcount ? installmentcount : 0}
          >
           New Installments
          </Tab>
        </div>
      </div>
      <InstallmentSectionComponent/>
    </div>
  );
};
