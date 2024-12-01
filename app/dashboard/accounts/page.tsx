import { cookies } from 'next/headers';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';
import { fetcher } from '@/service/fetcher';
import AccountColumns from '@/components/tables/account-tables/account-column';
import { AccountTable } from '@/components/tables/account-tables/account-table';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Comments', link: '/dashboard/comments' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const token = cookies().get('token')?.value || '';
  const data = (await fetcher(
    token,
    { method: 'GET' },
    'admin/users'
  )) as unknown as Author[];
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Account management (${data.length})`}
            description={'Data updated at ' + dayjs().format('DD/MM/YYYY')}
          />
        </div>
        <Separator />
        <AccountTable data={data} columns={AccountColumns} />
      </div>
    </PageContainer>
  );
}
