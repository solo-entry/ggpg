import LandingLayout from '@/components/layout/LandingLayout';
import { fetcher } from '@/service/fetcher';
import NotFound from '@/app/not-found';
import dayjs from 'dayjs';
import Link from 'next/link';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import gravatar from 'gravatar';
import CommentSection from '@/app/projects/[projectId]/CommentSection';
import { cookies } from 'next/headers';
import LikeButton from '@/app/projects/[projectId]/like-button';
import ProjectDocumentSection from '@/app/projects/[projectId]/ProjectDocument';

export default async function ProjectPage({ params }: any) {
  const token = cookies().get('token')?.value || '';
  let project: Project;
  try {
    const [projectData] = await Promise.all([
      fetcher(token, { method: 'GET' }, `projects/${params.projectId}`)
    ]);

    project = projectData as unknown as Project;
  } catch (e) {
    console.log(e);
    return <NotFound />;
  }

  return (
    <LandingLayout>
      <div className={'mx-auto w-full max-w-[1200px] p-8 pb-20'}>
        <div className={'text-[36px] font-[800]'}>{project.title}</div>
        <div className={'flex flex-row items-center justify-between'}>
          <div className={'flex flex-row items-center'}>
            <img
              className={'mr-4 h-12 w-12 rounded-full'}
              src={
                'https://innostudio.de/fileuploader/images/default-avatar.png'
              }
              alt={'user'}
            />
            <div className={'my-4'}>
              <div>{project.author.fullName}</div>
              <div className={'text-sm text-neutral-500'}>
                Posted on {dayjs(project.createdAt).format('DD MMM, YYYY')}
              </div>
            </div>
          </div>
          <Link
            href={`mailto:${project.author.email}`}
            className={'rounded-full bg-black px-4 py-2 text-white'}
          >
            Get in touch
          </Link>
        </div>
        <div className={''}>
          <div
            className={'aspect-video rounded-xl bg-cover bg-center'}
            style={{
              backgroundImage: `url('${
                project.media[0] ??
                'https://www.iqstudentaccommodation.com/sites/default/files/styles/default/public/2018-07/University%20of%20Greenwich_cred.%20University%20of%20Greenwich.jpg?itok=TOr3gLFF'
              }')`
            }}
          />
        </div>

        <div className={'mt-4 min-h-[30vh] whitespace-pre-wrap pb-[64px]'}>
          {project.description}
        </div>

        <ProjectDocumentSection project={project} />

        <div className={'flex flex-col justify-between bg-neutral-100 p-8'}>
          <div className={'mx-auto mb-4'}>
            {project && <LikeButton project={project} />}
          </div>
          <div className={'text-center text-xl font-bold'}>
            {project.tags.filter((_, i) => i < 3).join(', ')}
            {project.tags.length > 3
              ? `, and ${project.tags.length - 3} more`
              : ''}
          </div>
          <div
            className={
              'mt-4 flex flex-row items-center justify-center gap-2 font-bold text-neutral-500'
            }
          >
            <ThumbsUpIcon className={'h-4 w-4 text-neutral-500'} />
            <span>{project.likes.length}</span>

            <MessageSquareIcon className={'h-4 w-4 text-neutral-500'} />
            <span>{project.comments.length}</span>
          </div>
        </div>

        <div className={'mt-4 grid grid-cols-3 gap-4'}>
          <div className={'col-span-2'}>
            <CommentSection project={project} />
          </div>
          <div className={'col-span-1'}>
            <div className={'rounded-lg border-2 border-neutral-200 p-4'}>
              <div className={'text-neutral-500'}>Author</div>
              <div className={'mt-4 flex flex-row items-center gap-4'}>
                <img
                  className={'h-12 w-12 rounded-full'}
                  src={gravatar.url(project.author.email)}
                  alt={project.author.fullName}
                />
                <div className={'flex-1'}>
                  <div className={'font-semibold'}>
                    {project.author.fullName}
                  </div>
                  <div className={'text-sm text-neutral-500'}>
                    Posted on {dayjs(project.createdAt).format('DD MMM, YYYY')}
                  </div>
                </div>
              </div>
            </div>

            <div className={'mt-4 rounded-lg border-2 border-neutral-200 p-4'}>
              <div className={'text-neutral-500'}>Tags & Categories</div>
              <div className={'mt-2 flex flex-row flex-wrap gap-2'}>
                {[project.category?.name, ...project.tags]
                  .filter((x) => !!x)
                  .map((tag) => (
                    <div
                      key={tag}
                      className={
                        'rounded-full border border-neutral-200 px-2 py-1 text-sm'
                      }
                    >
                      {tag}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
