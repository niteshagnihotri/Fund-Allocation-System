import React from "react";
import TransferModal from "./requestsmodal/transfer.modal";
import RejectModal from "./requestsmodal/reject.modal";
import { toast } from "react-toastify";
import { somethingwentwrong } from "@/constants/constants";
import { denyFundingRequest, transferInstallment } from "@/utils/admin-apis";
import LoadingSpinner from "../inputs/loading.spinner.component";
import { useQueryClient } from "@tanstack/react-query";

const RequestApproveRejectComponent = ({ requestOwner, requestId }) => {
  const [transferOpen, setTransferOpen] = React.useState(false);
  const [transferLoading, setTransferLoading] = React.useState(false);
  const [rejectLoading, setRejectLoading] = React.useState(false);
  const [rejectOpen, setRejectOpen] = React.useState(false);
  const queryClient = useQueryClient();


  const approveRequest = async () => {
    setTransferOpen(false);
    setTransferLoading(true);
    try {
      const res = await transferInstallment(requestOwner, requestId);
      if (res) {
        toast.success("Funds Approved !");
        await queryClient.invalidateQueries("adminrequests");
      }
      else{
        toast.error(somethingwentwrong);
      }
    } catch (error) {
      console.log(error);
      toast.error(somethingwentwrong);
    }
    setTransferLoading(false);
  };

  const rejectRequest = async (reason) => {
    setRejectOpen(false);
    setRejectLoading(true);
    try {
      const res = await denyFundingRequest(requestOwner, requestId, reason);
      if (res) {
        toast.success("Request Denied !");
      }
      else{
        toast.error(somethingwentwrong);
      }
    } catch (error) {
      console.log(error);
      toast.error(somethingwentwrong);
    }
    setRejectLoading(false);
  };

  return (
    <div className="flex items-center space-x-10 justify-end text-xs text-white">
      <button
        disabled={transferLoading}
        onClick={() => setTransferOpen(true)}
        type="button"
        className="bg-primary dis px-6 py-2 rounded-sm"
      >
        {transferLoading ? <LoadingSpinner /> : "Transfer Installment"}
      </button>
      <button
        disabled={rejectLoading}
        onClick={() => setRejectOpen(true)}
        type="button"
        className="bg-red-200 rounded-sm px-6 py-2"
      >
        {rejectLoading ? <LoadingSpinner /> : "Deny Request"}
      </button>
      <TransferModal
        state={transferOpen}
        setState={setTransferOpen}
        approveRequest={approveRequest}
      />
      <RejectModal
        state={rejectOpen}
        setState={setRejectOpen}
        rejectRequest={rejectRequest}
      />
    </div>
  );
};

export default RequestApproveRejectComponent;
