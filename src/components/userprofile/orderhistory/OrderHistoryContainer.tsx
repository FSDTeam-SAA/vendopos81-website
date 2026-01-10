"use client"

import { useMemo } from "react"
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"
import OrderHistoryPresenter from "./OrderHistoryPresenter"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  invoice: string
  item: string
  billingDate: string
  amount: string
  status: "paid" | "unpaid"
}

const OrderHistoryContainer = () => {
  const columnHelper = createColumnHelper<Order>()

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      columnHelper.accessor("invoice", {
        header: "Invoice",
        cell: (info) => <span className="text-gray-900 font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("item", {
        header: "Item",
        cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
      }),
      columnHelper.accessor("billingDate", {
        header: "Billing Date",
        cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => <span className="text-gray-900 font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue()
          return (
            <Badge className={status === "paid" ? "bg-teal-100 text-teal-700" : "bg-red-100 text-red-700"}>
              {status === "paid" ? "Paid" : "Unpaid"}
            </Badge>
          )
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "View",
        cell: () => (
          <button className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View
          </button>
        ),
      }),
    ],
    [columnHelper],
  )

  // Mock data
  const data: Order[] = [
    { id: "1", invoice: "12345", item: "Product Name", billingDate: "27/10/2025", amount: "$500.00", status: "unpaid" },
    { id: "2", invoice: "12345", item: "Product Name", billingDate: "27/10/2025", amount: "$500.00", status: "paid" },
    { id: "3", invoice: "12345", item: "Service Name", billingDate: "27/10/2025", amount: "$500.00", status: "paid" },
    { id: "4", invoice: "12345", item: "Product Name", billingDate: "27/10/2025", amount: "$500.00", status: "paid" },
    { id: "5", invoice: "12345", item: "Product Name", billingDate: "27/10/2025", amount: "$500.00", status: "paid" },
    { id: "6", invoice: "12345", item: "Service Name", billingDate: "27/10/2025", amount: "$500.00", status: "unpaid" },
    { id: "7", invoice: "12345", item: "Product Name", billingDate: "27/10/2025", amount: "$500.00", status: "paid" },
    { id: "8", invoice: "12345", item: "Product Name", billingDate: "27/10/2025", amount: "$500.00", status: "paid" },
    { id: "9", invoice: "12345", item: "Product Name", billingDate: "27/10/2025", amount: "$500.00", status: "paid" },
    { id: "10", invoice: "12345", item: "Service Name", billingDate: "27/10/2025", amount: "$500.00", status: "paid" },
  ]

  return <OrderHistoryPresenter data={data} columns={columns} />
}

export default OrderHistoryContainer
