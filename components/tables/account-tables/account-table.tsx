'use client';
import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';
import DataTableBody from '@/components/tables/data-table-body';
import { CategoryToolbar } from '@/components/tables/category-tables/category-toolbar';

interface DataTableProps<Category> {
  columns: ColumnDef<Category>[];
  data: Category[];
}

export function AccountTable<Category>({
  columns,
  data
}: DataTableProps<Category>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    manualSorting: true,
    manualFiltering: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });
  return (
    <div className="space-y-4 pb-6">
      <CategoryToolbar table={table} />
      <DataTableBody table={table} columns={columns} />
    </div>
  );
}
