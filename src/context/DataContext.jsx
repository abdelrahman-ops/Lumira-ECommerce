/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Load from localStorage on first render
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const storeData = (receivedData) => {
    setData(receivedData);
    localStorage.setItem("userData", JSON.stringify(receivedData));
  };

  const clearData = () => {
    setData(null);
    localStorage.removeItem("userData");
  };

  // Function to fetch data only when needed
  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return; // No token, no need to fetch

      const response = await axios.get(
        "https://server-e-commerce-seven.vercel.app/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      storeData(response.data.user);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  return (
    <DataContext.Provider value={{ storeData, clearData, data, fetchUserData }}>
      {children}
    </DataContext.Provider>
  );
};
