import React from "react";
import TransactionTableRowComponent from "@/components/admin/transactiontablerow.component";

const TransactionTable = ({ tableData }) => {
  return (
    <div className="px-3 lg:px-5 py-5 text-xs w-auto overflow-x-auto bg-white min-h-[300px] rounded-lg">
      <table className="border-separate border-spacing-y-2 w-full">
        <thead className="bg-light-white-100">
          <tr className="text-[#727272]">
            <th className="text-center py-3 px-3 lg:py-5 lg:px-5">From</th>
            <th className="text-center py-3 px-3 lg:py-5 lg:px-5">To</th>
            <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Amount</th>
            <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Date</th>
          </tr>
        </thead>

        <tbody>
          {tableData?.length > 0 && tableData.map((data, index) => (
            <TransactionTableRowComponent key={index} data={data} />
          ))}
        </tbody>
      </table>

      {tableData.length === 0 && <p className="py-2.5 text-center">No data</p>}
    </div>
  );
};

export default TransactionTable;
