'use client';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function SheetMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <MenuIcon onClick={() => setOpen(true)} />
      <SheetContent withClose={false} className="w-[200px]" side="left">
        <div>
          <p className="mb-2 text-xl font-semibold">Side bar</p>
          <div
            className={'flex flex-col justify-center gap-4 slide-out-to-left'}
          >
            <Link href={'/'}>Home</Link>
            <Link href={'/explore'}>Explore</Link>
            <Link href={'/authors'}>Authors</Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
