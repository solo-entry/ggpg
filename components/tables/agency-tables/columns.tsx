'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Agency } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Agency>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'ID',
    header: 'ID'
  },
  {
    accessorKey: 'tenDangKy',
    header: 'Tên đăng ký'
  },
  {
    accessorKey: 'chuCoSo',
    header: 'Chủ cơ sở '
  },
  {
    accessorKey: 'soDienThoai',
    header: 'Số điện thoại'
  },
  {
    accessorKey: 'diaChi',
    header: 'Địa chỉ'
  },
  {
    accessorKey: 'mst',
    header: 'MST'
  },
  {
    accessorKey: 'trangThai',
    header: 'Trạng thái'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
