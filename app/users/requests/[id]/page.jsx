"use client";
import BackButton from "@/components/inputs/backbutton";
import LoadingButtonComponent from "@/components/inputs/loadingbutton.component";
import RequestDetailsComponent from "@/components/requests/request.detail.component";
import { handleCopyClick } from "@/constants/constants";
import { fetchRequestByOwnerAndID } from "@/utils/user-apis";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { FiCopy } from "react-icons/fi";

const RequestDetailsPage = () => {
  const { id } = useParams();
  
  const searchParams = useSearchParams();
  const requestOwner = searchParams.get('owner');

  const { data, status } = useQuery({
    queryKey: ["request", id],
    queryFn: () => fetchRequestByOwnerAndID(requestOwner, id),
    enabled: !!id
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center space-x-5 bg-white text-sm px-6 py-3 rounded-md font-medium">
        <BackButton route="/"/>
        <h1 className="flex items-center">
          <span> Request Id :</span> {id}
        </h1>
          <FiCopy onClick={() => {handleCopyClick(id)}} className="ml-2 text-red-300 text-2xl cursor-pointer"/>
      </div>
      {status === 'loading' && (
        <>
          <LoadingButtonComponent />
        </>
      )}

      {status === 'success' && (
        <RequestDetailsComponent data={data} />
      )}

      
    </div>
  );
};

export default RequestDetailsPage;
