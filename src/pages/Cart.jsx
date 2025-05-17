/* eslint-disable no-unused-vars */
import { useState, useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { assets } from '../assets/assets';
import Title from '../components/common/Title';
import InlineLoader from '../components/utility/InlineLoader';
import { url } from '../components/constant/URL';
import EmptyCartIllustration from '../components/illustrations/EmptyCartIllustration';

// Animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Memoized CartItem component with animations and better UX
const CartItem = memo(function CartItem({ 
    item, 
    index, 
    onQuantityChange, 
    onRemove, 
    isCartLoading,
    setItemToDelete,
    setShowDeleteConfirmation 
}) {
  const product = item?.product;
  
  if (!product || !product._id) {
    console.error('Invalid cart item:', item);
    return null;
  }

  const imageUrl = product?.image?.[0] 
    ? `${url}${product.image[0]}`
    : assets.placeholder_image;

  const handleRemoveClick = () => {
    setItemToDelete({ itemId: product._id, itemSize: item.size });
    setShowDeleteConfirmation(true);
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="py-4 border-t border-b border-gray-200 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
    >
      <div className="flex items-start gap-6">
        <img 
          className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded" 
          src={imageUrl} 
          alt={product?.name || 'Product'} 
          loading="lazy"
          onError={(e) => {
            e.target.src = assets.placeholder_image;
          }}
        />
        <div>
          <p className="text-sm sm:text-lg font-medium line-clamp-2">
            {product?.name || 'Unnamed Product'}
          </p>
          <div className="flex items-center gap-5 mt-2">
            <p className="text-sm sm:text-base">{formatPrice(product?.price)}</p>
            <p className="px-2 sm:px-3 py-1 border bg-slate-50 text-xs sm:text-sm rounded">
              {item.size || 'One Size'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 border bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-md transition-colors"
          onClick={() => onQuantityChange(index, (item.quantity || 1) - 1)}
          disabled={isCartLoading || item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center text-sm sm:text-base">
          {item.quantity || 1}
        </span>
        <button
          className="px-2 py-1 border bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded-md transition-colors"
          onClick={() => onQuantityChange(index, (item.quantity || 1) + 1)}
          disabled={isCartLoading}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button 
        onClick={handleRemoveClick}
        disabled={isCartLoading}
        aria-label="Remove item"
        className="p-1 hover:bg-gray-100 rounded-full transition-colors self-center justify-self-end mr-4"
      >
        <FaTrash className="text-gray-600 w-4 h-4" />
      </button>
    </motion.div>
  );
});
CartItem.displayName = "CartItem";

// Price formatter function with currency symbol
const formatPrice = (price, currency = '$') => {
  const currencyCode = currency === '$' ? 'USD' : currency;
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: currencyCode 
  }).format(price || 0);
};

const Cart = () => {
    const { isAuthenticated } = useAuth();
    const { currency, isLoading: isShopLoading } = useShop();
    const { 
        cartItems = [], 
        updateCart, 
        removeFromCart, 
        clearCart, 
        subtotal: contextSubtotal = 0,
        isLoading: isCartLoading = false,
        isCartLoaded = false
    } = useCart();
    const navigate = useNavigate();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showClearCartConfirmation, setShowClearCartConfirmation] = useState(false);
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const [isRemovingItem, setIsRemovingItem] = useState(false);
    const [isClearingCart, setIsClearingCart] = useState(false);

    const shippingFee = contextSubtotal > 300 ? 0 : 10; // Free shipping over $300
    const total = contextSubtotal > 0 ? contextSubtotal + shippingFee : 0;

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handlers with useCallback for performance
    const handleCartClick = useCallback(async () => {
        if (isCartLoading) return;
        
        setIsCheckoutLoading(true);
        try {
        if (isAuthenticated) {
            navigate('/place-order');
        } else {
            navigate('/login');
            toast('You need to log in to proceed to checkout', {
            icon: '🔒',
            duration: 4000,
            });
        }
        } finally {
        setIsCheckoutLoading(false);
        }
    }, [isAuthenticated, navigate, isCartLoading]);

    const handleQuantityChange = useCallback(async (index, newQuantity) => {
        const item = cartItems[index];
        if (!item?.product?._id) {
        toast.error('Invalid item in cart');
        return;
        }

        if (newQuantity <= 0) {
        setItemToDelete({ itemId: item.product._id, itemSize: item.size });
        setShowDeleteConfirmation(true);
        return;
        }

        try {
        await updateCart(item.product._id, item.size, Math.max(1, Math.min(100, newQuantity)));
        } catch (error) {
        toast.error(error.message || 'Failed to update quantity');
        }
    }, [cartItems, updateCart]);

    const handleRemove = useCallback(async (itemId, itemSize) => {
        setIsRemovingItem(true);
        try {
        await removeFromCart(itemId, itemSize);
        toast.success('Item removed from cart');
        } catch (error) {
        toast.error(error.message || 'Failed to remove item');
        throw error;
        } finally {
        setIsRemovingItem(false);
        }
    }, [removeFromCart]);

    const handleClearCart = useCallback(() => {
        if (cartItems.length === 0) {
        toast('Your cart is already empty', {
            icon: '🛒',
        });
        return;
        }
        setShowClearCartConfirmation(true);
    }, [cartItems.length]);

    const confirmClearCart = useCallback(async () => {
        setIsClearingCart(true);
        try {
        await clearCart();
        toast.success('Cart cleared successfully');
        } catch (error) {
        toast.error(error.message || 'Failed to clear cart');
        } finally {
        setIsClearingCart(false);
        setShowClearCartConfirmation(false);
        }
    }, [clearCart]);

    // Loading state
    if ((isShopLoading || !isCartLoaded) && cartItems.length === 0) {
        return (
        <div className="flex justify-center items-center h-screen">
            <InlineLoader size="lg" />
        </div>
        );
    }

    return (
        <div className="border-t pt-14 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="mb-6">
            <Title text1={'YOUR'} text2={'CART'} />
        </div>

        <div className="mb-8">
            {cartItems.length === 0 ? (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="py-12 text-center flex flex-col items-center"
            >
                <EmptyCartIllustration 
                width={300}
                height={300}
                primaryColor="#3B82F6"
                secondaryColor="#93C5FD"
                className="mb-6"
                />
                <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
                <button
                onClick={() => navigate('/collection')}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                <FaArrowLeft className="w-4 h-4" />
                Continue Shopping
                </button>
            </motion.div>
            ) : (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
            >
                <AnimatePresence>
                {cartItems
                    .filter(item => item?.product?._id)
                    .map((item, index) => (
                    <CartItem 
                        key={`${item.product._id}-${index}-${item.size}`} 
                        item={item} 
                        index={index}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemove}
                        isCartLoading={isCartLoading || isRemovingItem}
                        setItemToDelete={setItemToDelete}
                        setShowDeleteConfirmation={setShowDeleteConfirmation}
                    />
                    ))}
                </AnimatePresence>
            </motion.div>
            )}
        </div>

        {/* Single Item Delete Confirmation Modal */}
        {showDeleteConfirmation && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
                <p className="text-lg font-semibold mb-4">Remove this item from your cart?</p>
                <div className="flex gap-4 justify-end">
                <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                    onClick={() => setShowDeleteConfirmation(false)}
                    disabled={isRemovingItem}
                >
                    Cancel
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-2"
                    onClick={async () => {
                    try {
                        await handleRemove(itemToDelete.itemId, itemToDelete.itemSize);
                        setShowDeleteConfirmation(false);
                    } catch {
                        // Error already handled in handleRemove
                    }
                    }}
                    disabled={isRemovingItem}
                >
                    {isRemovingItem ? (
                    <InlineLoader size="sm" color="light" showText={false} />
                    ) : (
                    <FaTrash className="w-4 h-4" />
                    )}
                    Remove
                </button>
                </div>
            </motion.div>
            </motion.div>
        )}

        {/* Clear Cart Confirmation Modal */}
        {showClearCartConfirmation && (
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
            >
            <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
            >
                <p className="text-lg font-semibold mb-4">Clear your entire cart?</p>
                <p className="text-gray-600 mb-4">This will remove all items from your cart.</p>
                <div className="flex gap-4 justify-end">
                <button
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                    onClick={() => setShowClearCartConfirmation(false)}
                    disabled={isClearingCart}
                >
                    Cancel
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-2"
                    onClick={confirmClearCart}
                    disabled={isClearingCart}
                >
                    {isClearingCart ? (
                    <InlineLoader size="sm" color="light" showText={false} />
                    ) : (
                    <FaTrash className="w-4 h-4" />
                    )}
                    Clear Cart
                </button>
                </div>
            </motion.div>
            </motion.div>
        )}

        {/* Cart Totals */}
        {cartItems.length > 0 && (
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-end"
            >
            <div className="w-full sm:w-[450px] bg-gray-50 p-6 rounded-lg">
                <div className="w-full">
                <div className="text-2xl mb-4">
                    <Title text1={'CART'} text2={'SUMMARY'} />
                </div>

                <div className="flex flex-col gap-4 mt-2 text-sm sm:text-base">
                    <div className="flex justify-between">
                    <p>Subtotal ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} items)</p>
                    <p>{formatPrice(contextSubtotal, currency)}</p>
                    </div>
                    
                    <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>
                        {shippingFee === 0 ? (
                        <span className="text-green-600">Free</span>
                        ) : (
                        formatPrice(shippingFee, currency)
                        )}
                    </p>
                    </div>
                    
                    {contextSubtotal < 300 && (
                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                        Spend {formatPrice(300 - contextSubtotal, currency)} more for free shipping!
                    </div>
                    )}
                    
                    <hr className="my-2 border-gray-200" />
                    
                    <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>{formatPrice(total, currency)}</p>
                    </div>
                </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                <button
                    onClick={handleClearCart}
                    className="bg-gray-200 text-gray-700 px-4 py-3 rounded hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                    disabled={isCartLoading || isRemovingItem}
                >
                    {isClearingCart ? (
                    <InlineLoader size="sm" color="dark" showText={false} />
                    ) : (
                    <>
                        <FaTrash className="w-4 h-4" />
                        Clear Cart
                    </>
                    )}
                </button>
                <button
                    onClick={handleCartClick}
                    className="bg-black text-white px-4 py-3 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    disabled={isCartLoading || isCheckoutLoading || isRemovingItem}
                >
                    {isCheckoutLoading ? (
                    <InlineLoader size="sm" color="light" showText={false} />
                    ) : (
                    <>
                        <FaShoppingBag className="w-4 h-4" />
                        Proceed to Checkout
                    </>
                    )}
                </button>
                
                <button
                    onClick={() => navigate('/collection')}
                    className="text-gray-700 px-4 py-3 rounded hover:bg-gray-100 transition-colors border border-gray-200 flex items-center justify-center gap-2"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    Continue Shopping
                </button>
                </div>
            </div>
            </motion.div>
        )}
        </div>
    );
};

export default Cart;