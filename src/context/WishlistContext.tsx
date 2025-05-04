import React, {
    useState,
    useEffect,
    useCallback,
    createContext,
    useContext,
    ReactNode
} from 'react';
import {
    fetchUserWishlist,
    addToWishlist as addToWishlistAPI,
    removeFromWishlist as apiRemoveFromWishlist,
    moveToCart as apiMoveToCart,
    clearWishlist as apiClearWishlist
} from '../services/api';
import { MinimalProduct, WishlistItem } from '../types/types';
import { useData } from '../context/DataContext';
import toast from 'react-hot-toast';

interface WishlistContextType {
    wishlist: WishlistItem[];
    loading: boolean;
    error: string | null;
    addItem: (product: MinimalProduct, size?: string) => Promise<boolean>;
    removeItem: (productId: string, size: string, productName?: string) => Promise<boolean>;
    moveItemToCart: (productId: string, size: string, quantity?: number, productName?: string) => Promise<void>;
    clearAll: () => Promise<boolean>;
    isInWishlist: (productId: string, size?: string) => boolean;
    refresh: () => Promise<void>;
    isGuest: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const GUEST_WISHLIST_KEY = 'guestWishlist';

const useWishlistLogic = (): WishlistContextType => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasMigrated, setHasMigrated] = useState(false);
    const { isAuthenticated } = useData();

    const getGuestWishlist = useCallback((): WishlistItem[] => {
        try {
            const stored = localStorage.getItem(GUEST_WISHLIST_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (err) {
            console.error('Failed to parse guest wishlist', err);
            return [];
        }
    }, []);

    const saveGuestWishlist = useCallback((items: WishlistItem[]) => {
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(items));
    }, []);

    const clearGuestWishlist = useCallback(() => {
        localStorage.removeItem(GUEST_WISHLIST_KEY);
    }, []);

    const fetchWishlist = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            if (isAuthenticated) {
                const response = await fetchUserWishlist();
                const items = response.data?.items?.map(item => ({
                    product: {
                        _id: item.product._id,
                        name: item.product.name,
                        price: item.product.price,
                        image: item.product.image
                    },
                    size: item.size,
                    addedAt: item.addedAt
                })) || [];
                setWishlist(items);
            } else {
                setWishlist(getGuestWishlist());
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch wishlist');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, getGuestWishlist]);

    const migrateGuestWishlist = useCallback(async () => {
        if (!isAuthenticated || hasMigrated) return;

        const guestWishlist = getGuestWishlist();
        if (guestWishlist.length === 0) {
            setHasMigrated(true);
            return;
        }

        try {
            setLoading(true);
            const response = await Promise.all(
                guestWishlist.map(item =>
                    addToWishlistAPI(item.product._id, item.size)
                )
            );

            if (response.every(res => res.success)) {
                clearGuestWishlist();
                setHasMigrated(true);
                await fetchWishlist();
            }
        } catch (err) {
            console.error('Failed to migrate guest wishlist: ', err);
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, hasMigrated, getGuestWishlist, clearGuestWishlist, fetchWishlist]);

    useEffect(() => {
        let isMounted = true;

        const initialize = async () => {
            try {
                if (isAuthenticated) {
                    await migrateGuestWishlist();
                }
                if (isMounted) {
                    await fetchWishlist();
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'Initialization failed');
                }
            }
        };

        initialize();

        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, fetchWishlist, migrateGuestWishlist]);

    const addItem = async (product: MinimalProduct, size: string = 'default'): Promise<boolean> => {
        try {
            setLoading(true);

            if (isAuthenticated) {
                const response = await addToWishlistAPI(product._id, size);
                setWishlist(response.data.items);
                toast.success(`${product.name} added to wishlist ❤️`);
            } else {
                const guestWishlist = getGuestWishlist();

                if (guestWishlist.some(item =>
                    item.product._id === product._id && item.size === size
                )) {
                    toast.error(`${product.name} is already in your wishlist`);
                    return false;
                }

                const newItem: WishlistItem = {
                    product: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image
                    },
                    size,
                    addedAt: new Date().toISOString()
                };

                const updatedWishlist = [...guestWishlist, newItem];
                saveGuestWishlist(updatedWishlist);
                setWishlist(updatedWishlist);
                toast.success(`${product.name} added to wishlist ❤️`);
            }
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to add to wishlist';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (
        productId: string,
        size: string,
        productName?: string
    ): Promise<boolean> => {
        try {
            setLoading(true);

            if (isAuthenticated) {
                const response = await apiRemoveFromWishlist(productId, size);
                setWishlist(response.data.items);
            } else {
                const guestWishlist = getGuestWishlist();
                const updatedWishlist = guestWishlist.filter(
                    item => !(item.product._id === productId && item.size === size)
                );
                saveGuestWishlist(updatedWishlist);
                setWishlist(updatedWishlist);
            }

            toast.success(`${productName || 'Item'} removed from wishlist 💔`);
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to remove from wishlist';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const moveItemToCart = async (
        productId: string,
        size: string,
        quantity: number = 1,
        productName?: string
    ): Promise<void> => {
        if (!isAuthenticated) {
            const errorMessage = 'Please login to move items to cart';
            setError(errorMessage);
            toast.error(errorMessage);
            return;
        }

        try {
            setLoading(true);
            await apiMoveToCart(productId, size, quantity);
            await fetchWishlist();
            toast.success(`${productName || 'Item'} moved to cart 🛒`);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to move item to cart';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const clearAll = async (): Promise<boolean> => {
        try {
            setLoading(true);

            if (isAuthenticated) {
                await apiClearWishlist();
            } else {
                saveGuestWishlist([]);
            }

            setWishlist([]);
            toast.success('Wishlist cleared');
            return true;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to clear wishlist';
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const isInWishlist = useCallback((productId: string, size: string = 'default'): boolean => {
        return wishlist.some(item =>
            item.product._id === productId &&
            item.size === size
        );
    }, [wishlist]);

    return {
        wishlist,
        loading,
        error,
        addItem,
        removeItem,
        moveItemToCart,
        clearAll,
        isInWishlist,
        refresh: fetchWishlist,
        isGuest: !isAuthenticated
    };
};

// ✅ Provider component
export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const wishlistLogic = useWishlistLogic();

    return (
        <WishlistContext.Provider value={wishlistLogic}>
            {children}
        </WishlistContext.Provider>
    );
};

// ✅ Hook to consume wishlist
export const useWishlistContext = (): WishlistContextType => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlistContext must be used within a WishlistProvider');
    }
    return context;
};

