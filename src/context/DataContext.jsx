/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { getUser } from "../services/api";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [user, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const storeUserData = (data) => {
        setUserData(data);
        localStorage.setItem("userData", JSON.stringify(data));
    }

    // Initialize from localStorage
    useEffect(() => {
        const loadInitialData = async () => {
        const storedData = localStorage.getItem("userData");
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }
        
        // Optional: Immediately refresh data if token exists
        if (Cookies.get("token")) {
            await fetchUserData();
        }
        };
        
        loadInitialData();
    }, []);

    const fetchUserData = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const userData = await getUser();
        setUserData(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (err) {
        setError("Failed to fetch user data");
        console.error("Fetch error:", err);
        // Clear data if unauthorized
        if (err.response?.status === 401) {
          clearUserData();
        }
      } finally {
        setIsLoading(false);
      }
    }, []);

    const clearUserData = () => {
      setUserData(null);
      localStorage.removeItem("userData");
    };

    // Add data synchronization
  useEffect(() => {
    const syncInterval = setInterval(() => {
      if (Cookies.get("token")) {
        fetchUserData();
      }
    }, 300000); // Sync every 5 minutes

    return () => clearInterval(syncInterval);
  }, [fetchUserData]);

  //   const storeData = (receivedData) => {
  //       setData(receivedData);
  //       localStorage.setItem("userData", JSON.stringify(receivedData));
  //   };

  //   const clearData = () => {
  //       setData(null);
  //       localStorage.removeItem("userData");
  //   };

  // // Function to fetch data only when needed
  // const fetchUserData = async () => {
  //   try {
  //     const token = Cookies.get("token");
  //     if (!token) return; // No token, no need to fetch

  //     const response = await axios.get(
  //       "https://server-e-commerce-seven.vercel.app/api/users/profile",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     storeData(response.data.user);
  //   } catch (error) {
  //     console.error("Error fetching profile data:", error);
  //   }
  // };

  return (
    <DataContext.Provider value={{ user, isLoading, error, fetchUserData, clearUserData , storeUserData}}>
      {children}
    </DataContext.Provider>
  );
};
