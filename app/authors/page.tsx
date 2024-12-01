import LandingLayout from '@/components/layout/LandingLayout';
import { fetcher } from '@/service/fetcher';
import gravatar from 'gravatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AuthorsPage() {
  let authors: any[] = [];

  try {
    authors = (await fetcher('', {}, 'projects/authors')) as unknown as any[];
  } catch (e) {}

  return (
    <LandingLayout>
      <div className={'mx-auto w-full max-w-[1000px] p-8'}>
        <div
          className={
            'text-center text-[24px] font-[700] md:text-[42px] lg:text-[72px]'
          }
        >
          Top Authors
        </div>
        <div className={'mt-2 text-center text-muted-foreground'}>
          Top Students and Alumni on GGPG.
        </div>
        <div
          className={
            'grid grid-cols-1 gap-4 gap-y-8 py-8 md:grid-cols-2 lg:grid-cols-4'
          }
        >
          {authors.map((author) => (
            <div
              className={'overflow-hidden rounded-xl border border-neutral-200'}
              key={author._id}
            >
              <div
                className={'relative aspect-square bg-cover bg-center'}
                style={{
                  backgroundImage: `url('${gravatar.url(author.email, {
                    size: '640px'
                  })}')`
                }}
              >
                <div
                  className={
                    'absolute bottom-0 left-0 right-0 bg-black/40 p-2 text-white'
                  }
                >
                  <div className={'font-bold'}>{author.fullName}</div>
                  <div className={'text-sm text-white/60'}>
                    {author.skills.length === 0
                      ? 'No skills provided'
                      : author.skills.join(', ')}
                  </div>
                </div>
              </div>
              <div className={'p-4 pt-2'}>
                <div className={'flex flex-row items-end justify-between'}>
                  <div className={'text-sm text-muted-foreground'}>
                    {author.projectCount} projects
                  </div>
                  <Link
                    href={`mailto:${author.email}`}
                    className={
                      'rounded-full bg-black px-2 py-1 text-sm text-white'
                    }
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LandingLayout>
  );
}
