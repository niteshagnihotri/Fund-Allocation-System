import { useRouter } from "next/navigation";
import React from "react";
import Tab from "../requests/view/tab.component";
import RequestTableSection from "../requests/view/requestsection.component";
import { FiPlus } from "react-icons/fi";
import LoadingSpinner from "../inputs/loading.spinner.component";
import { getUserRequestCount } from "../../utils/common-apis";
import { useQuery } from "@tanstack/react-query";
import LoadingButtonComponent from "@/components/inputs/loadingbutton.component";

const UserHomeComponent = () => {
  const [currentTab, setCurrentTab] = React.useState("all");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const { data, status } = useQuery({
    queryKey: ["count", currentTab],
    queryFn: () => getUserRequestCount(currentTab),
  });

  return (
    <div className="space-y-8 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl">Requests List</h1>
          <p className="text-[#7B7B7B] text-sm">
            View, manage, or create requests
          </p>
        </div>
        <button
          disabled={loading}
          onClick={() => {
            router.push("/users/requests/create");
            setLoading(true);
          }}
          className="inline-flex items-center space-x-2 text-xs border border-primary px-4 py-2 rounded-3xl text-primary hover:bg-primary hover:text-white transition-all shadow-md hover:shadow-lg"
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <span>
                <FiPlus className="text-sm" />
              </span>
              <span>Create Request</span>{" "}
            </>
          )}
        </button>
      </div>
      <div className="bg-white flex flex-col gap-4 md:flex-row rounded-lg justify-between py-2 px-4">
        <div className="flex items-center text-sm cursor-pointer md:px-4 gap-0 md:gap-8 overflow-x-scroll md:overflow-hidden no-scrollbar capitalize">
          <Tab
            onClick={() => handleTabChange("all")}
            active={currentTab === "all"}
            count={data?.all ? data?.all : 0}
          >
            All
          </Tab>
          <Tab
            onClick={() => handleTabChange("pending")}
            active={currentTab === "pending"}
            count={data?.pending ? data?.pending : 0}
          >
            Pending
          </Tab>
          <Tab
            onClick={() => handleTabChange("approved")}
            active={currentTab === "approved"}
            count={data?.approved ? data?.approved : 0}
          >
            Approved
          </Tab>
          <Tab
            onClick={() => handleTabChange("completed")}
            active={currentTab === "completed"}
            count={data?.completed ? data?.completed : 0}
          >
            Completed
          </Tab>
          <Tab
            onClick={() => handleTabChange("denied")}
            active={currentTab === "denied"}
            count={data?.denied ? data?.denied : 0}
          >
            Denied
          </Tab>
        </div>
      </div>
      {status === "loading" && (
        <>
          <LoadingButtonComponent />
        </>
      )}
      {status === "success" && <RequestTableSection currentTab={currentTab} />}
    </div>
  );
};

export default UserHomeComponent;
