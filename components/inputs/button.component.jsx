import React from "react";
import LoadingSpinner from "./loading.spinner.component";

const PrimaryButtonComponent = ({
  isDisabled = false,
  type = "button",
  text = "Submit",
  isLoading = false,
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={`bg-primary text-white w-full px-4 py-2 rounded-sm shadow-sm ${className}`}
    >
      {isLoading ? <LoadingSpinner /> : text ? text : "Submit"}
    </button>
  );
};

export default PrimaryButtonComponent;
