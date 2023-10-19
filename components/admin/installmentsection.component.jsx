import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingButtonComponent from "@/components/inputs/loadingbutton.component";
import { fetchInstallmentRequestsByNumber } from "@/utils/admin-apis";
import RequestsTableComponent from "../requests/view/requeststable.component";

const InstallmentSectionComponent = () => {
  const { data, status } = useQuery({
    queryKey: ["installments"],
    queryFn: () => fetchInstallmentRequestsByNumber(),
  });

  if (status === "loading") {
    return <LoadingButtonComponent />;
  }
  
  return (
    <div className="bg-white rounded-md min-h-[500px] flex flex-col justify-between">
      {data && <RequestsTableComponent tableData={data} />}
    </div>
  );
};

export default InstallmentSectionComponent;
