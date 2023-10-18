import React from 'react'
import RequestsTableRowComponent from './requeststablerow.component'
import { statuses } from '@/constants/constants'

const RequestsTableComponent = ({tableData}) => {

  return (
    <div className="px-3 lg:px-5 py-5 text-xs w-auto overflow-x-auto bg-white min-h-[300px] rounded-lg">
    <table className="border-separate border-spacing-y-2 w-full">
      {/* Table head */}
      <thead className="bg-light-white-100">
        <tr className="text-[#727272]">
          <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Request ID</th>
          <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Title</th>
          <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Status</th>
          <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Requested</th>
          <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Approved</th>
          <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Category</th>
          <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Installment</th>
          <th className="text-center py-3 px-3 lg:py-5 lg:px-5">Installment Status</th>
        </tr>
      </thead>

      {/* Table body */}
      <tbody>
        {tableData.map((data, index) => (
          <RequestsTableRowComponent
            key={index}
            id={data.requestId}
            requestOwner={data.requestOwner}
            title={data.title}
            status={statuses[data.status]}
            totalAmount={data.totalAmount}
            approvedAmount={data.approvedAmount}
            category={data.category}
            installmentStatus={data.installmentStatus}
            installmentNumber={data.installmentNumber}
          />
        ))}
      </tbody>
    </table>

    {tableData.length === 0 && <p className="py-2.5 text-center">No data</p>}
  </div>
  )
}

export default RequestsTableComponent