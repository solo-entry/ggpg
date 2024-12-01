'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

export function UserNav({ size = 'base' }: { size?: 'lg' | 'base' }) {
  const router = useRouter();
  const userInfo = useUserInfo();
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/log-out', {
        method: 'GET'
      });
      localStorage.clear();
      console.log(response);
      if (response.ok) {
        router.push('/');
        window.location.reload();
      } else {
        console.error('Failed to log out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (userInfo) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'relative rounded-full',
              size === 'base' ? ' h-8 w-8' : 'h-10 w-10'
            )}
          >
            <Avatar className={cn(size === 'base' ? ' h-8 w-8' : 'h-10 w-10')}>
              <AvatarImage
                src={userInfo?.avatar ?? ''}
                alt={userInfo?.fullName ?? ''}
              />
              <AvatarFallback>{userInfo?.fullName[0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userInfo?.fullName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userInfo?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => router.push('/dashboard/settings')}
            >
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return null;
}
