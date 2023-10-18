import React from "react";

const TransactionTableRowComponent = ({ data }) => {
  return (
    <tr className="whitespace-nowrap capitalize font-medium text-xs ">
      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center uppercase">
        {data?.from}
      </td>

      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center">{data?.to}</td>

      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center">{data?.amount ? data?.amount : "-"}</td>
      <td className="py-3 px-3 lg:py-5 lg:px-5 text-center">{data?.date_created ? data?.date_created : "-"}</td>
    </tr>
  );
};

export default TransactionTableRowComponent;
