import { createContext, useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { getUser, updateUser } from "../services/api";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [user, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const isAuthenticated = !!Cookies.get("token");
    // console.log(isAuthenticated);
    

    const storeUserData = (data) => {
        if (data) {  // Only store if data exists
            setUserData(data);
            localStorage.setItem("userData", JSON.stringify(data));
        }
    };

    const fetchUserData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const userData = await getUser();
            storeUserData(userData?.user || userData); // Handle both response formats
        } catch (err) {
            setError("Failed to fetch user data");
            console.error("Fetch error:", err);
            if (err.response?.status === 401) {
                logout();
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateUserData = useCallback(async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedUser = await updateUser(formData);
            storeUserData(updatedUser?.user || updatedUser);
            return { success: true, data: updatedUser };
        } catch (err) {
            console.error("Update error:", err);
            setError("Failed to update user data");
            return { success: false, error: err };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("userData");
        localStorage.removeItem("cartItems");
        setUserData(null);
    };

    const login = (token) => {
        Cookies.set("token", token, { 
            expires: 7, 
            sameSite: 'strict'
        });
        fetchUserData();
    };

    useEffect(() => {
        try {
            const stored = localStorage.getItem("userData");
            if (stored) {
                const parsedData = JSON.parse(stored);
                if (parsedData) {  // Only set if parsedData is valid
                    setUserData(parsedData);
                }
            }
        } catch (e) {
            console.error("Failed to parse userData from localStorage:", e);
            localStorage.removeItem("userData");
        }

        if (Cookies.get("token")) {
            fetchUserData();
        }
    }, [fetchUserData]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Cookies.get("token")) fetchUserData();
        }, 300000);
        return () => clearInterval(interval);
    }, [fetchUserData]);

    return (
        <DataContext.Provider value={{
            user,
            setUserData,
            isLoading,
            error,
            isAuthenticated,
            login,
            logout,
            fetchUserData,
            storeUserData,
            updateUserData,
        }}>
            {children}
        </DataContext.Provider>
    );
};