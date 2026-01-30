/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { OrderList } from "@/lib/types/order"



interface OrderHistoryPresenterProps {
  data: OrderList
  columns: any[]
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  onFilterChange: (filter: { paymentStatus?: string; orderStatus?: string }) => void
  currentFilters: { paymentStatus?: string; orderStatus?: string }
}

const OrderHistoryPresenter = ({ 
  data, 
  columns, 
  totalPages, 
  currentPage, 
  onPageChange, 
  onFilterChange,
  currentFilters 
}: OrderHistoryPresenterProps) => {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel removed for server-side pagination
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  })

  return (
    <div className="flex-1 bg-white rounded-lg border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 text-sm mt-1">Manage your personal information and profile details.</p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {[
              { label: "Unpaid", value: "unpaid", color: "text-red-500" },
              { label: "Paid", value: "paid", color: "text-teal-600" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => onFilterChange({ 
                  paymentStatus: currentFilters.paymentStatus === filter.value ? undefined : filter.value 
                })}
                className={`text-xs font-medium px-3 py-1 rounded transition-colors ${
                  currentFilters.paymentStatus === filter.value ? `${filter.color} bg-gray-100` : `${filter.color} hover:bg-gray-50`
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-200 hover:bg-gray-50">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-700 font-semibold text-xs uppercase tracking-wider px-6 py-3 text-left"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort() ? "cursor-pointer select-none flex items-center gap-2" : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-gray-600 text-sm font-medium">
          Showing <span className="text-gray-900">{data.length}</span> orders on page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
        </p>
        
        <div className="flex items-center gap-1">
          {/* Previous Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="hover:bg-gray-100 text-gray-700 h-9 w-9 p-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show logic (e.g., first, last, and around current)
              if (
                totalPages <= 7 ||
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onPageChange(page)}
                    className={`h-9 w-9 p-0 text-sm rounded-md transition-all duration-200 ${
                      currentPage === page 
                        ? "bg-[#086646] text-white hover:bg-[#06553a] shadow-sm transform scale-105" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {page}
                  </Button>
                )
              } else if (
                (page === 2 && currentPage > 4) ||
                (page === totalPages - 1 && currentPage < totalPages - 3)
              ) {
                return (
                  <span key={page} className="px-2 text-gray-400">
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>

          {/* Next Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="hover:bg-gray-100 text-gray-700 h-9 w-9 p-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default OrderHistoryPresenter
