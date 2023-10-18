import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const TransferModal = ({state, setState, approveRequest}) => {
  return (
    <AlertDialog open={state} onOpenChange={setState}>
      <AlertDialogContent className="min-w-fit h-fit p-6 py-10 space-y-8">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to transfer the funds ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setState(false)} className="ring-0 border-0 bg-slate-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              approveRequest();
            }}
            className="bg-primary hover:bg-opacity-75 hover:bg-primary text-white focus:bg-opacity-75"
          >
            Approve Request
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TransferModal;
