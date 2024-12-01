import { ReactNode } from 'react';
import LandingHeader from '@/components/layout/LandingLayout/LandingHeader';

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className={'h-full w-full overflow-y-auto bg-white text-black'}>
      <LandingHeader />
      <div className="pt-[90px]">{children}</div>
    </div>
  );
}
