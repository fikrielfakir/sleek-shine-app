import { QueryClient } from "@tanstack/react-query";

async function throwOnErrorResponse(response: Response) {
  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(body.message || `Request failed with status ${response.status}`);
  }
}

export async function apiRequest(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "same-origin",
  });

  await throwOnErrorResponse(response);
  return response;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(queryKey[0] as string, {
          credentials: "same-origin",
        });
        await throwOnErrorResponse(response);

        if (response.headers.get("content-type")?.includes("application/json")) {
          return await response.json();
        }

        return await response.text();
      },
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
