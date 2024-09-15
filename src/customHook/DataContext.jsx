/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';


const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState(null);


    const storeData = (receivedData) => {
        // console.log("Setting data in context:", receivedData);
        setData(receivedData);
        // localStorage.setItem('userData', JSON.stringify(receivedData));
    };

    const clearData = () => {
        setData(null);
        localStorage.removeItem('userData')
    };

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setData(JSON.parse(storedData));  // Set data from localStorage on page load
        }
    }, []);

    return (
        <DataContext.Provider value={{storeData , clearData , data }}>
            {children}
        </DataContext.Provider>
    );
};