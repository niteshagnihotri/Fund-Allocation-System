import { toast } from "react-toastify";

export const somethingwentwrong = "Something Went Wrong ! Please Try Again Later";
export const metamaskLoading = "Metamask Loading ";

export const statuses = ['Pending', 'Approved', 'Completed', 'Denied'];

export const tabs = {
  "pending" : 0,
  "approved" : 1,
  "completed" : 2,
  "denied" : 3
}

export const handleCopyClick = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
      toast.error("Failed to Copy");
    }
  };

