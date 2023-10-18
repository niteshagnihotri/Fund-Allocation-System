"use client";
import { getAllTransactions } from "@/utils/common-apis";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingButtonComponent from "@/components/inputs/loadingbutton.component";
import TransactionTable from "@/components/admin/transactiontable.component";

const Transactions = () => {
  const { data, status } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getAllTransactions(),
  });

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold">Transactions</h1>
      {
        status === "loading" &&
        <LoadingButtonComponent />
      }
      {
        status === "success" && 
        <TransactionTable tableData={data} />
      }
    </div>
  );
};

export default Transactions;
