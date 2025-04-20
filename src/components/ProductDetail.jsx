/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCircleCheck, 
    faChevronRight,
    faChevronLeft,
    faHeart,
    faShareNodes
} from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { assets } from "../assets/assets";
import { useShop } from "../context/ShopContext";
import { useCart } from '../context/CartContext';
import InlineLoader from './InlineLoader';
import ProductTabs from './product/ProductDetail/ProductTabs';
import RelatedProducts from './product/ProductDetail/RelatedProducts';
import { renderStars } from '../utils/renderStars';

const ProductDetail = () => {
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [mainImage, setMainImage] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [wishlisted, setWishlisted] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, currency, isLoading } = useShop();
    const { addToCart } = useCart();

    const product = useMemo(() => products?.find(prod => prod._id === id), [products, id]);
    const availableSizes = product?.sizes || [];

    const reviewCount = product?.reviewCount || 122;
    
    

    useEffect(() => {
        if (product?.image?.[0]) {
            setMainImage(`http://localhost:5000${product.image[0]}`);
        }
    }, [product]);

    const handleAddToCart = async () => {
        if (!selectedSize && availableSizes.length > 0) {
            toast.error("Please select a size first");
            return;
        }
    
        if (!product || !product._id) {
            toast.error("Product not found");
            return;
        }
    
        setAddingToCart(true);
        
        try {
            const cartItem = {
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    description: product.description,
                    category: product.category,
                },
                size: selectedSize || 'One Size',
                quantity: quantity
            };
            console.log("from detail: ",cartItem);
            
    
            console.log("Adding to cart:", cartItem); // Debug log
            await addToCart(cartItem);
            
            toast.success(
                <div>
                    <p className="font-medium">Added to cart!</p>
                    <p className="text-sm">{product.name} × {quantity}</p>
                    {selectedSize && <p className="text-sm">Size: {selectedSize}</p>}
                </div>
            );
        } catch (error) {
            console.error("Detailed cart error:", error);
            toast.error(error.message || "Failed to add to cart");
        } finally {
            setAddingToCart(false);
        }
    };

    const handleImageClick = (img, index) => {
        setMainImage(`http://localhost:5000${img}`);
        setCurrentImageIndex(index);
    };

    const navigateImage = (direction) => {
        if (!product?.image) return;
        const newIndex = direction === 'next' 
            ? (currentImageIndex + 1) % product.image.length 
            : (currentImageIndex - 1 + product.image.length) % product.image.length;
        setCurrentImageIndex(newIndex);
        setMainImage(`http://localhost:5000${product.image[newIndex]}`);
    };


    const toggleWishlist = () => {
        setWishlisted(!wishlisted);
        toast.success(!wishlisted ? "Added to wishlist" : "Removed from wishlist");
    };

    const shareProduct = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
    };

    if (isLoading) return (
        <div className="flex justify-center items-center h-screen">
            <InlineLoader size="large" />
        </div>
    );

    if (!product) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <button 
                onClick={() => navigate('/shop')}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
                Continue Shopping
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
            <ToastContainer position="bottom-right" autoClose={3000} />
            
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
                <span className="hover:text-black cursor-pointer" onClick={() => navigate('/')}>Home</span>
                <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-xs" />
                <span className="hover:text-black cursor-pointer" onClick={() => navigate('/collection')}>Collection</span>
                <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-xs" />
                <span className="text-black">{product.category}</span>
                <FontAwesomeIcon icon={faChevronRight} className="mx-2 text-xs" />
                <span className="text-black font-medium">{product.name}</span>
            </div>

            {/* Main Product Section */}
            <div className='flex flex-col lg:flex-row gap-8 xl:gap-12'>
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-4 sm:flex-row">
                    <div className="flex sm:flex-col gap-2 sm:w-24 overflow-x-auto sm:overflow-x-visible">
                        {product.image?.map((img, index) => (
                            <motion.button 
                                key={index}
                                onClick={() => handleImageClick(img, index)}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-20 h-20 sm:w-full sm:h-24 flex-shrink-0 border-2 rounded-lg transition-all
                                    ${mainImage === `http://localhost:5000${img}` 
                                        ? 'border-orange-500 ring-2 ring-orange-200' 
                                        : 'border-gray-200 hover:border-gray-300'
                                    }
                                `}
                            >
                                <img 
                                    src={`http://localhost:5000${img}`}
                                    alt={`${product.name} ${index + 1}`}
                                    className='w-full h-full object-cover rounded-md'
                                />
                            </motion.button>
                        ))}
                    </div>
                    <div className='w-full sm:w-[calc(100%-6rem)] relative'>
                        <motion.div 
                            className="relative aspect-square w-full bg-gray-50 rounded-xl overflow-hidden shadow-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            key={mainImage}
                        >
                            <img 
                                src={mainImage || assets.placeholder_image}
                                alt={product.name} 
                                className='w-full h-full object-contain'
                            />
                            {product.image?.length > 1 && (
                                <>
                                    <button 
                                        onClick={() => navigateImage('prev')}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </button>
                                    <button 
                                        onClick={() => navigateImage('next')}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-all"
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </button>
                                </>
                            )}
                            <div className="absolute top-3 right-3 flex gap-2">
                                <button 
                                    onClick={toggleWishlist}
                                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
                                >
                                    <FontAwesomeIcon 
                                        icon={wishlisted ? faHeart : faHeartRegular} 
                                        className={wishlisted ? 'text-red-500' : 'text-gray-700'}
                                    />
                                </button>
                                <button 
                                    onClick={shareProduct}
                                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors"
                                >
                                    <FontAwesomeIcon icon={faShareNodes} className="text-gray-700" />
                                </button>
                            </div>
                            {product.isNew && (
                                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    NEW
                                </span>
                            )}
                            {product.discount && (
                                <span className="absolute bottom-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                                    {product.discount}% OFF
                                </span>
                            )}
                        </motion.div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-6">
                    <div>
                        <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>{product.name}</h1>
                        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex">
                            {renderStars()}
                        </div>
                        <span className="text-sm text-gray-500 hover:text-black cursor-pointer">
                            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
                        </span>
                        <span className="text-sm text-gray-500">|</span>
                        <span className="text-sm text-green-600 font-medium">In Stock</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-2xl font-semibold text-gray-900">
                            {currency}{product.price.toFixed(2)}
                        </p>
                        {product.originalPrice && product.price < product.originalPrice && (
                            <p className="text-lg text-gray-500 line-through">
                                {currency}{product.originalPrice.toFixed(2)}
                            </p>
                        )}
                        {product.discount && (
                            <span className="text-sm bg-red-100 text-red-800 px-2 py-0.5 rounded">
                                Save {currency}{(product.originalPrice - product.price).toFixed(2)}
                            </span>
                        )}
                    </div>

                    <p className='text-gray-600'>{product.shortDescription || product.description}</p>

                    {/* Size Selection */}
                    {availableSizes.length > 0 && (
                        <div className='space-y-3 pt-4'>
                            <div className="flex justify-between items-center">
                                <p className='font-medium'>Select Size</p>
                                <button className="text-xs text-gray-500 hover:text-black">
                                    Size Guide
                                </button>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {availableSizes.map(size => (
                                    <motion.button
                                        key={size}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-4 py-2 border-2 rounded-lg transition-all
                                            ${selectedSize === size 
                                                ? 'border-orange-500 bg-orange-50 text-orange-600 font-medium'
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                            }
                                        `}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 pt-2">
                        <p className='font-medium'>Quantity</p>
                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                            <button 
                                className="px-3 py-2 text-lg hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className="px-4 py-2 border-x-2 border-gray-200">{quantity}</span>
                            <button 
                                className="px-3 py-2 text-lg hover:bg-gray-50 disabled:opacity-30 transition-colors"
                                onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
                                disabled={quantity >= 10}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <motion.button 
                                whileHover={{ scale: selectedSize || availableSizes.length === 0 ? 1 : 1.03 }}
                                whileTap={{ scale: selectedSize || availableSizes.length === 0 ? 1 : 0.98 }}
                                className={`relative flex-1 px-8 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    selectedSize || availableSizes.length === 0
                                        ? 'bg-black text-white hover:bg-gray-900 shadow-md' 
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                }`}
                                onClick={handleAddToCart}
                                disabled={(!selectedSize && availableSizes.length > 0) || addingToCart}
                            >
                                {addingToCart ? (
                                    <motion.span 
                                        className="flex items-center justify-center gap-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <motion.span
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                            className="block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        <span>Adding...</span>
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        ADD TO CART
                                    </motion.span>
                                )}
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 px-8 py-3 text-sm font-medium border-2 border-black rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                                onClick={() => setShowComingSoon(true)}
                            >
                                BUY NOW
                        </motion.button>
                    </div>

                    <div className='border-t pt-6 space-y-3 text-sm text-gray-500'>
                        <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500"/>
                            <span>100% Authentic Products Guaranteed</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500"/>
                            <span>Free shipping on orders over {currency}50</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-500"/>
                            <span>Easy 30-day returns & exchanges</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Details Tabs */}
            <ProductTabs product={product} />

            {/* Related Products Section */}
            <RelatedProducts category={product.category} currentProductId={product._id} />


            {/* Coming Soon Modal */}
            <AnimatePresence>
                {showComingSoon && (
                    <motion.div 
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            <h3 className="text-xl font-bold mb-4">Coming Soon!</h3>
                            <p className="text-gray-600 mb-6">
                                Our "Buy Now" feature is currently in development. In the meantime, you can add items to your cart and checkout normally.
                            </p>
                            <div className="flex justify-end gap-3">
                                <button 
                                    onClick={() => setShowComingSoon(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Close
                                </button>
                                <button 
                                    onClick={() => {
                                        setShowComingSoon(false);
                                        handleAddToCart();
                                    }}
                                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                                >
                                    Add to Cart Instead
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductDetail;