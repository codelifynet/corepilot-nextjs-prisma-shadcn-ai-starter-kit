"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface QueryProviderProps {
	children: React.ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000, // 1 minute
						gcTime: 10 * 60 * 1000, // 10 minutes
						retry: (failureCount, error: unknown) => {
							// Don't retry on 4xx errors
							if ((error as any)?.status >= 400 && (error as any)?.status < 500) {
								return false;
							}
							return failureCount < 3;
						},
						refetchOnWindowFocus: false,
					},
					mutations: {
						retry: false,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
