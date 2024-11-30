export async function fetchClient<T>(url: string, options: RequestInit = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: defaultHeaders
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.message || 'Something went wrong');
    }

    const responseData: { data: T } = await response.json();
    return responseData.data;
  } catch (error: any) {
    throw new Error(error.message || 'Network Error');
  }
}
