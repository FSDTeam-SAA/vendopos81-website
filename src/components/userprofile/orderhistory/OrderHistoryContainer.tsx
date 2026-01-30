"use client"

import { useState, useMemo } from "react"
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table"
import OrderHistoryPresenter from "./OrderHistoryPresenter"
import { Badge } from "@/components/ui/badge"
import { useOrder } from "@/lib/hooks/useOrder"

import OrderDetailsModal from "./OrderDetailsModal"
import { Order } from "@/lib/types/orderSuccess"

const OrderHistoryContainer = () => {
  const columnHelper = createColumnHelper<Order>()
  const [params, setParams] = useState({
    page: 1,
    limit: 10000,
    paymentStatus: undefined as string | undefined,
    orderStatus: undefined as string | undefined,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const { data: orderResponse, isLoading, error } = useOrder(params)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleFilterChange = (filter: { paymentStatus?: string; orderStatus?: string }) => {
    setParams((prev) => ({ 
      ...prev, 
      paymentStatus: filter.paymentStatus,
      orderStatus: filter.orderStatus 
    }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("_id", {
        header: "Invoice",
        cell: (info) => {
          const id = info.getValue()
          return <span className="text-gray-900 font-medium">ORD-{id.slice(-8).toUpperCase()}</span>
        },
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

  const allOrders = orderResponse?.data || []
  const totalPages = Math.ceil(allOrders.length / itemsPerPage)
  
  // Custom pagination slicing
  const displayedOrders = allOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <>
      <OrderHistoryPresenter 
        data={displayedOrders} 
        columns={columns}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onFilterChange={handleFilterChange}
        currentFilters={{
          paymentStatus: params.paymentStatus,
          orderStatus: params.orderStatus
        }}
      />
      <OrderDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        order={selectedOrder} 
      />
    </>
  )
}

export default OrderHistoryContainer
