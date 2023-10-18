import { useRouter } from "next/navigation";
import React from "react";

const statusClassNames = {
  Pending: "text-[#14B8A6] bg-[#14B8A6]/10",
  Approved: "text-[#EF4444] bg-[#EF4444]/10",
  Completed: "text-[#F6A57A] bg-[#F6A57A]/10",
  Denied: "text-[#930ea5] bg-[#fad5ff80]",
};

const RequestsTableRowComponent = ({
  id,
  requestOwner,
  title,
  status,
  totalAmount,
  approvedAmount,
  category,
  installmentStatus,
  installmentNumber,
}) => {

  // console.log(id);

  const router = useRouter();
  let requestId = id.slice(0, 4) + "..." + id.slice(-4);

  return (
    <tr
      className="cursor-pointer whitespace-nowrap capitalize font-medium text-xs"
      onClick={() => {
        router.push(`/users/requests/${id}?owner=${requestOwner}`);
      }}
    >
      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center uppercase">
        {requestId}
      </td>

      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center">{title}</td>
      <td className="text-center px-5">
        {/*@ts-ignore*/}
        <div className={`py-2 px-3 rounded-full ${statusClassNames[status]}`}>
          {status}
        </div>
      </td>
      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center">{totalAmount}</td>
      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center">
        {approvedAmount}
      </td>
      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center">{category}</td>
      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center">
        {installmentNumber}
      </td>
      <td className="text-center">{installmentStatus ? "Created" : "Not Created"}</td>
    </tr>
  );
};

export default RequestsTableRowComponent;
