import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useWishlistContext } from '../../../../context/WishlistContext';
import { useCart } from '../../../../context/CartContext';
import WishlistCard from './WishlistCard'; // Import the new component
import { url } from "../../../../components/constant/URL";
import EmptyWishlist from './EmptyWishlist';
import WishlistSkeleton from './WishlistSkeleton';

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
            <WishlistSkeleton />
        );
    }

    if (!wishlist || !wishlist.length) {
        return (
            <EmptyWishlist /> 
        );
    }

    return (
        <div className="space-y-6 p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-300 border-2">
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