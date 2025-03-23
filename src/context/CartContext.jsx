import { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { fetchUserCart, transferGuestCartToUser, removeFromUserCart, addToUserCart , updateCartItem , clearUserCart} from '../services/api';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cartItems from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        try {
            // Ensure storedCart is a valid JSON array
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Error parsing cartItems from localStorage:', error);
            return []; // Default to an empty array if parsing fails
        }
    });

    // Calculate total quantity based on cartItems
    const [totalQuantity, setTotalQuantity] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        try {
            // Ensure storedCart is a valid JSON array
            const parsedCart = storedCart ? JSON.parse(storedCart) : [];
            return Array.isArray(parsedCart) ? parsedCart.reduce((sum, item) => sum + item.quantity, 0) : 0;
        } catch (error) {
            console.error('Error parsing cartItems for totalQuantity:', error);
            return 0; // Default to 0 if parsing fails
        }
    });

    const token = Cookies.get('token');

    // Function to update total quantities
    const updateTotalQuantities = (items) => {
        if (!Array.isArray(items)) {
            console.error('Expected items to be an array, received:', items);
            return;
        }
        const newTotalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
        setTotalQuantity(newTotalQuantity);
    };

    // Save cartItems to localStorage and update totalQuantity when cartItems change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateTotalQuantities(cartItems); // Ensure cartItems is always an array
    }, [cartItems]);

    // Fetch user cart from the server when the user logs in
    useEffect(() => {
        if (token) {
            const fetchCart = async () => {
                try {
                    const userCart = await fetchUserCart(token);
                    // Ensure userCart.products is an array and use it as cartItems
                    if (userCart && Array.isArray(userCart.products)) {
                        setCartItems(userCart.products);
                    } else {
                        console.error('Invalid cart structure:', userCart);
                        setCartItems([]); // Fallback to an empty array
                    }
                } catch (error) {
                    console.error('Error fetching user cart:', error);
                }
            };
            fetchCart();
        }
    }, [token]);

    // Add item to cart (works for both guest and logged-in users)
    const addToCart = async (newItem) => {
        if (!newItem || newItem.quantity <= 0 || !newItem.productId || !newItem.size) {
            console.error('Invalid item data:', newItem);
            return;
        }
    
        try {
            if (token) {
                // Call the API to add the item to the backend
                await addToUserCart(newItem, token);
            }
    
            // Update the local state
            setCartItems((prevCart) => {
                const existingItem = prevCart.find(item => item.productId === newItem.productId && item.size === newItem.size);
    
                if (existingItem) {
                    return prevCart.map(item =>
                        item.productId === newItem.productId && item.size === newItem.size
                            ? { ...item, quantity: item.quantity + newItem.quantity }
                            : item
                    );
                } else {
                    return [...prevCart, newItem];
                }
            });
    
            toast.success(`${newItem.name} (Size: ${newItem.size}) added to cart!`);
        } catch (error) {
            console.error('Error adding item to cart:', error);
            toast.error("Failed to add item to cart. Please try again.");
        }
    };

    // Remove item from cart
    const removeFromCart = async (productId, itemSize) => {
        if (!productId || !itemSize) {
            console.error('Invalid productId or itemSize:', productId, itemSize);
            return;
        }

        try {
            if (token) {
                // Call the API to remove the item from the server
                await removeFromUserCart(productId, itemSize, token);
            }

            // Update the local state
            setCartItems((prevCart) => prevCart.filter(item => !(item.productId === productId && item.size === itemSize)));
            // toast.success("Item removed from cart successfully!");
        } catch (error) {
            console.error('Error removing item from cart:', error);
            toast.error("Failed to remove item from cart. Please try again.");
        }
    };

    // Update item quantity in cart
    const updateCart = async (productId, itemSize, newQuantity) => {
        if (!productId || !itemSize || newQuantity <= 0) {
            console.error('Invalid productId, itemSize, or quantity:', productId, itemSize, newQuantity);
            return;
        }

        try {
            if (token) {
                // Call the API to update the quantity on the backend
                await updateCartItem({ productId, size: itemSize, quantity: newQuantity }, token);
            }

            // Update the local state
            setCartItems((prevCart) =>
                prevCart.map(item =>
                    item.productId === productId && item.size === itemSize
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );

            toast.success("Quantity updated successfully!");
        } catch (error) {
            console.error('Error updating item quantity:', error);
            toast.error("Failed to update quantity. Please try again.");
        }
    };

    // Transfer guest cart to user cart upon login
    const transferCart = async () => {
        if (token) {
            const guestCart = JSON.parse(localStorage.getItem('cartItems')) || [];
            if (guestCart.length > 0) {
                try {
                    await transferGuestCartToUser(guestCart, token); // Transfer guest cart to server
                    localStorage.removeItem('cartItems'); // Clear guest cart after transfer
                    const userCart = await fetchUserCart(token); // Fetch updated user cart
                    setCartItems(userCart.products); // Set cartItems to the merged cart
                } catch (error) {
                    console.error('Error transferring guest cart:', error);
                }
            }
        }
    };


    // Clear the entire cart
    const clearCart = async () => {
        try {
            if (token) {
                // Call the API to clear the cart on the backend
                await clearUserCart(token);
            }

            // Update the local state
            setCartItems([]);
            toast.success("Cart cleared successfully!");
        } catch (error) {
            console.error('Error clearing cart:', error);
            toast.error("Failed to clear cart. Please try again.");
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateCart,
                totalQuantity,
                transferCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Hook to access CartContext
export const useCart = () => useContext(CartContext);