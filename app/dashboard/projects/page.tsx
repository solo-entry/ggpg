import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { ProjectTable } from '@/components/tables/project-tables/project-table';
import ProjectColumns from '@/components/tables/project-tables/project-column';
import dayjs from 'dayjs';
import { fetcher } from '@/service/fetcher';
import { cookies } from 'next/headers';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Projects', link: '/dashboard/projects' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const search = searchParams?.search || '';
  const token = cookies().get('token')?.value || '';
  const data = (await fetcher(
    token,
    { method: 'GET' },
    'projects' + `${search ? `?search=${search}` : ''}`
  )) as unknown as Project[];
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Projects management (${data.length})`}
            description={'Data updated at ' + dayjs().format('DD/MM/YYYY')}
          />
          <Link
            href={'/dashboard/projects/form'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ProjectTable data={data} columns={ProjectColumns} />
      </div>
    </PageContainer>
  );
}
