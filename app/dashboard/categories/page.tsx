import { cookies } from 'next/headers';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import dayjs from 'dayjs';
import { fetcher } from '@/service/fetcher';
import { Category } from '@/types/category';
import { CategoryTable } from '@/components/tables/category-tables/category-table';
import CategoryColumn from '@/components/tables/category-tables/category-column';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Categories', link: '/dashboard/categories' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const token = cookies().get('token')?.value || ''; // Use Next.js cookies API
  const data = (await fetcher(
    token,
    { method: 'GET' },
    'admin/categories'
  )) as unknown as Category[];

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Categories management (${data.length})`}
            description={'Data updated at ' + dayjs().format('DD/MM/YYYY')}
          />

          <Link
            href={'/dashboard/categories/form'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <CategoryTable data={data} columns={CategoryColumn} />
      </div>
    </PageContainer>
  );
}
