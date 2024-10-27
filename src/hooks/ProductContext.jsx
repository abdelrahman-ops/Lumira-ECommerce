/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const addProduct = (product) => {
        setProducts((prevProducts) => [...prevProducts, product]);
    };
    const updateProduct = (updatedProduct) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            )
        );
    };

    const deleteProduct = (productId) => {
        setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct , updateProduct , deleteProduct}}>
            {children}
        </ProductContext.Provider>
    );
};
export const useProducts = () => useContext(ProductContext);