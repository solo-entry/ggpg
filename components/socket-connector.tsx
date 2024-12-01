'use client';
import { useEffect } from 'react';
import { useToken } from '@/hooks/useLocalStorage';
import { socketService } from '@/service/socket';

export default function SocketConnector() {
  'use client';
  const token = useToken();

  useEffect(() => {
    if (!token) return;
    socketService.connect(token);
  }, [token]);

  return <></>;
}
