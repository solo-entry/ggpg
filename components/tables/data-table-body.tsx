'use client';

import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ColumnDef, flexRender, Table as ITable } from '@tanstack/react-table';
import { DataTablePagination } from '@/components/tables/data-table-pagination';
import { useRouter } from 'next/navigation';

interface DataTableBodyProps<TData, TValue> {
  table: ITable<TData>;
  columns: ColumnDef<TData, TValue>[];
  className?: string;
  route?: string;
  routes?: string[];
  actionPerRow?: (data?: any) => void;
}

export default function DataTableBody<TData, TValue>({
  table,
  className,
  columns,
  route,
  routes,
  actionPerRow
}: DataTableBodyProps<TData, TValue>) {
  const router = useRouter();

  return (
    <div className={cn('space-y-4', className)}>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-background" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={cn('bg-background hover:bg-muted')}
                  onClick={() => {
                    if (route) {
                      router.push(`${route}${(row.original as any)._id}`);
                    }
                    if (routes) {
                      router.push(routes[index]);
                    }
                    if (actionPerRow) {
                      actionPerRow((row.original as any)._id);
                    }
                  }}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
