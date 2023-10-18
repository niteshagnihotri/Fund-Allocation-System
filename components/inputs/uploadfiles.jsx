import React from "react";
import { somethingwentwrong } from "@/constants/constants";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/inputs/loading.spinner.component";
import { useFormContext } from "react-hook-form";
import { ipfsClient } from "@/utils/ipfs-client";

const UploadFilesToIPFS = () => {
  const [files, setFiles] = React.useState();
  const [uploadLoading, setUploadLoading] = React.useState(false);

  const {setValue} = useFormContext();

  const handleFileUpload = async () => {
    setUploadLoading(true);
    try {
      const ipfsDocumentHashes = [];

      const valuesArray = Object.values(files);

      await Promise.all(
        valuesArray.map(async (file) => {
          const hash = await (ipfsClient).add(file);
          ipfsDocumentHashes.push(hash.path);
        })
      );
      
      setValue('documents', ipfsDocumentHashes);
      toast.success("Files Uploaded Successfully");      
    } catch (error) {
      console.log(error);
      toast.error(somethingwentwrong);
    }
    setUploadLoading(false);
    setFiles();
  };

  const handleFileChange = (event) => {
    const allFiles = event.target.files;
    if(Object.keys(allFiles).length <= 3){
      setFiles(allFiles);
    }
    else{
      toast.error("Please select 3 files only");
    }
  };

  return (
    <div className="space-y-4 flex flex-col text-xs">
      <label htmlFor="documents" className="text-sm font-medium ">
        Upload Documents{" "}
        <span className="text-xs text-slate-500">
          (only 3 pdf files accepted)
        </span>
      </label>
      <input
        type="file"
        name="documents"
        accept=".pdf"
        onChange={handleFileChange}
        multiple
        className=""
      />
      {files && Object.keys(files).length > 0 && (
        <button
          type="button"
          disabled={uploadLoading}
          onClick={handleFileUpload}
          className="border-2 bg-slate-200 rounded-sm shadow-sm px-6 py-1 w-fit "
        >
          {uploadLoading ? <LoadingSpinner /> : "Upload"}
        </button>
      )}
    </div>
  );
};

export default UploadFilesToIPFS;
