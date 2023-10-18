import TextInputComponent from "@/components/inputs/textinputcomponent";
import React from "react";
import UploadFilesToIPFS from "../../inputs/uploadfiles";
import { useFormContext } from "react-hook-form";

const CreateRequestRightForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <TextInputComponent
          type="number"
          label="Amount"
          name="amount"
          register={register}
          errors={errors}
          required={true}
          placeholder="Amount"
          className="text-xs"
          min="0"
        />
        <TextInputComponent
          type="text"
          label="Category"
          name="category"
          register={register}
          errors={errors}
          required={true}
          placeholder="Category"
          className="text-xs"
        />
      </div>
      <UploadFilesToIPFS />
      
    </div>
  );
};

export default CreateRequestRightForm;
