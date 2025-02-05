import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
    const response = await fetch("https://server-e-commerce-seven.vercel.app/api/products");
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return response.json();
};

export const useProductsQuery = (enabled = true) => {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false, // Prevent unnecessary refetch when switching tabs
        enabled, // 🔥 Controls whether query runs automatically
    });
};
