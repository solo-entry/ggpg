import { ReactNode } from 'react';
import LandingHeader from '@/components/layout/LandingLayout/LandingHeader';

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className={'h-full w-full overflow-y-auto bg-white text-black'}>
      <LandingHeader />
      <div className={'min-h-[90vh]'}>{children}</div>

      <div className={'flex flex-row justify-between bg-muted p-8'}>
        <div className={'font-black'}>GGPG</div>
        <div className={''}>
          Made by <span className={'font-bold'}>Bui Nhat Minh</span>
        </div>
      </div>
    </div>
  );
}
