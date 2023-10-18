import { useRouter } from "next/navigation";
import React from "react";
import Tab from "../requests/view/tab.component";
import AdminRequestsTableSection from "../admin/requestsection.component";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { getAllUsersRequestsCount } from "../../utils/common-apis";
import { useQuery } from "@tanstack/react-query";
import LoadingButtonComponent from "@/components/inputs/loadingbutton.component";

const AdminHomeComponent = () => {
  const [currentTab, setCurrentTab] = React.useState("pending");
  const router = useRouter();

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const { data, status } = useQuery({
    queryKey: ["count", currentTab],
    queryFn: () => getAllUsersRequestsCount(),
  });

  return (
    <div className="space-y-8 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Requests List</h1>
          <p className="text-[#7B7B7B] text-sm">
            View, approve, or reject requests
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/installments")}
          className="inline-flex items-center space-x-2 text-xs border border-primary px-4 py-2 rounded-3xl text-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
        >
          <span>
            <HiOutlineDocumentSearch className="text-sm" />
          </span>
          <span>View Installments</span>
        </button>
      </div>
      <div className="bg-white flex flex-col gap-4 md:flex-row rounded-lg justify-between py-2 px-4">
        <div className="flex items-center text-sm cursor-pointer md:px-4 gap-0 md:gap-8 overflow-x-scroll md:overflow-hidden no-scrollbar capitalize">
          <Tab
            onClick={() => handleTabChange("pending")}
            active={currentTab === "pending"}
            count={data?.pending ? data?.pending : 0}
          >
            New Requests
          </Tab>
          <Tab
            onClick={() => handleTabChange("all")}
            active={currentTab === "all"}
            count={data?.all ? data?.all : 0}
          >
            All Requests
          </Tab>
        </div>
      </div>
      {
        status === "loading" && <LoadingButtonComponent />
      }
      {
        status === "success" && 
        <AdminRequestsTableSection currentTab={currentTab} />
      }
    </div>
  );
};

export default AdminHomeComponent;
