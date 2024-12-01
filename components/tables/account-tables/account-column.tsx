'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import dayjs from 'dayjs';
import { Checkbox } from '@/components/ui/checkbox';
import { abbreviateString } from '@/lib/utils';
import { AccountCellAction } from '@/components/tables/account-tables/cell-actions';

const AccountColumns: ColumnDef<Author>[] = [
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
    accessorKey: 'fullName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full name" />
    ),
    cell: ({ row }) => <div>{row.getValue('fullName')}</div>
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div>{row.getValue('email') ?? '-'}</div>
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => <div>{row.getValue('role') ?? '-'}</div>
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
    cell: ({ row }) => <AccountCellAction data={row} />
  }
];

export default AccountColumns;
