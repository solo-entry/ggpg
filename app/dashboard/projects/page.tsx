import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { columns } from '@/components/tables/agency-tables/columns';
import { AgencyTable } from '@/components/tables/agency-tables/agency-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Agency } from '@/constants/data';

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
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const query = searchParams.search || null;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const res = await fetch(
    `${apiUrl}/api/mock-data?page=${page}&limit=${pageLimit}`,
    {
      cache: 'no-cache'
    }
  );
  const agencyRes = await res.json();
  const total_rows = agencyRes.total;
  const pageCount = Math.ceil(total_rows / pageLimit);
  const agencies: Agency[] = agencyRes.data;

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Quản lý cơ sở Internet  (${total_rows})`}
            description="Dữ liệu được cập nhật lúc 3:19, 07/09/2024"
          />

          <Link
            href={'/dashboard/employee/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <AgencyTable
          pageNo={page}
          columns={columns}
          total_rows={total_rows}
          data={agencies}
          pageCount={pageCount}
        />
      </div>
    </PageContainer>
  );
}
