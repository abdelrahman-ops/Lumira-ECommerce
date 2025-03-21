import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/api";

export const useProductsQuery = (enabled = true) => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
        cacheTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes
        refetchOnWindowFocus: false, // Avoid unnecessary refetching
        retry: 2, // Retry failed requests twice before throwing an error
        enabled, // Only fetch when `enabled` is true
    });
};
