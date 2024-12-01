export async function fetcher(
  token: string,
  options: RequestInit,
  url: string
): Promise<void> {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: defaultHeaders,
      cache: 'no-cache'
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Something went wrong');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Network Error');
  }
}
