'use client';

import { useToken } from '@/hooks/useLocalStorage';
import { fetcher } from '@/service/fetcher';

export async function FetchClient(url: string, options: RequestInit = {}) {
  // Get token from the custom hook
  const token = useToken();

  if (token) {
    return await fetcher(token, options, url);
  }
}
