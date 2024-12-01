import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/tables/data-table-view-options';
import { X } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  value: string;
  setValue: (value: string) => void;
}

export function CommentToolbar<TData>({
  table,
  value,
  setValue
}: DataTableToolbarProps<TData>) {
  const clearSearch = () => {
    setValue('');
  };
  return (
    <div className="flex items-center justify-between">
      <div className=" flex flex-row items-start gap-2">
        <Input
          placeholder="Search by project..."
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="h-9 w-[150px] lg:w-[250px]"
          endIcon={value ? <X size={16} onClick={clearSearch} /> : ''}
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
