'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Row } from '@tanstack/table-core';
import { FetchClient } from '@/service/fetch-client';
import { toast } from '@/components/ui/use-toast';

interface CellActionProps {
  data: Row<Project>;
}

export const ProjectCellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [action, setAction] = useState(
    data.original?.isFeatured ? 'feature' : 'unfeature'
  );
  const onConfirm = async () => {
    await FetchClient(`projects/${data.original._id}`, {
      method: 'DELETE'
    });
    toast({
      title: 'Delete successfully',
      description: '',
      variant: 'success'
    });
    router.refresh();
    setOpen(false);
  };
  const updateFeature = (feature: string) => {
    (async () => {
      if (feature === 'feature') {
        await FetchClient(`admin/projects/feature/${data.original._id}`, {
          method: 'PUT'
        });
      }
      if (feature === 'unfeature') {
        await FetchClient(`admin/projects/unfeature/${data.original._id}`, {
          method: 'PUT'
        });
      }
      toast({
        title: 'Update successfully!',
        description: '',
        variant: 'success'
      });
    })();
  };
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/projects/form?id=${data.original._id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Actions</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={action}
                  onValueChange={(value) => {
                    updateFeature(value);
                    setAction(value);
                  }}
                >
                  <DropdownMenuRadioItem value="feature">
                    Feature
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="unfeature">
                    Unfeature
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
