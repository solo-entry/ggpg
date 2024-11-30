import { ReactNode } from 'react';
import LandingHeader from '@/components/layout/LandingLayout/LandingHeader';

interface LandingLayoutProps {
  children: ReactNode;
}

export default function Index({ children }: LandingLayoutProps) {
  return (
    <div className={'h-full w-full overflow-y-auto bg-white text-black'}>
      <LandingHeader />
      {children}
    </div>
  );
}
