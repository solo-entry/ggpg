import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Group, ThumbsUp, User } from 'lucide-react';
import { ProjectTable } from '@/components/tables/project-tables/project-table';
import ProjectColumns from '@/components/tables/project-tables/project-column';
import { cookies } from 'next/headers';
import { fetcher } from '@/service/fetcher';
import { ChatBubbleIcon } from '@radix-ui/react-icons';
import gravatar from 'gravatar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { redirect } from 'next/navigation';

export default async function page() {
  const token = cookies().get('token')?.value || '';
  const role = cookies().get('role')?.value || '';

  if (role === 'user') {
    redirect('/dashboard/settings');
  }
  const data = (await fetcher(
    token,
    { method: 'GET' },
    'admin/dashboard'
  )) as unknown as any;
  console.log(data);
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>
        <div className="grid gap-4 py-4 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <User className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
              <Group className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalProjects}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Comments
              </CardTitle>
              <ChatBubbleIcon className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalComments}</div>
            </CardContent>
          </Card>
        </div>
        <div>
          <p className="mb-2 text-xl font-semibold">Latest project</p>
          <ProjectTable
            withToolbar={false}
            columns={ProjectColumns}
            data={data?.latestProjects || []}
          />
        </div>
        <div className="grid max-w-[1000px] gap-4 pb-4 lg:grid-cols-2">
          <Card className="p-6">
            <div>
              <p className="pb-2 text-lg font-semibold">Recent Comment</p>
            </div>
            <div className="flex flex-col gap-3">
              {(data?.latestComments || []).map((item: any) => (
                <div key={item._id} className="grid grid-cols-2  gap-4 ">
                  <div className="flex flex-row items-center gap-2">
                    <ChatBubbleIcon /> {item.content}
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <img
                      className={'h-8 w-8 rounded-full'}
                      src={gravatar.url(item.author.email)}
                    />
                    <div className="flex flex-col gap-1 text-sm">
                      <p className="font-medium">{item.author.fullName}</p>
                      <p className=" font-medium text-muted-foreground">
                        {item.author.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <div>
              <p className="pb-2 text-lg font-semibold">Top 5 Project</p>
            </div>
            <div className="flex flex-col gap-3">
              {(data?.mostVotedProjects || []).map((item: any) => (
                <div
                  key={item._id}
                  className="flex flex-row items-center justify-between gap-4 "
                >
                  <div className="flex flex-row items-center gap-3">
                    <Avatar className="rounded-lg">
                      <AvatarImage src={item?.media[0]} />
                      <AvatarFallback className="rounded-lg">
                        {item.title[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5 text-sm">
                      <p className="font-medium">{item.title}</p>
                      <p className=" font-medium text-muted-foreground">
                        {item.author.fullName}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-2 text-muted-foreground">
                    {item.likes.length} likes <ThumbsUp size={16} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
