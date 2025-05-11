/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useWishlistContext } from '../context/WishlistContext';
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, StarHalf, Check, X } from "lucide-react";
import { url } from "../components/constant/URL";
import { useShop } from "../context/ShopContext";
import InlineLoader from "./utility/InlineLoader";
import  useMediaQuery  from "../components/utility/useMediaQuery";

interface WishlistCardProps {
    _id: string;
    name: string;
    price: number;
    image: string;
    sizes: string[];
    rating?: number;
    description?: string;
    onRemove: () => void;
    isProcessing: boolean;
    isSelected?: boolean;
    onSelect?: (id: string) => void;
    selectedSize?: string | null;
}

const WishlistCard = ({
    _id,
    name,
    price = 0,
    image,
    sizes = [],
    rating = 0,
    description,
    onRemove,
    isProcessing,
    isSelected = false,
    onSelect,
    selectedSize: initialSelectedSize = null
}: WishlistCardProps) => {
    const { addToCart } = useCart();
    const { isInWishlist, addItem, removeItem } = useWishlistContext();
    const [hasError, setHasError] = useState(false);
    const [showSizes, setShowSizes] = useState(false);
    const [selectedSize, setSelectedSize] = useState<string | null>(initialSelectedSize);
    const [addingToCart, setAddingToCart] = useState(false);
    const { products } = useShop();
    const isSmallScreen = useMediaQuery('(max-width: 640px)');

    const product = useMemo(() => products?.find(prod => prod._id === _id), [products, _id]);
    const availableSizes = product?.sizes || [];
    const isWishlisted = isInWishlist(_id, 'default');
    const imageUrl = image ? `${url}${image}` : "/fallback-image.jpg";

    const toggleWishlist = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        try {
            if (isWishlisted) {
                removeItem(_id, 'default', name);
                toast.success('Removed from wishlist');
            } else {
                addItem({
                    _id,
                    name,
                    price,
                    image,
                }, 'default');
                toast.success('Added to wishlist');
            }
        } catch (error) {
            console.error("Wishlist error:", error);
            toast.error("Failed to update wishlist");
        }
    }, [_id, name, price, image, sizes, isWishlisted, addItem, removeItem]);

    const handleSelect = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (onSelect) {
            onSelect(_id);
        }
    }, [_id, onSelect]);

    const handleAddToCart = useCallback(async (e?: React.MouseEvent) => {
        e?.preventDefault();
        
        if (availableSizes.length > 0 && !selectedSize) {
            setShowSizes(!showSizes);
            return;
        }

        setAddingToCart(true);
        
        try {
            const cartItem = {
                product: {
                    _id,
                    name,
                    price,
                    image,
                    description,
                },
                size: selectedSize || 'One Size',
                quantity: 1
            };
            
            await addToCart(cartItem);
            toast.success(
                <div>
                    <p className="font-medium">Added to cart!</p>
                    <p className="text-sm">{name} × 1</p>
                    {selectedSize && <p className="text-sm">Size: {selectedSize}</p>}
                </div>
            );
            
            // Remove from wishlist after adding to cart
            if (isWishlisted) {
                removeItem(_id, 'default', name);
            }
        } catch (error) {
            console.error("Detailed cart error:", error);
            toast.error(error.message || "Failed to add to cart");
        } finally {
            setAddingToCart(false);
        }
    }, [_id, name, image, description, availableSizes, selectedSize, addToCart, showSizes, isWishlisted, removeItem]);

    const formatPrice = (value: number) => (value || 0).toFixed(2);


    return (
        <motion.div
            className={`group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row w-full ${isSelected ? 'ring-2 ring-indigo-500' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.005 }}
        >
            {/* Selection Checkbox (Top Left on small screens, Left Center on larger screens) */}
            {onSelect && (
                <button
                    onClick={handleSelect}
                    className={`absolute z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'} transition-colors duration-200`}
                    style={{
                        top: isSmallScreen ? 8 : '50%',
                        left: isSmallScreen ? 8 : -12,
                        transform: isSmallScreen ? 'none' : 'translateY(-50%)'
                    }}
                    aria-label={isSelected ? "Deselect item" : "Select item"}
                >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>
            )}

            {/* Image Section */}
            <div className="relative w-full h-48 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0 bg-gray-50 overflow-hidden">
                <Link to={`/product/${_id}`} className="block h-full">
                    <LazyLoadImage
                        src={hasError ? "/fallback-image.jpg" : imageUrl}
                        alt={name}
                        effect="blur"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={() => setHasError(true)}
                    />
                </Link>

                {/* Wishlist Button (Top Right) */}
                <button
                    onClick={toggleWishlist}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-red-50 transition-colors duration-200"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <Heart 
                        className={`w-4 h-4 transition-colors duration-200 ${isWishlisted ? 'fill-red-500 text-red-500 hover:fill-red-600' : 'text-gray-600 hover:text-red-500'}`} 
                    />
                </button>

                
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-4">
                <div className="flex-grow">
                    <Link to={`/product/${_id}`} className="block">
                        <h3 className="text-sm font-medium text-gray-800 hover:text-indigo-600 line-clamp-2 mb-1">
                            {name}
                        </h3>
                    </Link>

                    {description && (
                        <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                            {description}
                        </p>
                    )}

                    {/* Display selected size if available */}
                    {selectedSize && (
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-gray-700">Size:</span>
                            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                                {selectedSize}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-semibold text-gray-800">
                        ${formatPrice(price)}
                    </span>

                    <div className="flex items-center gap-2">
                        {/* Size Selection */}
                        <AnimatePresence>
                            {showSizes && availableSizes.length > 0 && (
                                <motion.div
                                    className="absolute bottom-16 right-4 sm:relative sm:bottom-auto sm:right-auto bg-white p-2 rounded-lg shadow-lg sm:shadow-none z-10 border border-gray-100 sm:border-none"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-1 max-w-xs">
                                        {availableSizes.map((size) => (
                                            <motion.button
                                                key={size}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedSize(size);
                                                    setShowSizes(false);
                                                }}
                                                className={`px-2 py-1 text-xs rounded-md border transition-all ${
                                                    selectedSize === size
                                                        ? "bg-indigo-600 text-white border-indigo-600"
                                                        : "bg-white border-gray-300 text-gray-700 hover:border-indigo-500"
                                                }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {size}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Add to Cart Button */}
                        <motion.button
                            onClick={handleAddToCart}
                            className="rounded-full p-2 sm:px-4 sm:py-2 flex items-center justify-center gap-1 sm:gap-2 text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={isProcessing || addingToCart}
                        >
                            {addingToCart ? (
                                <InlineLoader
                                    size="sm"
                                    color="primary"
                                    showText={false}
                                    className="my-0"
                                />
                            ) : (
                                <>
                                    <ShoppingCart className="w-4 h-4" />
                                    {!isSmallScreen && (
                                        <span>
                                            {availableSizes.length > 0 && !selectedSize ? 'Select Size' : 'Add'}
                                        </span>
                                    )}
                                </>
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WishlistCard;