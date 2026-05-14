/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { OrderList } from '@/lib/types/order';
import Pagination from '../../wishlist/common/Pagination';

interface OrderHistoryPresenterProps {
  data: OrderList;
  columns: any[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filter: { paymentStatus?: string; orderStatus?: string }) => void;
  currentFilters: { paymentStatus?: string; orderStatus?: string };
}

const OrderHistoryPresenter = ({
  data,
  columns,
  totalPages,
  currentPage,
  onPageChange,
  onFilterChange,
  currentFilters,
}: OrderHistoryPresenterProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [open, setOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const filters = [
    { label: 'All', value: undefined, color: 'text-gray-600' },
    { label: 'Unpaid', value: 'unpaid', color: 'text-red-500' },
    { label: 'Paid', value: 'paid', color: 'text-teal-600' },
  ];

  return (
    <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your order history and view order details.
          </p>
        </div>

        {/* Filters */}
        <div className="relative inline-block text-left">
          {/* Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between gap-3 px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors min-w-[140px]"
          >
            <span className="text-gray-700 font-medium">
              {filters.find((f) => f.value === currentFilters.paymentStatus)?.label || 'All Status'}
            </span>

            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {open && (
            <>
              {/* overlay */}
              <div className="fixed inset-0" onClick={() => setOpen(false)} />

              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg overflow-hidden z-50">
                {filters.map((filter) => {
                  const active = currentFilters.paymentStatus === filter.value;

                  return (
                    <button
                      key={filter.label}
                      onClick={() => {
                        onFilterChange({
                          paymentStatus: filter.value,
                        });
                        setOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        active
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className={active ? filter.color : ''}>{filter.label}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-600 font-semibold text-xs uppercase tracking-wider px-6 py-3"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-2'
                            : ''
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  <div className="text-gray-400 text-sm">No orders found.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default OrderHistoryPresenter;
