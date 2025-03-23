/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const ProductCard = ({ _id, name, price, image }) => {
    const { addToCart } = useCart();
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const imageUrl = image ? `https://server-e-commerce-seven.vercel.app${image}` : "/fallback-image.jpg";

    const handleAddToCart = async () => {
        if (!selectedSize) {
            toast.error("Please select a size before adding to cart.");
            return;
        }

        try {
            await addToCart({
                productId: _id,
                name,
                price,
                image,
                size: selectedSize,
                quantity: 1,
            });
            setIsExpanded(false);
            toast.success(`${name} (Size: ${selectedSize}) added to cart!`);
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart. Please try again.");
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative">
            <Link to={`/product/${_id}`}>
                {/* Product Image */}
                <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                    {!isImageLoaded && !hasError && (
                        <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                    )}
                    <img
                        loading="lazy"
                        src={hasError ? "/fallback-image.jpg" : imageUrl}
                        alt={name}
                        className={`w-full h-full object-cover hover:scale-110 transition duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setIsImageLoaded(true)}
                        onError={() => setHasError(true)}
                    />
                </div>

                {/* Product Details */}
                <div className="p-4 text-center">
                    {/* Product Name */}
                    <h3 className="text-sm font-semibold text-gray-800 truncate mb-2">
                        {name}
                    </h3>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between text-sm font-medium">
                        {/* Price */}
                        <span className="text-indigo-600 text-lg font-bold">
                            ${price}
                        </span>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <button
                                title="Add to Wishlist"
                                className="p-2 bg-gray-100 rounded-full hover:bg-indigo-50 text-indigo-600 transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">favorite</span>
                            </button>
                            <button
                                title="Add to Cart"
                                className="p-2 bg-gray-100 rounded-full hover:bg-indigo-50 text-indigo-600 transition-colors"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsExpanded(!isExpanded);
                                }}
                            >
                                <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Expanded View for Size Selection */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-white transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
                style={{ boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)" }}
            >
                {/* Close Button (x) */}
                <button
                    className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setIsExpanded(false)}
                >
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>

                <div className="p-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Select Size</h4>
                    <div className="flex gap-2 mb-4">
                        {["S", "M", "L", "XL", "XXL"].map((size) => (
                            <button
                                key={size}
                                className={`p-2 border rounded-full text-sm font-medium ${
                                    selectedSize === size
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <button
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;