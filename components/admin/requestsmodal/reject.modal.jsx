import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

const RejectModal = ({ state, setState, rejectRequest }) => {
  const [denialReason, setDenialReason] = React.useState("");

  return (
    <AlertDialog open={state}>
      <AlertDialogContent className="min-w-fit h-fit p-6 py-10 space-y-5 text-xs font-medium">
        <AlertDialogHeader>
          {" "}
          <AlertDialogTitle className="text-center font-semibold text-xl">Reject Request</AlertDialogTitle>{" "}
        </AlertDialogHeader>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-sm">Denial Reason</label>
          <textarea
            required={true}
            placeholder="Enter the reason"
            rows={5}
            className="px-4 py-2 text-xs bg-white border-2 rounded-md"
            onChange={(e) => setDenialReason(e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setState(false)}
            className="ring-0 border-0 bg-slate-200 outline-none"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (denialReason !== "") {
                rejectRequest(denialReason);
              }
            }}
            className="bg-red-200 hover:bg-opacity-75 hover:bg-red-200 text-white focus:bg-opacity-75"
          >
            Reject Request
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RejectModal;
