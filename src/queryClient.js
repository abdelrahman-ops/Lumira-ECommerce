import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes caching
        cacheTime: 10 * 60 * 1000, // 10 minutes before garbage collection
        refetchOnWindowFocus: false, // Avoid unnecessary refetching
        retry: 2, // Retry failed requests twice
        },
    },
});

export default queryClient;
