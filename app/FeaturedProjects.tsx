'use client';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import dayjs from 'dayjs';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = projects[activeIndex];
  const nextProject = projects[activeIndex + 1] ?? activeProject;

  function goNext() {
    setActiveIndex(activeIndex < projects.length - 1 ? activeIndex + 1 : 0);
  }

  function goBack() {
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : projects.length - 1);
  }

  if (!activeProject)
    return (
      <div>
        Please create projects and mark at least one project as featured first.
      </div>
    );

  return (
    <>
      <div className={'p-4 lg:px-10 lg:py-8'}>
        <div className={'flex flex-row gap-2 lg:justify-center lg:px-4'}>
          <div className={'rounded-full border border-neutral-200 px-4 py-1'}>
            Project - {dayjs(activeProject?.createdAt).format('YYYY')}
          </div>
          <div className={'rounded-full border border-neutral-200 px-4 py-1'}>
            {activeProject?.category?.name ?? 'Uncategorized'}
          </div>
        </div>
        <div className={'grid grid-cols-1 gap-8 py-4 lg:grid-cols-3'}>
          <div className={'col-span-2 flex flex-row'}>
            <div className={'text-[42px] font-[700] lg:text-[72px]'}>
              Greenwich Graduation Project Showcase
            </div>
          </div>
          <div className={'col-span-1 lg:px-4'}>
            <div className={'line-clamp-4'}>{activeProject?.description}</div>
            <div className={'flex flex-row items-start gap-2 py-4'}>
              <Link
                className={
                  'flex h-10 items-center rounded-full bg-black px-4 text-white'
                }
                href={'/contact'}
              >
                Contact Us
              </Link>
              <Link
                className={
                  'flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200'
                }
                href={'/about'}
              >
                <ArrowRightIcon className={'h-4 w-4'} />
              </Link>
            </div>
          </div>
        </div>

        <div className={'grid grid-cols-1 gap-10 py-4 lg:grid-cols-3'}>
          <div className={'col-span-2 hidden flex-row gap-10 lg:flex'}>
            <div className={'w-[300px]'}>
              <Link
                href={`/projects/${activeProject._id}`}
                className={
                  'text-[24px] font-[600] transition-all duration-200 hover:text-primary'
                }
              >
                {activeProject?.title}
              </Link>
              <div className={'mt-2 line-clamp-2 text-[#09090B]'}>
                {activeProject?.description}
              </div>
              <div
                className={
                  'mt-8 flex flex-row items-center border-l-2 border-neutral-100 pl-4'
                }
              >
                <img
                  className={'w-10 rounded-full'}
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJaOl3vJfEJpJU4NLddWUUznNoM1LMu_9qAQ&s'
                  }
                  alt={'avatar'}
                />
                <img
                  className={'-ml-4 w-10 rounded-full'}
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJaOl3vJfEJpJU4NLddWUUznNoM1LMu_9qAQ&s'
                  }
                  alt={'avatar'}
                />
                <img
                  className={'-ml-4 w-10 rounded-full'}
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJaOl3vJfEJpJU4NLddWUUznNoM1LMu_9qAQ&s'
                  }
                  alt={'avatar'}
                />
                <div className={'ml-2 text-muted-foreground'}>
                  {activeProject?.likes.length + activeProject?.comments.length}{' '}
                  engagements
                </div>
              </div>
              <div className={'mt-8 flex flex-row items-start gap-2'}>
                <div className="rounded-full border border-neutral-200 px-3 py-1 text-sm font-bold">
                  {dayjs(activeProject?.createdAt).format('YYYY')}
                </div>
                <div className="rounded-full border border-neutral-200 px-3 py-1 text-sm font-bold">
                  {activeProject?.category?.name ?? 'Uncategorized'}
                </div>
                <div className="line-clamp-1 rounded-full border border-neutral-200 px-3 py-1 text-sm font-bold capitalize">
                  {activeProject?.tags[0]}
                </div>
              </div>
            </div>
            <div
              className={'aspect-video flex-1 rounded-[16px]'}
              style={{
                backgroundImage: `url(${
                  activeProject?.media[0] ??
                  'https://www.iqstudentaccommodation.com/sites/default/files/styles/default/public/2018-07/University%20of%20Greenwich_cred.%20University%20of%20Greenwich.jpg?itok=TOr3gLFF'
                })`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
          </div>
          <div className={'col-span-1 flex flex-col'}>
            <div
              className={'aspect-[2] w-full rounded-[16px]'}
              style={{
                backgroundImage: `url(${
                  nextProject?.media[0] ??
                  'https://www.iqstudentaccommodation.com/sites/default/files/styles/default/public/2018-07/University%20of%20Greenwich_cred.%20University%20of%20Greenwich.jpg?itok=TOr3gLFF'
                })`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className={'flex flex-1 flex-col justify-between py-4'}>
              <div className={'text-[24px] font-[600]'}>
                {nextProject.title}
              </div>
              <div className={'flex flex-row items-center gap-8'}>
                <div className={'text-neutral-500'}>
                  {activeIndex + 1}/{projects.length}
                </div>
                <div className={'flex-1 border-t-2 border-neutral-200'} />
                <div className={'flex flex-row gap-4'}>
                  <div
                    className={
                      'flex h-10 w-10 cursor-pointer rounded-full bg-black text-white'
                    }
                    onClick={goBack}
                  >
                    <ArrowLeftIcon className={'m-auto h-4 w-4'} />
                  </div>
                  <div
                    className={
                      'flex h-10 w-10 cursor-pointer rounded-full bg-black text-white'
                    }
                    onClick={goNext}
                  >
                    <ArrowRightIcon className={'m-auto h-4 w-4'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
