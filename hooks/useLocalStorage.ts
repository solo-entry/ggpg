import { useEffect, useState } from 'react';
import { User } from '@/types/auth';

export function useUserInfo(): User {
  const [userInfo, setUserInfo] = useState<null | Record<string, any>>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserInfo(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user info from local storage:', error);
        setUserInfo(null);
      }
    }
  }, []);

  return userInfo as User;
}

export function useToken() {
  const storedToken = localStorage.getItem('token');

  return storedToken || '';
}
