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
import { ProjectToolbar } from '@/components/tables/project-tables/project-toolbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';

interface DataTableProps<Project> {
  columns: ColumnDef<Project>[];
  data: Project[];
  withToolbar?: boolean;
}

export function ProjectTable<Project>({
  columns,
  data,
  withToolbar = true
}: DataTableProps<Project>) {
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
  const router = useRouter();

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
      {withToolbar && (
        <ProjectToolbar table={table} value={value} setValue={setValue} />
      )}
      <DataTableBody
        actionPerRow={(projectId) => {
          router.push(`/dashboard/projects/form?id=${projectId}`);
        }}
        table={table}
        columns={columns}
      />
    </div>
  );
}
