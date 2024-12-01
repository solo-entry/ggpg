'use client';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchExplore() {
  const [value, setValue] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const debouncedValue = useDebounce(value, 300);
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams?.toString());
    if (debouncedValue) {
      currentParams.set('search', debouncedValue);
    } else {
      currentParams.delete('search');
    }
    router.replace(`?${currentParams.toString()}`);
  }, [debouncedValue, router, searchParams]);
  return (
    <div
      className={
        'flex flex-row items-center overflow-hidden rounded-full border border-neutral-200 px-2'
      }
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={'w-full bg-white px-4 py-2 text-lg outline-none md:w-[30vw]'}
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
  );
}
