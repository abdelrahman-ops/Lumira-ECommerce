/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { assets } from '../assets/assets';
import Title from './../components/common/Title';
import InlineLoader from '../components/utility/InlineLoader';

const Cart = () => {
    const { isAuthenticated } = useAuth();
    const { currency, products, isLoading: isShopLoading } = useShop();
    const { 
        cartItems, 
        updateCart, 
        removeFromCart, 
        clearCart, 
        totalQuantity,
        subtotal: contextSubtotal,
        isLoading: isCartLoading,
        isCartLoaded
    } = useCart();
    const navigate = useNavigate();

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showClearCartConfirmation, setShowClearCartConfirmation] = useState(false);

    const shippingFee = 10;
    const total = contextSubtotal > 0 ? contextSubtotal + shippingFee : 0;

    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/place-order');
        } else {
            navigate('/login');
            toast.info('You must log in to proceed to checkout');
        }
    };

    const handleQuantityChange = async (index, newQuantity) => {
        if (isNaN(newQuantity)) {
            toast.error('Invalid quantity');
            return;
        }

        const item = cartItems[index];
        if (!item?.product?._id) {
            console.error('Invalid item in cart:', item);
            toast.error('Invalid item in cart');
            return;
        }

        if (newQuantity <= 0) {
            handleRemove(item.product._id, item.size);
            return;
        }

        const value = Math.max(1, Math.min(100, newQuantity));

        try {
            await updateCart(item.product._id, item.size, value);
        } catch (error) {
            toast.error('Failed to update quantity');
            console.error('Update error:', error);
        }
    };

    const handleRemove = (itemId, itemSize) => {
        if (!itemId) {
            toast.error('Invalid item ID');
            return;
        }
        setItemToDelete({ itemId, itemSize });
        setShowDeleteConfirmation(true);
    };

    const confirmRemove = async () => {
        if (!itemToDelete?.itemId) {
            toast.error('Invalid item to remove');
            return;
        }
        try {
            await removeFromCart(itemToDelete.itemId, itemToDelete.itemSize);
            toast.success('Item removed from cart successfully!');
        } catch (error) {
            toast.error('Failed to remove item');
            console.error('Remove error:', error);
        } finally {
            setShowDeleteConfirmation(false);
            setItemToDelete(null);
        }
    };

    const cancelRemove = () => {
        setShowDeleteConfirmation(false);
        setItemToDelete(null);
    };

    const handleClearCart = () => {
        if (cartItems.length === 0) {
            toast.info('Your cart is already empty');
            return;
        }
        setShowClearCartConfirmation(true);
    };

    const confirmClearCart = async () => {
        try {
            await clearCart();
            toast.success('Cart cleared successfully!');
        } catch (error) {
            toast.error('Failed to clear cart');
            console.error('Clear cart error:', error);
        } finally {
            setShowClearCartConfirmation(false);
        }
    };

    const formatPrice = (price) => {
        const currencyCode = currency === '$' ? 'USD' : currency;
        return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: currencyCode 
        }).format(price || 0);
    };

    if ((isShopLoading || !isCartLoaded) && cartItems.length === 0) {
        return (
            <div className="loader flex justify-center items-center h-screen">
                <InlineLoader />
            </div>
        );
    }

    const CartItem = ({ item, index }) => {
        if (!item || !item.product) {
            console.error('Invalid cart item:', item);
            return null;
        }

        const product = item.product || products.find(p => p._id === item.product?._id);
        if (!product || !product._id) {
            console.error('Product not found for item:', item);
            return null;
        }

        const imageUrl = product?.image?.[0] 
            ? `https://server-e-commerce-seven.vercel.app${product.image[0]}`
            : 'https://via.placeholder.com/150';

        return (
            <div
                key={`${product._id}-${item.size}`}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
                <div className="flex items-start gap-6">
                    <img 
                        className="w-16 sm:w-20 object-cover" 
                        src={imageUrl} 
                        alt={product?.name || 'Product'} 
                    />
                    <div>
                        <p className="text-xs sm:text-lg font-medium">
                            {product?.name || 'Unnamed Product'}
                        </p>
                        <div className="flex items-center gap-5 mt-2">
                            <p>{formatPrice(product?.price)}</p>
                            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                                {item.size || 'NS'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="px-2 py-1 border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                        disabled={isCartLoading}
                    >
                        -
                    </button>
                    <span className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center">
                        {item.quantity || 1}
                    </span>
                    <button
                        className="px-2 py-1 border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                        disabled={isCartLoading}
                    >
                        +
                    </button>
                </div>
                <button 
                    onClick={() => handleRemove(item.product._id, item.size)}
                    disabled={isCartLoading}
                >
                    <img
                        className="w-4 mr-4 sm:w-5 cursor-pointer"
                        src={assets.bin_icon}
                        alt="Remove"
                        aria-label="Remove item"
                    />
                </button>
            </div>
        );
    };

    return (
        <div className="border-t pt-14">
            <ToastContainer position="bottom-right" autoClose={3000} />
            
            <div className="text-2xl mb-3">
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div>
                {cartItems.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-gray-500">Your cart is empty</p>
                    </div>
                ) : (
                    cartItems
                        .filter(item => item && item.product && item.product._id)
                        .map((item, index) => (
                            <CartItem key={`${item.product._id}-${index}-${item.size}`} item={item} index={index} />
                        ))
                )}
            </div>

            {showDeleteConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">Remove this item?</p>
                        <div className="flex gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={confirmRemove}
                                disabled={isCartLoading}
                            >
                                {isCartLoading ? 'Processing...' : 'Yes, Remove'}
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={cancelRemove}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showClearCartConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">Clear your entire cart?</p>
                        <div className="flex gap-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={confirmClearCart}
                                disabled={isCartLoading}
                            >
                                {isCartLoading ? 'Clearing...' : 'Yes, Clear'}
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={() => setShowClearCartConfirmation(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="flex justify-end my-20">
                    <div className="w-full sm:w-[450px]">
                        <div className="w-full">
                            <div className="text-2xl">
                                <Title text1={'CART'} text2={'TOTALS'} />
                            </div>

                            <div className="flex flex-col gap-2 mt-2 text-sm">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>{formatPrice(contextSubtotal)}</p>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <p>Shipping Fee</p>
                                    <p>{formatPrice(shippingFee)}</p>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <b>Total</b>
                                    <b>{formatPrice(total)}</b>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-8">
                            <button
                                onClick={handleClearCart}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                                disabled={isCartLoading}
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={handleCartClick}
                                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                                disabled={isCartLoading}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;