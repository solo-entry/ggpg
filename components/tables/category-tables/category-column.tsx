'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import dayjs from 'dayjs';
import { Checkbox } from '@/components/ui/checkbox';
import { abbreviateString } from '@/lib/utils';
import { CommentCellAction } from '@/components/tables/comment-tables/cell-actions';
import { CategoryCellAction } from '@/components/tables/category-tables/cell-actions';

const CategoryColumns: ColumnDef<Category>[] = [
  {
    accessorKey: '_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{abbreviateString(row.getValue('_id'))}</div>
    ),
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div>{row.getValue('name')}</div>
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <div>{row.getValue('description') ?? '-'}</div>
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => (
      <div>{dayjs(row.getValue('createdAt')).format('DD/MM/YYYY HH:mm')}</div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CategoryCellAction data={row} />
  }
];

export default CategoryColumns;
