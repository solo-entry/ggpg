'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import dayjs from 'dayjs';
import { Checkbox } from '@/components/ui/checkbox';
import { abbreviateString } from '@/lib/utils';
import { CommentCellAction } from '@/components/tables/comment-tables/cell-actions';

const CommentColumns: ColumnDef<Comment>[] = [
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
    accessorKey: 'content',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => <div>{row.getValue('content')}</div>
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => <div>{row.original.author.fullName ?? '-'}</div>
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
    cell: ({ row }) => <CommentCellAction data={row} />
  }
];

export default CommentColumns;
