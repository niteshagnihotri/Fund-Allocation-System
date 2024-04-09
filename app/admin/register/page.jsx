'use client'
import BackButton from "@/components/inputs/backbutton";
import LoadingSpinner from "@/components/inputs/loading.spinner.component";
import TextInputComponent from "@/components/inputs/textinputcomponent";
import { registerUser } from "@/utils/admin-apis";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RegisterUser () {

  const [submit, setSubmit] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("post data :", data);
    setSubmit(true);
    try{
        const res = await registerUser(data);
        if(res){
            toast.success("User Registered");
        }
        else{
          toast.error("Only Admin can call this function");
        }
    }
    catch(error){
        console.log(error);
        toast.error("Something Went Wrong");
    }
    
    setSubmit(false);
    reset();
  };

  return (
    <div className="flex justify-center items-center align-middle min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-[80%] lg:max-w-3xl p-10 space-y-8 text-sm rounded-xl shadow-sm bg-white"
      >
        <div className="">
          <BackButton />
          <h1 className="text-xl mt-2 font-semibold"> Create New User !</h1>
        </div>
        <TextInputComponent
          type="text"
          name="name"
          register={register}
          errors={errors}
          placeholder="full name"
          className=""
        />
        <TextInputComponent
          type="text"
          name="role"
          register={register}
          errors={errors}
          placeholder="role"
          className=""
        />
        <TextInputComponent
          type="text"
          name="username"
          register={register}
          errors={errors}
          placeholder="username"
          className=""
        />
        <TextInputComponent
          type="password"
          name="password"
          register={register}
          errors={errors}
          placeholder="password"
          className=""
        />
        <TextInputComponent
          type="text"
          name="userAddress"
          register={register}
          errors={errors}
          placeholder="User Address"
          className=""
        />
        <button
          type="submit"
          disabled={submit}
          className="bg-primary text-white w-full px-4 py-2 rounded-sm shadow-sm"
        >
          {submit ? <LoadingSpinner /> : 'Create New User'}
        </button>
      </form>
    </div>
  );
};
