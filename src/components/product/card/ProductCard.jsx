/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, StarHalf, Check } from "lucide-react";
import { useWishlistContext } from "../../../context/WishlistContext";
import { url } from "../../constant/URL";

const ProductCard = ({
    _id,
    name,
    price = 0,
    image,
    sizes = [],
    discount = 0,
    rating = 0,
}) => {
    const { addToCart } = useCart();
    const [hasError, setHasError] = useState(false);
    const [showSizes, setShowSizes] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const { isInWishlist, addItem, removeItem } = useWishlistContext();
    const isFavorite = isInWishlist(_id, 'default');


    const imageUrl = image
        ? `${url}${image}`
        : "/fallback-image.jpg";

    const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

    const toggleFavorite = useCallback((e) => {
        e.preventDefault();
        if (isFavorite) {
            removeItem(_id, 'default', name);
        } else {
            addItem({
                _id,
                name,
                price: price,
                image: image
            }, 'default');
        }
    }, [_id, name, isFavorite, addItem, removeItem]);

    const handleAddToCart = useCallback(async (e) => {
        e?.preventDefault();
        
        if (sizes.length > 0 && !selectedSize) {
            toast.error("Please select a size first");
            return;
        }

        try {
            const cartItem = {
                product: {
                    _id,
                    name,
                    price: discountedPrice,
                    image,
                },
                size: selectedSize || 'One Size', 
                quantity: 1
            };
            console.log(cartItem);
            

            await addToCart(cartItem);
            setShowSizes(false);
            toast.success(
                `${name}${selectedSize ? ` (Size: ${selectedSize})` : ""} added to cart 🛒`
            );
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error(error.message || "Failed to add item to cart. Please try again.");
        }
    }, [_id, name, discountedPrice, imageUrl, sizes, selectedSize, addToCart]);

    const formatPrice = (value) => {
        return (value || 0).toFixed(2);
    };

    const handleQuickAdd = useCallback((e) => {
        e.preventDefault();
        if (sizes.length > 0) {
            setShowSizes(true);
        } else {
            handleAddToCart();
        }
    }, [sizes.length, handleAddToCart]);

    return (
        <motion.div
            className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.015 }}
        >
            {/* Image Section */}
            <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                <Link to={`/product/${_id}`} className="block h-full">
                    <LazyLoadImage
                        src={hasError ? "/fallback-image.jpg" : imageUrl}
                        alt={name}
                        effect="blur"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={() => setHasError(true)}
                    />
                </Link>

                {/* Discount Tag */}
                {discount > 0 && (
                    <motion.div
                        className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10 shadow-md"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                    >
                        {discount}% OFF
                    </motion.div>
                )}



                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <motion.button
                        onClick={toggleFavorite}
                        className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Heart
                            className="w-5 h-5"
                            fill={isFavorite ? "#f43f5e" : "none"}
                            stroke="#f43f5e"
                        />
                    </motion.button>

                    <motion.button
                        onClick={(e) => {
                            e.preventDefault();
                            setShowSizes(!showSizes);
                        }}
                        className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ShoppingCart className="w-5 h-5 text-indigo-600" />
                    </motion.button>
                </div>
            </div>

            {/* Info Section */}
            <div className="p-4">
                <Link to={`/product/${_id}`} className="block mb-1">
                    <h3 className="text-sm font-semibold text-gray-800 hover:text-indigo-600 line-clamp-2">
                        {name}
                    </h3>
                </Link>

                {/* Rating */}
                {rating > 0 && (
                    <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => {
                            const full = i < Math.floor(rating);
                            const half = i === Math.floor(rating) && rating % 1 !== 0;
                            return (
                                <span key={i}>
                                    {full ? (
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ) : half ? (
                                        <StarHalf className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ) : (
                                        <Star className="w-4 h-4 text-gray-300 fill-none" />
                                    )}
                                </span>
                            );
                        })}
                        <span className="text-xs text-gray-500">({rating.toFixed(1)})</span>
                    </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between">
                    {discount > 0 ? (
                        <>
                            <span className="text-base font-bold text-indigo-600">
                                ${formatPrice(discountedPrice)}
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                                ${formatPrice(price)}
                            </span>
                        </>
                    ) : (
                        <span className="text-base font-bold text-indigo-600">
                            ${formatPrice(price)}
                        </span>
                    )}
                </div>
            </div>

            {/* Size Picker */}
            <AnimatePresence>
                {showSizes && (
                    <motion.div
                        className="absolute inset-x-0 bottom-0 bg-white border-t p-4 rounded-b-2xl shadow-lg z-20"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                            Select Size
                        </h4>

                        {sizes.length > 0 ? (
                            <div className="grid grid-cols-4 gap-2 mb-3">
                                {sizes.map((size) => (
                                    <motion.button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-2 rounded-lg text-xs font-medium border transition-all ${
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
                        ) : (
                            <p className="text-xs text-gray-500">One Size</p>
                        )}

                        <motion.button
                            onClick={handleAddToCart}
                            disabled={sizes.length > 0 && !selectedSize}
                            className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                sizes.length > 0 && !selectedSize
                                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                            }`}
                        >
                            <Check className="w-4 h-4" />
                            Add to Cart
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductCard;