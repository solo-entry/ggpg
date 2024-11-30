import LandingLayout from '@/components/layout/LandingLayout';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export default function page() {
  return (
    <LandingLayout>
      <div className={'p-4 lg:px-10 lg:py-8'}>
        <div className={'flex flex-row gap-2 lg:justify-center lg:px-4'}>
          <div className={'rounded-full border border-neutral-200 px-4 py-1'}>
            Project - 2024
          </div>
          <div className={'rounded-full border border-neutral-200 px-4 py-1'}>
            Technical
          </div>
        </div>
        <div className={'grid grid-cols-1 gap-8 py-4 lg:grid-cols-3'}>
          <div className={'col-span-2 flex flex-row'}>
            <div className={'text-[42px] font-[700] lg:text-[72px]'}>
              The Graduation Project Showcase
            </div>
          </div>
          <div className={'col-span-1 lg:px-4'}>
            <div>
              The Graduation Project Showcase platform is an innovative web and
              mobile application designed to provide a digital space for
              students to showcase their graduation projects across various
              disciplines, including STEM, business, and design.
            </div>
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

        <div className={'grid grid-cols-1 gap-8 py-4 lg:grid-cols-3'}>
          <div className={'col-span-2 hidden flex-row gap-10 lg:flex'}>
            <div className={'w-[300px]'}>
              <div className={'text-[24px] font-[600]'}>
                The Graduation Project Showcase
              </div>
              <div className={'mt-2 text-[#09090B]'}>
                The Graduation Project Showcase platform is an innovative web.
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
                  120 engagement
                </div>
              </div>
              <div className={'mt-8 flex flex-row items-start gap-2'}>
                <div className="rounded-full border border-neutral-200 px-3 py-1 text-sm font-bold">
                  2024
                </div>
                <div className="rounded-full border border-neutral-200 px-3 py-1 text-sm font-bold">
                  Technical
                </div>
                <div className="rounded-full border border-neutral-200 px-3 py-1 text-sm font-bold">
                  Website
                </div>
              </div>
            </div>
            <div
              className={'aspect-video flex-1 rounded-[16px]'}
              style={{
                backgroundImage:
                  'url(https://backiee.com/static/wallpapers/3840x2160/258458.jpg)',
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
                backgroundImage:
                  'url(https://backiee.com/static/wallpapers/3840x2160/258458.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            />
            <div className={'flex flex-1 flex-col justify-between py-4'}>
              <div className={'text-[24px] font-[600]'}>
                The Graduation Project Showcase
              </div>
              <div className={'flex flex-row items-center gap-8'}>
                <div className={'text-neutral-500'}>1/3</div>
                <div className={'flex-1 border-t-2 border-neutral-200'} />
                <div className={'flex flex-row gap-4'}>
                  <div
                    className={
                      'flex h-10 w-10 cursor-pointer rounded-full bg-black text-white'
                    }
                  >
                    <ArrowLeftIcon className={'m-auto h-4 w-4'} />
                  </div>
                  <div
                    className={
                      'flex h-10 w-10 cursor-pointer rounded-full bg-black text-white'
                    }
                  >
                    <ArrowRightIcon className={'m-auto h-4 w-4'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
