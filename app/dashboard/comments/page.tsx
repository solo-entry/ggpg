import { cookies } from 'next/headers';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';
import { fetcher } from '@/service/fetcher';
import { CommentTable } from '@/components/tables/comment-tables/comment-table';
import CommentColumns from '@/components/tables/comment-tables/comment-column';

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
  const search = searchParams?.search || '';
  const token = cookies().get('token')?.value || '';
  const data = (await fetcher(
    token,
    { method: 'GET' },
    'admin/comments' + `${search ? `?search=${search}` : ''}`
  )) as unknown as Comment[];
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Comments management (${data.length})`}
            description={'Data updated at ' + dayjs().format('DD/MM/YYYY')}
          />
        </div>
        <Separator />
        <CommentTable data={data} columns={CommentColumns} />
      </div>
    </PageContainer>
  );
}
