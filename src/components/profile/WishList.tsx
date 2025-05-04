import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useWishlistContext } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import WishlistCard from '../../components/WishlistCard'; // Import the new component
import { url } from '../constant/URL';

interface ProductImage {
    url: string;
    altText?: string;
}

interface WishlistProduct {
    _id: string;
    name: string;
    price: number;
    description?: string;
    image: string;
    images: ProductImage[];
    sizes: string[];
    discount?: number;
    rating?: number;
}

interface WishlistItem {
    _id: string;
    product: WishlistProduct;
    size: string;
    addedAt: string;
}

interface WishlistContextType {
    wishlist: WishlistItem[];
    loading: boolean;
    removeFromWishlist: (itemId: string) => Promise<void>;
}

const Wishlist = () => {
    const {
        wishlist,
        loading,
        removeFromWishlist,
    } = useWishlistContext() as unknown as WishlistContextType;

    const { addToCart } = useCart();
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleRemove = async (itemId: string) => {
        setProcessingId(itemId);
        try {
            await removeFromWishlist(itemId);
            toast.success('Removed from wishlist', {
                icon: '❤️',
                style: {
                    borderRadius: '8px',
                    background: '#333',
                    color: '#fff',
                },
            });
        } catch (error) {
            toast.error('Failed to remove');
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="flex w-full bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="w-1/3">
                            <Skeleton height={160} className="w-full h-full" />
                        </div>
                        <div className="w-2/3 p-4">
                            <Skeleton width={120} height={20} className="mb-2" />
                            <Skeleton width={80} height={16} className="mb-3" />
                            <div className="flex justify-between">
                                <Skeleton width={80} height={12} />
                                <div className="flex gap-2">
                                    <Skeleton circle width={32} height={32} />
                                    <Skeleton circle width={32} height={32} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!wishlist || !wishlist.length) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-300 text-5xl mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
                <p className="text-gray-600 text-lg">Your wishlist is empty</p>
                <p className="text-gray-400 text-sm mt-1">Start adding items you love</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {wishlist.map((item) => {
                const productData = {
                    _id: item.product._id,
                    name: item.product.name,
                    price: item.product.price,
                    image: item.product.image,
                    sizes: item.product.sizes,
                    discount: item.product.discount || 0,
                    rating: item.product.rating || 0,
                    description: item.product.description
                };

                return (
                    <WishlistCard
                        key={`wishlist-item-${item._id}`}
                        {...productData}
                        onRemove={() => handleRemove(item._id)}
                        isProcessing={processingId === item._id}
                    />
                );
            })}
        </div>
    );
};

export default Wishlist;