import { Logo } from "@/components/logo";
import {
    AlertDialog,
    AlertDialogContent,
  } from "@/components/ui/alert-dialog"
import {AiOutlineClose} from 'react-icons/ai';
  
import React from "react";
import {FiCopy} from 'react-icons/fi';
import { handleCopyClick } from "@/constants/constants";

const RequestCreatedModal = ({ open, setOpen, requestId='' }) => {

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-lg py-10 px-8">
        <div className="flex items-center justify-between">
        <Logo />
        <span className="text-xl" onClick={()=>setOpen(false)}>
        <AiOutlineClose /></span>
        </div>
        <h1 className="text-lg font-semibold text-center mt-5 text-gray-700">
          Request ID :{" "}
        </h1>
        <div className="w-fit mx-auto flex items-center text-lg">
            <span className="bg-red-300 px-4 py-1 bg-opacity-40 capitalize rounded-lg">
            {
                (requestId).slice(0,5)+"..."+(requestId).slice(-4)
            }
            </span>
            <FiCopy onClick={() => {handleCopyClick(requestId); setOpen(false);}} className="ml-2 text-red-300 text-2xl"/>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RequestCreatedModal;
