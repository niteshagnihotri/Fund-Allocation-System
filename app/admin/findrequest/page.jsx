"use client";
import React from "react";
import { PageHeader } from "@/components/page.header";
import { toast } from "react-toastify";
import { fetchRequestByOwnerAndID } from "@/utils/user-apis";
import PrimaryButtonComponent from "@/components/inputs/button.component";
import { useRouter } from "next/navigation";

export default function FindRequest (){
  const [requestId, setRequestId] = React.useState("");
  const [requestOwner, setRequestOwner] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const findRequestDetails = async () => {
    setLoading(true);
    if (requestId !== "") {
      if(requestOwner !== ""){
        try {
          const res = await fetchRequestByOwnerAndID(requestOwner, requestId);
          if (res.title !== "") {
            router.push(`/users/requests/${requestId}?owner=${requestOwner}`);
          } else {
            toast.error("Request Not Exits");
          }
        } catch (error) {
          console.log(error);
          toast.error("Request Not Found or Invalid Request");
        }
      }
      else{
        toast.error("Please enter request owner");
      }      
    } else {
      toast.error("Please enter request id");
    }
    setLoading(false);
    setRequestId("");
  };

  return (
    <div className="space-y-8">
      <PageHeader text="Track Request" />
      <div className="text-sm flex flex-col mx-auto w-1/3 text-center space-y-4">
      <input
          type="text"
          name="requestOwner"
          value={requestOwner}
          className="border-2 px-3 py-2 rounded-md text-xs text-center focus:outline-none"
          placeholder="Request Owner ID"
          onChange={(e) => setRequestOwner(e.target.value)}
        />
        <input
          type="text"
          name="requestId"
          value={requestId}
          className="border-2 px-3 py-2 rounded-md text-xs text-center focus:outline-none"
          placeholder="Request ID"
          onChange={(e) => setRequestId(e.target.value)}
        />
        <PrimaryButtonComponent
          type="button"
          onClick={findRequestDetails}
          isLoading={loading}
          className="text-xs"
        />
      </div>
    </div>
  );
};
