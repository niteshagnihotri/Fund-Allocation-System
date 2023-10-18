'use client'
import { useRouter } from "next/navigation";
import React from "react";
import InstallmentSectionComponent from "@/components/admin/installmentsection.component";
import Tab from "@/components/requests/view/tab.component";
import { HiOutlineDocumentSearch } from "react-icons/hi";

export default function InstallmentsPage (){
  const [currentTab, setCurrentTab] = React.useState(2);

  const router = useRouter();
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

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
            onClick={() => handleTabChange(2)}
            active={currentTab === 2}
            count={0}
          >
            Second
          </Tab>
          <Tab
            onClick={() => handleTabChange(3)}
            active={currentTab === 3}
            count={0}
          >
            Third
          </Tab>
          <Tab
            onClick={() => handleTabChange(4)}
            active={currentTab === 4}
            count={0}
          >
            Fourth
          </Tab>
        </div>
      </div>
      <InstallmentSectionComponent currentTab={currentTab} />
    </div>
  );
};
