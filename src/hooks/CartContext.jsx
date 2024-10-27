/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const updateTotalQuantities = (items) => {
        setCartItems(items); // Save the updated cart items
        const newTotal = items.reduce((sum, item) => sum + item.quantity, 0);
        setTotalQuantity(newTotal);
    };
    

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (storedCartItems) {
            setCartItems(storedCartItems);
            updateTotalQuantities(storedCartItems);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateTotalQuantities(cartItems); // Recalculate the total quantity
    }, [cartItems]);




    const addToCart = (newItem) => {
        if (!newItem || newItem.quantity <= 0 || !newItem.id || !newItem.size) {
            console.error('Invalid item data:', newItem);
            return;
        }
    
        const existingItem = cartItems.find(
            item => item.id === newItem.id && item.size === newItem.size
        );
    
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === newItem.id && item.size === newItem.size
                    ? { ...item, quantity: item.quantity + newItem.quantity }
                    : item
            ));
        } else {
            setCartItems([...cartItems, newItem]);
        }
    };
    

    const removeFromCart = (itemId, itemSize) => {
        if (!itemId || !itemSize) {
            console.error('Invalid itemId or itemSize:', itemId, itemSize);
            return;
        }
    
        const updatedCartItems = cartItems.filter(item => !(item.id === itemId && item.size === itemSize));
        setCartItems(updatedCartItems);
        updateTotalQuantities(updatedCartItems); // Ensure total quantity is updated
    };
    
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart , updateTotalQuantities , totalQuantity}}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to access CartContext
export const useCart = () => useContext(CartContext);
