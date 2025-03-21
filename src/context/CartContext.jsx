/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cartItems from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Calculate total quantity based on cartItems
    const [totalQuantity, setTotalQuantity] = useState(() => {
        return JSON.parse(localStorage.getItem('cartItems') || '[]')
            .reduce((sum, item) => sum + item.quantity, 0);
    });

    // Function to update total quantities
    const updateTotalQuantities = (items) => {
        setTotalQuantity(items.reduce((sum, item) => sum + item.quantity, 0));
    };

    // Save cartItems to localStorage and update totalQuantity when cartItems change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateTotalQuantities(cartItems);
    }, [cartItems]);

    // Add item to cart
    const addToCart = (newItem) => {
        if (!newItem || newItem.quantity <= 0 || !newItem.id || !newItem.size) {
            console.error('Invalid item data:', newItem);
            return;
        }

        setCartItems(prevCart => {
            const existingItem = prevCart.find(item => item.id === newItem.id && item.size === newItem.size);

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === newItem.id && item.size === newItem.size
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                return [...prevCart, newItem];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (itemId, itemSize) => {
        if (!itemId || !itemSize) {
            console.error('Invalid itemId or itemSize:', itemId, itemSize);
            return;
        }

        setCartItems(prevCart => prevCart.filter(item => !(item.id === itemId && item.size === itemSize)));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateTotalQuantities, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook to access CartContext
export const useCart = () => useContext(CartContext);
