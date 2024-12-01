import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from '@/components/tables/data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function CategoryToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className=" flex flex-row items-start gap-2"></div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
