import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    role: 'admin'
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: 'target',
    label: 'Projects',
    role: 'admin'
  },
  {
    title: 'Accounts',
    href: '/dashboard/accounts',
    icon: 'profile',
    label: 'Accounts',
    role: 'admin'
  },
  {
    title: 'Comment',
    href: '/dashboard/comments',
    icon: 'comment',
    label: 'Comment',
    role: 'admin'
  },
  {
    title: 'Categories',
    href: '/dashboard/categories',
    icon: 'category',
    label: 'Categories',
    role: 'admin'
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'Settings',
    role: '*'
  },
  {
    title: 'Change Password',
    href: '/dashboard/change-password',
    icon: 'lock',
    label: 'Change Password',
    role: '*'
  }
];

export const filterNavItemsByRole = (
  items: NavItem[],
  userRole: string
): NavItem[] => {
  return items.filter((item) => {
    if (item.role === '*') {
      return true; // Universal access
    }
    return item.role === userRole;
  });
};
