"use client"

import { useState, useMemo } from "react"
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"
import OrderHistoryPresenter from "./OrderHistoryPresenter"
import { Badge } from "@/components/ui/badge"
import { useOrder } from "@/lib/hooks/useOrder"
import { Order, OrderList } from "@/lib/types/order"
import OrderDetailsModal from "./OrderDetailsModal"

const OrderHistoryContainer = () => {
  const columnHelper = createColumnHelper<Order>()
  const { data: orderData, isLoading, error } = useOrder("true", "false")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("orderUniqueId", {
        header: "Invoice",
        cell: (info) => <span className="text-gray-900 font-medium">{info.getValue()}</span>,
      }),
      columnHelper.accessor("items", {
        header: "Items",
        cell: (info) => <span className="text-gray-700">{info.getValue()?.length || 0} items</span>,
      }),
      columnHelper.accessor("purchaseDate", {
        header: "Billing Date",
        cell: (info) => {
           const dateVal = info.getValue()
           return <span className="text-gray-700">{dateVal ? new Date(dateVal).toLocaleDateString() : "N/A"}</span>
        },
      }),
      columnHelper.accessor("totalPrice", {
        header: "Amount",
        cell: (info) => <span className="text-gray-900 font-medium">${info.getValue()?.toFixed(2)}</span>,
      }),
      columnHelper.accessor("paymentStatus", {
        header: "Status",
        cell: (info) => {
          const status = info.getValue() || "unpaid"
          const isPaid = status === "paid"
          return (
            <Badge className={isPaid ? "bg-teal-100 text-teal-700 hover:bg-teal-200" : "bg-red-100 text-red-700 hover:bg-red-200"}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          )
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "View",
        cell: (info) => (
          <button 
            onClick={() => handleViewOrder(info.row.original)}
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
          >
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

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Something went wrong</p>

  // Ensure data is treated as an array of orders
  // Based on api/order.ts, it returns res.data. 
  // If res.data is the array, then orderData is the array. 
  // If res.data has a data property, then it's orderData.data.
  // The useOrder hook returns useQuery result. 
  // The queryFn returns res.data.
  // Safe check for array.
  const data: OrderList = Array.isArray(orderData) ? orderData : (orderData?.data || [])

  return (
    <>
      <OrderHistoryPresenter data={data} columns={columns} />
      <OrderDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        order={selectedOrder} 
      />
    </>
  )
}

export default OrderHistoryContainer
