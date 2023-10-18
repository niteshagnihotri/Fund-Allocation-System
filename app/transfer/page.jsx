"use client";
import BackButton from "@/components/inputs/backbutton";
import TextInputComponent from "@/components/inputs/textinputcomponent";
import PrimaryButtonComponent from "@/components/inputs/button.component";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { somethingwentwrong } from "@/constants/constants";
import { transferFromAdmin } from "@/utils/user-apis";
import useStore from "@/store/userstore";
import { checkUserExists } from "@/utils/common-apis";
import { transferFund } from "@/utils/admin-apis";

const TransferFundsPage = () => {
  const [isSubmit, setIsSubmit] = React.useState(false);
  const transferFrom = useStore((state)=>state.tranferFrom);

  const formMethods = useForm();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = formMethods;

  const onSubmit = async (data) => {
    setIsSubmit(true);
    try {
      const res = checkUserExists() ? (await transferFromAdmin(data)) : (await transferFund(data));
      console.log("tranfer response : ",res);
      if (res) {
        transferFrom(data.amount);
        toast.success("Transaction Successful !");
      } else {
        toast.error(somethingwentwrong);
      }
    } catch (error) {
      console.log(error);
      toast.error(somethingwentwrong);
    }
    reset();
    setIsSubmit(false);
  };

  return (
    <div className="bg-white space-y-8 p-10 rounded-lg h-[500px]">
      <div>
        <BackButton text />
        <h1 className="text-xl font-semibold text-center text-gray-700">
          Transfer Funds
        </h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-1/2 space-y-10 mx-auto text-xs"
      >
        <TextInputComponent
          type="text"
          errors={errors}
          required={true}
          register={register}
          name="to"
          label="Receiver Address"
          placeholder="Address"
          className="mt-2"
        />
        <TextInputComponent
          type="number"
          errors={errors}
          required={true}
          register={register}
          name="amount"
          label="Amount"
          placeholder="Amount"
          className="mt-2"
          min={0}
        />
        <PrimaryButtonComponent
          isLoading={isSubmit}
          isDisabled={isSubmit}
          type="submit"
        />
      </form>
    </div>
  );
};

export default TransferFundsPage;
