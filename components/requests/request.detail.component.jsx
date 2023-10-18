import { handleCopyClick, statuses } from "@/constants/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FiCopy, FiPlus } from "react-icons/fi";
import RequestApproveRejectComponent from "../admin/requestapprovereject.component";

const RequestDetailsComponent = ({ data }) => {
  const [admin, setAdmin] = React.useState(false);
  const router = useRouter();
  const date = new Date(data?.date_created * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const day = date.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  React.useEffect(() => {
    let user =
      typeof window !== undefined
        ? JSON.parse(localStorage.getItem("user"))
        : null;
    if (user.role === "admin") {
      setAdmin(true);
    }
  }, []);

  return (
    data && (
      <div className="bg-white rounded-md px-10 py-8 text-sm font-medium space-y-8 font-Manrope capitalize">
        <div className="flex items-center justify-between">
          <h1 className="text-base">Request Details</h1>
          {admin && data?.status !== 2 && (
            <RequestApproveRejectComponent
              requestOwner={data?.requestOwner}
              requestId={data?.requestId}
            />
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm text-gray-600 h-full pb-8">
          <div className="border-2 rounded-lg p-8 space-y-5">
            {/* col 1 */}
            <div className="space-y-3">
              <h1 className="font-bold text-gray-900">Created By</h1>
              <div className="flex items-center">
                <p>{data?.requestOwner}</p>
                <FiCopy
                  onClick={() => {
                    handleCopyClick(data?.requestOwner);
                  }}
                  className="ml-2 text-red-300 text-2xl cursor-pointer"
                />
              </div>
            </div>
            <hr />
            <div className="space-y-3">
              <h1 className="font-bold text-gray-900">Request Title</h1>
              <p>{data?.title}</p>
            </div>
            <hr />
            <div className="space-y-3">
              <h1 className="font-bold text-gray-900">Description</h1>
              <p className="text-xs">{data?.description}</p>
            </div>
            <hr />
            <div className="space-y-3">
              <h1 className="font-bold text-gray-900">Category</h1>
              <p>{data?.category}</p>
            </div>
            <hr />
            <div className="space-y-3">
              <h1 className="font-bold text-gray-900">Status</h1>
              <p>{statuses[data?.status]}</p>
            </div>
            {statuses[data?.status] === 3 && (
              <h1>
                Denial Reason :{" "}
                <span className="font-normal">{data?.denialReason}</span>
              </h1>
            )}
          </div>
          {/* col 2 */}
          <div className="border-2 rounded-lg p-8 space-y-8">
            <div className="flex items-center space-x-3">
              <h1 className="font-bold text-gray-900">Date Created : </h1>
              <p>{formattedDate ? formattedDate : "-"}</p>
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="font-bold text-gray-900">Requested Amount : </h1>
              <p>{data?.totalAmount}</p>
            </div>

            <div className="flex items-center space-x-3">
              <h1 className="font-bold text-gray-900">Approved Amount : </h1>
              <p>{data?.approvedAmount}</p>
            </div>

            <div className="flex items-center space-x-3">
              <h1 className="font-bold text-gray-900">Installment No : </h1>
              <p>{data?.installmentNumber}</p>
            </div>

            <div className="flex items-center space-x-3 flex-wrap">
              <h1 className="font-bold text-gray-900">Documents : </h1>
              {data?.ipfsDocumentHashes?.length > 0 ? (
                // <div className="flex flex-row space-x-2 flex-wrap">
                  <div className="flex flex-row space-x-3 text-blue-100 font-medium flex-wrap">
                    {data?.ipfsDocumentHashes.map((hash, index) => (
                      <Link
                        key={index}
                        href={`https:ipfs.io/ipfs/${hash}`}
                        target="_blank"
                      >
                        Preview Document {index + 1}
                      </Link>
                    ))}
                  </div>
                // </div>
              ) : null}
            </div>
            {data?.status !== 0 && data?.status !== 2 && !admin && (!data?.installmentStatus) && (
              <button
                onClick={() =>
                  router.push(
                    `/users/installment/create?request=${data.requestId}`
                  )
                }
                className="inline-flex items-center space-x-2 text-xs border border-primary px-4 py-2 rounded-3xl text-primary hover:bg-primary hover:text-white transition-all hover:shadow-lg"
              >
                <span>
                  <FiPlus className="text-sm" />
                </span>
                <span>Create Installment Request</span>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default RequestDetailsComponent;
