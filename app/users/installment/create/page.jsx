"use client";
import BackButton from "@/components/inputs/backbutton";
import PrimaryButtonComponent from "@/components/inputs/button.component";
import TextInputComponent from "@/components/inputs/textinputcomponent";
import RequestCreatedModal from "@/components/requests/requestcreated.modal";
import UploadFilesToIPFS from "@/components/inputs/uploadfiles";
import { metamaskLoading, somethingwentwrong } from "@/constants/constants";
import { createInstallmentRequest } from "@/utils/user-apis";
import { useSearchParams } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CreateInstallmentRequest = () => {
  const [open, setOpen] = React.useState(false);
  const [requestId, setRequestId] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get('request');

  const formMethods = useForm({
    defaultValues: {
      documents: []
    }
  });
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = formMethods;

  React.useEffect(()=>{
    if(id){
      reset({
        requestId: id
      });
    }
  }, [id]);

  const submitEnabled = watch('requestId') && watch('documents');

  const onSubmit = async (data) => {
    console.log("post data : ", data);
    setLoading(true);
    try {
      toast.success(metamaskLoading);
      const res = await createInstallmentRequest(data);
      if (res.requestId) {
        toast.success("Request Created ");
        console.log("Installment Request Created. Request ID:", res);
        setRequestId(res.requestId);
        setOpen(true);
      }
      else{
        toast.error("Request is not approved yet");
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
            Create Installment Request
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-2/5 space-y-8 mx-auto">
          <TextInputComponent
            type="text"
            name="requestId"
            errors={errors}
            required={true}
            register={register}
            label="Request ID"
            placeholder="Paste Request ID"
            className="text-xs"
          />
          <UploadFilesToIPFS />

          <PrimaryButtonComponent
            type={"submit"}
            isDisabled={!submitEnabled}
            isLoading={loading}
            className="text-xs disabled:opacity-90"
          />
        </form>
        
        <RequestCreatedModal open={open} setOpen={setOpen} requestId={requestId} />
      </div>
    </FormProvider>
  );
};

export default CreateInstallmentRequest;
