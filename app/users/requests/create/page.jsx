"use client";
import BackButton from "@/components/inputs/backbutton";
import PrimaryButtonComponent from "@/components/inputs/button.component";
import CreateRequestLeftForm from "@/components/requests/create/leftform";
import RequestCreatedModal from "@/components/requests/requestcreated.modal";
import CreateRequestRightForm from "@/components/requests/create/rightform";
import { metamaskLoading, somethingwentwrong } from "@/constants/constants";
import { createFundingRequest } from "@/utils/user-apis";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

function CreateFundingRequest() {
  const formMethods = useForm();
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [requestId, setRequestId] = React.useState('');
  const queryClient = useQueryClient(); 

  const {
    handleSubmit,
    watch,
    reset,
  } = formMethods;

  const submitEnabled =
    watch("title") &&
    watch("description") &&
    watch("category") &&
    watch("documents") &&
    watch("amount");

  const onSubmit = async (data) => {
    console.log("post data : ", data);
    setLoading(true);
    try {
      toast.success(metamaskLoading);
      const res = await createFundingRequest(data);
      console.log("Funding Request Created. Request ID:", res);
      if (res) {
        toast.success("Request Created ");
        await queryClient.invalidateQueries('allusersrequest');
        setRequestId(res);
        setOpen(true);
      } 
    } catch (error) {
      console.log(error);
      toast.error(somethingwentwrong);
    }
    reset();
    setLoading(false);
  };

  return (
    <FormProvider {...formMethods}>
      <div className="space-y-10 bg-white rounded-lg p-10 min-h-[500px]">
        <div>
          <BackButton />
          <h1 className="text-xl font-semibold text-center">
            Create Fund Request
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-3/4 mx-auto grid grid-cols-2 px-5 gap-12 justify-center items-stretch"
        >
          <CreateRequestLeftForm />
          <div className="space-y-10">
            <CreateRequestRightForm />
            <PrimaryButtonComponent
              type={"submit"}
              isDisabled={!submitEnabled}
              isLoading={loading}
              className="text-xs disabled:opacity-90"
            />
          </div>
        </form>
        <RequestCreatedModal open={open} setOpen={setOpen} requestId={requestId} />
      </div>
    </FormProvider>
  );
}

export default CreateFundingRequest;
