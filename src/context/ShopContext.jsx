/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";  // Import the query hook

// Create Context
const ShopContext = createContext();

// Provider Component
export const ShopProvider = ({ children }) => {
    const { data: products = [], isLoading, error } = useProductsQuery();

    const currency = "$"; // You can modify this based on user settings

    return (
        <ShopContext.Provider value={{ products, currency, isLoading, error }}>
            {children}
        </ShopContext.Provider>
    );
};

// Custom Hook to use Shop Context
export const useShop = () => useContext(ShopContext);
