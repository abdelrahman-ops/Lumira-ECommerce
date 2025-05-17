import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { assets } from '../assets/assets';
import Title from '../components/common/Title';
import InlineLoader from '../components/utility/InlineLoader';
import { url } from '../components/constant/URL';

// Memoized CartItem component for better performance
const CartItem = memo(function CartItem({ item, index, onQuantityChange, onRemove, isCartLoading }) {
  const product = item?.product;
  
  if (!product || !product._id) {
    console.error('Invalid cart item:', item);
    return null;
  }

  const imageUrl = product?.image?.[0] 
    ? `${url}${product.image[0]}`
    : assets.placeholder_image;

  return (
    <div className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
      <div className="flex items-start gap-6">
        <img 
          className="w-16 sm:w-20 object-cover" 
          src={imageUrl} 
          alt={product?.name || 'Product'} 
          loading="lazy"
        />
        <div>
          <p className="text-xs sm:text-lg font-medium">
            {product?.name || 'Unnamed Product'}
          </p>
          <div className="flex items-center gap-5 mt-2">
            <p>{formatPrice(product?.price)}</p>
            <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
              {item.size || 'One Size'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="px-2 py-1 border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => onQuantityChange(index, (item.quantity || 1) - 1)}
          disabled={isCartLoading}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center">
          {item.quantity || 1}
        </span>
        <button
          className="px-2 py-1 border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          onClick={() => onQuantityChange(index, (item.quantity || 1) + 1)}
          disabled={isCartLoading}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button 
        onClick={() => onRemove(item.product._id, item.size)}
        disabled={isCartLoading}
        aria-label="Remove item"
      >
        <img
          className="w-4 mr-4 sm:w-5 cursor-pointer"
          src={assets.bin_icon}
          alt="Remove"
        />
      </button>
    </div>
  );
});
CartItem.displayName = "CartItem";

// Price formatter function
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

  const shippingFee = 10;
  const total = contextSubtotal > 0 ? contextSubtotal + shippingFee : 0;

  // Handlers with useCallback for performance
  const handleCartClick = useCallback(() => {
    if (isAuthenticated) {
      navigate('/place-order');
    } else {
      navigate('/login');
      toast.info('You must log in to proceed to checkout');
    }
  }, [isAuthenticated, navigate]);

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

  const handleRemove = useCallback((itemId, itemSize) => {
    setItemToDelete({ itemId, itemSize });
    setShowDeleteConfirmation(true);
  }, []);

  const confirmRemove = useCallback(async () => {
    try {
      if (itemToDelete?.itemId) {
        await removeFromCart(itemToDelete.itemId, itemToDelete.itemSize);
        toast.success('Item removed from cart');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
    } finally {
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
    }
  }, [itemToDelete, removeFromCart]);

  const handleClearCart = useCallback(() => {
    if (cartItems.length === 0) {
      toast.info('Your cart is already empty');
      return;
    }
    setShowClearCartConfirmation(true);
  }, [cartItems.length]);

  const confirmClearCart = useCallback(async () => {
    try {
      await clearCart();
      toast.success('Cart cleared successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to clear cart');
    } finally {
      setShowClearCartConfirmation(false);
    }
  }, [clearCart]);

  // Loading state
  if ((isShopLoading || !isCartLoaded) && cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <InlineLoader />
      </div>
    );
  }

  return (
    <div className="border-t pt-14">
      <ToastContainer position="top-right" autoClose={3000} />
      
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
            .filter(item => item?.product?._id) // Ensure valid items
            .map((item, index) => (
              <CartItem 
                key={`${item.product._id}-${index}-${item.size}`} 
                item={item} 
                index={index}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
                isCartLoading={isCartLoading}
              />
            ))
        )}
      </div>

      {/* Confirmation Modals */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-lg font-semibold mb-4">Remove this item?</p>
            <div className="flex gap-4 justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={confirmRemove}
                disabled={isCartLoading}
              >
                {isCartLoading ? 'Processing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showClearCartConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-lg font-semibold mb-4">Clear your entire cart?</p>
            <div className="flex gap-4 justify-end">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowClearCartConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={confirmClearCart}
                disabled={isCartLoading}
              >
                {isCartLoading ? 'Clearing...' : 'Clear Cart'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Totals */}
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
                  <p>{formatPrice(contextSubtotal, currency)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>{formatPrice(shippingFee, currency)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <b>Total</b>
                  <b>{formatPrice(total, currency)}</b>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-8">
              <button
                onClick={handleClearCart}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                disabled={isCartLoading}
              >
                Clear Cart
              </button>
              <button
                onClick={handleCartClick}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
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