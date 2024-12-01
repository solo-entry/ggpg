'use client';
import { useEffect, useState } from 'react';
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
import { CommentToolbar } from '@/components/tables/comment-tables/comment-toolbar';
import { useDebounce } from '@/hooks/use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';

interface DataTableProps {
  columns: ColumnDef<Comment>[];
  data: Comment[];
}

export function CommentTable({ columns, data }: DataTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 300);

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
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    if (debouncedValue) {
      currentParams.set('search', debouncedValue);
    } else {
      currentParams.delete('search');
    }
    router.replace(`?${currentParams.toString()}`);
  }, [debouncedValue, router, searchParams]);
  return (
    <div className="space-y-4 pb-6">
      <CommentToolbar value={value} setValue={setValue} table={table} />
      <DataTableBody table={table} columns={columns} />
    </div>
  );
}
