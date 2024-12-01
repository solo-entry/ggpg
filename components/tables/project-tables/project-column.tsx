'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/tables/data-table-column-header';
import dayjs from 'dayjs';
import { Checkbox } from '@/components/ui/checkbox';
import { ProjectCellAction } from '@/components/tables/project-tables/cell-actions';
import { abbreviateString } from '@/lib/utils';
import TagList from '@/components/tags-list';
import { FetchClient } from '@/service/fetch-client';
import { toast } from '@/components/ui/use-toast';

const ProjectColumns: ColumnDef<Project>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className={'line-clamp-1'}>{row.getValue('title')}</div>
    )
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className={'line-clamp-1'}>{row.getValue('description') ?? '-'}</div>
    )
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-row items-center gap-2">
        <TagList tags={row.original.tags} />
      </div>
    )
  },
  {
    accessorKey: 'isFeatured',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => {
      return (
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={row.original.isFeatured}
            onCheckedChange={(value) => {
              (async () => {
                if (!!value) {
                  await FetchClient(
                    `admin/projects/feature/${row.original._id}`,
                    {
                      method: 'PUT'
                    }
                  );
                } else {
                  await FetchClient(
                    `admin/projects/unfeature/${row.original._id}`,
                    {
                      method: 'PUT'
                    }
                  );
                }
                toast({
                  title: 'Update successfully!',
                  description: '',
                  variant: 'success'
                });
                setTimeout(() => {
                  location.reload();
                }, 100);
              })();
            }}
            aria-label="Select all"
          />
        </div>
      );
    }
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
    cell: ({ row }) => <ProjectCellAction data={row} />
  }
];

export default ProjectColumns;
