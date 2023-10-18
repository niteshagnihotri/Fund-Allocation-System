import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingButtonComponent from "@/components/inputs/loadingbutton.component";
import { fetchAllUsersRequestsByStatus } from "@/utils/admin-apis";
import RequestsTableComponent from "../requests/view/requeststable.component";

const AdminRequestsTableSection = ({ currentTab }) => {
  const { data, status } = useQuery({
    queryKey: ["adminrequests", currentTab],
    queryFn: () => fetchAllUsersRequestsByStatus(currentTab),
  });

  if (status === "loading") {
    return <LoadingButtonComponent />;
  }
  
  return (
    <>
      {data && <RequestsTableComponent tableData={data} />}
    </>
  );
};

export default AdminRequestsTableSection;
