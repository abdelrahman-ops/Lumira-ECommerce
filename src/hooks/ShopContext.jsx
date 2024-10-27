/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
// import { products } from "../assets/frontend_assets/assets";
import { products } from "../assets/frontend_assets/assets";
const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [shop , setShop] = useState([]);
    const currency = "$";
    
    setShop(products)
    
    return (
        <ShopContext.Provider value={{ shop, setShop , currency}}>
            {children}
        </ShopContext.Provider>
    );

};
export const useShop = () => useContext(ShopContext);