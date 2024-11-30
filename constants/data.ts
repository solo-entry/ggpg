import { NavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export interface Agency {
  ID: string;
  tenDangKy: string;
  chuCoSo: string;
  soDienThoai: string;
  diaChi: string;
  mst: string;
  trangThai: string;
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  },

  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: 'target',
    label: 'Projects'
  },
  {
    title: 'Accounts',
    href: '/dashboard/accounts',
    icon: 'profile',
    label: 'Accounts'
  },
  {
    title: 'Comment',
    href: '/dashboard/comments',
    icon: 'comment',
    label: 'Comment'
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: 'settings',
    label: 'Settings'
  }
];
