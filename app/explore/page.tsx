import LandingLayout from '@/components/layout/LandingLayout';
import { MessageSquareIcon, SearchIcon, ThumbsUpIcon } from 'lucide-react';
import { fetcher } from '@/service/fetcher';
import nookies from 'nookies';
import Link from 'next/link';

function ProjectItem({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project._id}`}
      className={'group col-span-1 cursor-pointer'}
    >
      <div
        className={'relative aspect-video overflow-hidden rounded-lg'}
        style={{
          backgroundImage: `url(${
            project.media?.[0] ??
            'https://www.iqstudentaccommodation.com/sites/default/files/styles/default/public/2018-07/University%20of%20Greenwich_cred.%20University%20of%20Greenwich.jpg?itok=TOr3gLFF'
          })`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div
          className={
            'absolute bottom-0 left-0 right-0 bg-black/40 p-4 transition-all duration-200 group-hover:bg-black/80'
          }
        >
          <div className={'font-bold text-white'}>{project.title}</div>
          <div className={'line-clamp-1 text-sm text-white/50'}>
            {project.description}
          </div>
        </div>
      </div>
      <div className={'mt-4 flex flex-row justify-between'}>
        <div className={'flex flex-row items-center gap-2'}>
          <div className={'h-8 w-8 rounded-full bg-primary'}></div>
          <div>{project.author.fullName}</div>
        </div>
        <div className={'flex flex-row gap-4'}>
          <div className={'flex flex-row gap-1'}>
            <ThumbsUpIcon />
            {project.likes.length}
          </div>
          <div className={'flex flex-row gap-1'}>
            <MessageSquareIcon />
            {project.comments.length}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default async function Explore({ searchParams }: any) {
  const search = searchParams?.search || '';
  const cookies = nookies.get();
  const token = cookies.token || '';
  const data = (await fetcher(
    token,
    { method: 'GET' },
    'projects' + `${search ? `?search=${search}` : ''}`
  )) as unknown as Project[];

  return (
    <LandingLayout>
      <div className={'p-8'}>
        <div
          className={
            'text-center text-[24px] font-[700] md:text-[42px] lg:text-[72px]'
          }
        >
          Discover Outstanding Projects
        </div>
        <div className={'mt-2 text-center text-muted-foreground'}>
          Explore work from the most talented and accomplished developers ready
          to take on your next project
        </div>
        <div
          className={
            'mt-8 flex w-full flex-row items-center justify-center md:w-auto'
          }
        >
          <div
            className={
              'flex flex-row items-center overflow-hidden rounded-full border border-neutral-200 px-2'
            }
          >
            <input
              className={
                'w-full bg-white px-4 py-2 text-lg outline-none md:w-[30vw]'
              }
              placeholder={'Search Project'}
            />
            <div
              className={
                'flex h-8 w-8 flex-row items-center justify-center rounded-full bg-black text-white'
              }
            >
              <SearchIcon className={'h-4 w-4'} />
            </div>
          </div>
        </div>
        <div
          className={
            'grid grid-cols-1 gap-4 gap-y-8 py-8 md:grid-cols-2 lg:grid-cols-4'
          }
        >
          {data.map((project: Project) => {
            return <ProjectItem project={project} />;
          })}
        </div>
      </div>
    </LandingLayout>
  );
}
