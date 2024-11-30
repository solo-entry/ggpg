import LandingLayout from '@/components/layout/LandingLayout';
import { MessageSquareIcon, SearchIcon, ThumbsUpIcon } from 'lucide-react';

function ProjectItem() {
  return (
    <div className={'col-span-1'}>
      <div
        className={'aspect-video rounded-lg'}
        style={{
          backgroundImage:
            'url(https://img.freepik.com/premium-photo/dark-forest-teal-background-with-subtle-g-teal-background-image-teal-blue-green-wallpaper_1020697-726136.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className={'mt-4 flex flex-row justify-between'}>
        <div className={'flex flex-row items-center gap-2'}>
          <div className={'h-8 w-8 rounded-full bg-primary'}></div>
          <div>Micheal</div>
        </div>
        <div className={'flex flex-row gap-4'}>
          <div className={'flex flex-row gap-1'}>
            <ThumbsUpIcon />
            23
          </div>
          <div className={'flex flex-row gap-1'}>
            <MessageSquareIcon />
            23
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Explore() {
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
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
          <ProjectItem />
        </div>
      </div>
    </LandingLayout>
  );
}
