const CART_CONFIG = {
    maxQuantity: 100,
    guestCartKey: 'cart-store',
    debounceTime: 500,
    maxPrice: 100000
};

export const MESSAGES = {
    errors: {
        add: 'Failed to add item to cart',
        remove: 'Failed to remove item from cart',
        update: 'Failed to update cart item',
        clear: 'Failed to clear cart',
        transfer: 'Failed to transfer cart',
        load: 'Failed to load cart',
        validation: {
            invalidItem: 'Invalid cart item',
            maxQuantity: `Maximum quantity per item is ${CART_CONFIG.maxQuantity}`,
            maxPrice: `Maximum price exceeded`
        }
    },
    success: {
        add: 'Item added to cart!',
        remove: 'Item removed from cart!',
        update: 'Quantity updated!',
        clear: 'Cart cleared successfully!',
        transfer: 'Cart transferred successfully!'
    }
};