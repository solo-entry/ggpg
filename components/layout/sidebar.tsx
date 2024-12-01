'use client';
import React from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { filterNavItemsByRole, navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/assets/logo.png';
import { useUserInfo } from '@/hooks/useLocalStorage';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };
  const user = useUserInfo();
  const filteredNavItems = filterNavItemsByRole(navItems, user?.role);
  return (
    <aside
      className={cn(
        `relative  hidden h-screen flex-none border-r bg-muted/20 transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className={cn('hidden lg:block', !isMinimized ? ' px-5' : 'px-2')}>
        <Link href={'/'} className="flex justify-center pt-3">
          {!isMinimized ? (
            <Image src={Logo} width={100} alt="logo" />
          ) : (
            <Image src={Logo} width={60} height={60} alt="logo" />
          )}
        </Link>
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-2">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={filteredNavItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
