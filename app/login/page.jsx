"use client";
import BackButton from "@/components/inputs/backbutton";
import TextInputComponent from "@/components/inputs/textinputcomponent";
import { login } from "@/utils/common-apis";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useStore from "@/store/userstore";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/inputs/loading.spinner.component";

export default function Login () {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const router = useRouter();


  const loginStore = useStore((state) => state.login);
  const [submit, setSubmit] = React.useState(false);

  const onSubmit = async (data) => {
    console.log("post data : ", data);
    setSubmit(true);
    try {
      const res = await login(data);
      if (res) {
        loginStore(res);
        toast.success("Login Successfull");
        if(res){
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Username or Password");
    }
    setSubmit(false);
    reset();
  };

  return (
    <div className="flex justify-center items-center align-middle min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-3/4 lg:w-[30%] p-10 space-y-8 text-sm shadow-xl shadow-gray-50 rounded-md"
      >
        <div>
          <BackButton route="/" />
          <h1 className="text-xl mt-2 font-semibold"> Welcome Back !</h1>
        </div>
        <TextInputComponent
          type="text"
          name="username"
          register={register}
          errors={errors}
          label="Username"
          placeholder="username"
          required={true}
        />
        <TextInputComponent
          type="password"
          name="password"
          register={register}
          errors={errors}
          label="Password"
          placeholder="password"
          required={true}
        />
        <button
          disabled={submit}
          type="submit"
          className="bg-primary text-white w-full px-4 py-2 rounded-sm shadow-sm"
        >
          {submit ? <LoadingSpinner /> : "Login"}
        </button>
      </form>
    </div>
  );
};

