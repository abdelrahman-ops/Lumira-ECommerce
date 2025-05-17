/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import { 
    fetchUserCart, 
    transferGuestCartToUser, 
    removeFromUserCart, 
    addToUserCart, 
    updateCartItem, 
    clearUserCart 
} from '../services/api';
import { toast } from 'react-hot-toast';
import { debounce } from 'lodash';
import { MESSAGES } from '../components/constant/messages';

// Configuration
const CART_CONFIG = {
    maxQuantity: 100,
    guestCartKey: 'cartItems',
    debounceTime: 500,
    maxPrice: 100000
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartState, setCartState] = useState({
        items: [],
        totalQuantity: 0,
        subtotal: 0,
        isLoading: false,
        isCartLoaded: false,
        error: null
    });
    
    const token = Cookies.get('token');

    // Helper Functions
    const getGuestCart = useCallback(() => {
        try {
            const storedCart = localStorage.getItem(CART_CONFIG.guestCartKey);
            if (!storedCart) return [];
            
            const parsed = JSON.parse(storedCart);
            if (!Array.isArray(parsed)) return [];
            
            return parsed.filter(item => 
                item?.product?._id && 
                item?.size && 
                Number.isInteger(item?.quantity) && 
                item.quantity > 0
            );
        } catch (error) {
            console.error('Error parsing guest cart:', error);
            return [];
        }
    }, []);

    const saveGuestCart = useCallback((items) => {
        try {
            localStorage.setItem(CART_CONFIG.guestCartKey, JSON.stringify(items));
        } catch (error) {
            console.error('Error saving guest cart:', error);
        }
    }, []);

    const calculateTotals = useCallback((items) => {
        const totals = items.reduce((acc, item) => {
            const price = item.product?.price || 0;
            const quantity = item.quantity || 0;
            
            return {
                totalQuantity: acc.totalQuantity + quantity,
                subtotal: acc.subtotal + (price * quantity)
            };
        }, { totalQuantity: 0, subtotal: 0 });
        
        return {
            totalQuantity: totals.totalQuantity,
            subtotal: parseFloat(totals.subtotal.toFixed(2)) // Ensure 2 decimal places
        };
    }, []);

    const validateCartItem = (item) => {
        if (!item || !item.product || !item.size || !item.quantity) {
            throw new Error(MESSAGES.errors.validation.invalidItem);
        }
        
        if (item.quantity <= 0 || item.quantity > CART_CONFIG.maxQuantity) {
            throw new Error(MESSAGES.errors.validation.maxQuantity);
        }
        
        if (item.product.price > CART_CONFIG.maxPrice) {
            throw new Error(MESSAGES.errors.validation.maxPrice);
        }
    };

    // Core Cart Operations
    const loadCart = useCallback(async () => {
        setCartState(prev => ({ ...prev, isLoading: true, error: null }));
        
        try {
            if (!token) {
                const guestCart = getGuestCart();
                const { totalQuantity, subtotal } = calculateTotals(guestCart);
                
                setCartState({
                    items: guestCart,
                    totalQuantity,
                    subtotal,
                    isLoading: false,
                    isCartLoaded: true,
                    error: null
                });
                return;
            }

            const { cart } = await fetchUserCart();
            if (cart?.items) {
                const validItems = Array.isArray(cart.items) ? cart.items : [];
                const { totalQuantity, subtotal } = calculateTotals(validItems);
                
                setCartState({
                    items: validItems,
                    totalQuantity,
                    subtotal,
                    isLoading: false,
                    isCartLoaded: true,
                    error: null
                });
            }
        } catch (error) {
            console.error('Error loading cart:', error);
            setCartState(prev => ({
                ...prev,
                isLoading: false,
                error: error.message || MESSAGES.errors.load
            }));
            toast.error(MESSAGES.errors.load);
        }
    }, [token, getGuestCart, calculateTotals]);

    const addToCart = useCallback(async (item) => {
        try {
            validateCartItem(item);
            setCartState(prev => ({ ...prev, isLoading: true, error: null }));

            const sanitizedItem = {
                ...item,
                quantity: Math.max(1, Math.min(CART_CONFIG.maxQuantity, item.quantity))
            };

            const cartItem = {
                productId: item.product._id, // Most backends expect just the ID
                size: item.size,
                quantity: item.quantity
            };

            if (token) {
                await addToUserCart(cartItem);
                await loadCart();
            } else {
                setCartState(prev => {
                    const existingIndex = prev.items.findIndex(
                        i => i.product._id === sanitizedItem.product._id && 
                            i.size === sanitizedItem.size
                    );
                    
                    const updatedItems = existingIndex >= 0
                        ? prev.items.map((item, idx) => 
                            idx === existingIndex 
                                ? { ...item, quantity: item.quantity + sanitizedItem.quantity }
                                : item
                        )
                        : [...prev.items, sanitizedItem];

                    const { totalQuantity, subtotal } = calculateTotals(updatedItems);
                    
                    return {
                        ...prev,
                        items: updatedItems,
                        totalQuantity,
                        subtotal,
                        isLoading: false
                    };
                });
            }

            toast.success(`${sanitizedItem.product.name} ${MESSAGES.success.add}`);
        } catch (error) {
            console.error('Add to cart error:', error);
            setCartState(prev => ({ ...prev, isLoading: false, error: error.message }));
            toast.error(error.message || MESSAGES.errors.add);
            throw error;
        }
    }, [token, loadCart, calculateTotals]);

    const removeFromCart = useCallback(async (productId, size) => {
        try {
            setCartState(prev => ({ ...prev, isLoading: true, error: null }));
            
            if (token) {
                await removeFromUserCart(productId, size);
                await loadCart();
            } else {
                setCartState(prev => {
                    const updatedItems = prev.items.filter(
                        item => !(item.product._id === productId && item.size === size)
                    );
                    const { totalQuantity, subtotal } = calculateTotals(updatedItems);
                    return {
                        ...prev,
                        items: updatedItems,
                        totalQuantity,
                        subtotal,
                        isLoading: false
                    };
                });
            }
            
            toast.success(MESSAGES.success.remove);
        } catch (error) {
            console.error('Remove from cart error:', error);
            setCartState(prev => ({ ...prev, isLoading: false, error: error.message }));
            toast.error(MESSAGES.errors.remove);
            throw error;
        }
    }, [token, loadCart, calculateTotals]);

    const updateCart = useCallback(async (productId, size, quantity) => {
        try {
            if (quantity <= 0) {
                await removeFromCart(productId, size);
                return;
            }

            const sanitizedQuantity = Math.max(1, Math.min(CART_CONFIG.maxQuantity, quantity));
            
            setCartState(prev => ({ ...prev, isLoading: true, error: null }));
            
            if (token) {
                await updateCartItem(productId, size, sanitizedQuantity);
                await loadCart();
            } else {
                setCartState(prev => {
                    const updatedItems = prev.items.map(item =>
                        item.product._id === productId && item.size === size
                            ? { ...item, quantity: sanitizedQuantity }
                            : item
                    );
                    const { totalQuantity, subtotal } = calculateTotals(updatedItems);
                    return {
                        ...prev,
                        items: updatedItems,
                        totalQuantity,
                        subtotal,
                        isLoading: false
                    };
                });
            }
            
            toast.success(MESSAGES.success.update);
        } catch (error) {
            console.error('Update cart error:', error);
            setCartState(prev => ({ ...prev, isLoading: false, error: error.message }));
            toast.error(MESSAGES.errors.update);
            throw error;
        }
    }, [token, removeFromCart, loadCart, calculateTotals]);

    const clearCart = useCallback(async () => {
        try {
            setCartState(prev => ({ ...prev, isLoading: true, error: null }));
            
            if (token) {
                await clearUserCart();
            }
            
            setCartState({
                items: [],
                totalQuantity: 0,
                subtotal: 0,
                isLoading: false,
                isCartLoaded: true,
                error: null
            });
            
            if (!token) {
                localStorage.removeItem(CART_CONFIG.guestCartKey);
            }
            
            toast.success(MESSAGES.success.clear);
        } catch (error) {
            console.error('Clear cart error:', error);
            setCartState(prev => ({ ...prev, isLoading: false, error: error.message }));
            toast.error(MESSAGES.errors.clear);
            throw error;
        }
    }, [token]);

    const transferCart = useCallback(async () => {
        if (!token) return;
        
        try {
            setCartState(prev => ({ ...prev, isLoading: true, error: null }));
            const guestCart = getGuestCart();
            
            if (guestCart.length > 0) {
                await transferGuestCartToUser(guestCart);
                localStorage.removeItem(CART_CONFIG.guestCartKey);
                await loadCart();
                toast.success(MESSAGES.success.transfer);
            }
        } catch (error) {
            console.error('Transfer cart error:', error);
            setCartState(prev => ({ ...prev, isLoading: false, error: error.message }));
            toast.error(MESSAGES.errors.transfer);
            throw error;
        }
    }, [token, getGuestCart, loadCart]);

    // Optimizations
    const debouncedUpdateCart = useMemo(
        () => debounce(updateCart, CART_CONFIG.debounceTime),
        [updateCart]
    );

    // Effects
    useEffect(() => {
        loadCart();
    }, [token, loadCart]);

    useEffect(() => {
        if (!token && cartState.items.length > 0) {
            saveGuestCart(cartState.items);
        }
    }, [cartState.items, token, saveGuestCart]);

    useEffect(() => {
        return () => {
            debouncedUpdateCart.cancel();
        };
    }, [debouncedUpdateCart]);

    // Context Value
    const contextValue = useMemo(() => ({
        cartItems: cartState.items,
        totalQuantity: cartState.totalQuantity,
        subtotal: cartState.subtotal,
        isLoading: cartState.isLoading,
        isCartLoaded: cartState.isCartLoaded,
        error: cartState.error,
        addToCart,
        removeFromCart,
        updateCart: debouncedUpdateCart,
        clearCart,
        transferCart,
        loadCart
    }), [
        cartState.items, 
        cartState.totalQuantity, 
        cartState.subtotal,
        cartState.isLoading,
        cartState.isCartLoaded,
        cartState.error,
        addToCart,
        removeFromCart,
        debouncedUpdateCart,
        clearCart,
        transferCart,
        loadCart
    ]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};