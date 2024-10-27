/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);


    const storeData = (receivedData) => {
        // console.log("Setting data in context:", receivedData);
        setData(receivedData);
        localStorage.setItem('userData', JSON.stringify(receivedData));
    };

    const clearData = () => {
        setData(null);
        localStorage.removeItem('userData')
    };
    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://server-e-commerce-seven.vercel.app/api/users/profile', {
                    withCredentials: true,
                });
                storeData(response.data.user);
                // console.log(response, "response from context");
                
            } catch (error) {
                console.error("Error fetching profile data:", error);
                const storedData = localStorage.getItem('userData');
                if (storedData) {
                    setData(JSON.parse(storedData));
                }
            }
        };
    
        fetchUserData();
    }, []);
    

    return (
        <DataContext.Provider value={{storeData , clearData , data }}>
            {children}
        </DataContext.Provider>
    );
};