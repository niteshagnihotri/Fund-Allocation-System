import { fetchUsersAllRequestByStatus } from "@/utils/user-apis";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingButtonComponent from "@/components/inputs/loadingbutton.component";
import RequestTableComponent from "./requeststable.component";

const RequestTableSection = ({ currentTab }) => {
  const { data, status } = useQuery({
    queryKey: ["allusersrequest", currentTab],
    queryFn: () => fetchUsersAllRequestByStatus(currentTab),
  });

  if (status === "loading") {
    return <LoadingButtonComponent />;
  }

  return (
    <div className="bg-white rounded-md min-h-[400px] flex flex-col justify-between">
      {status === "success" && <RequestTableComponent tableData={data} />}
      {status === "loading" && <LoadingButtonComponent />}
      {status === "error" && <h1>No Data</h1>}
    </div>
  );
};

export default RequestTableSection;
