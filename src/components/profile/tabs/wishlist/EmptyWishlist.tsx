import { FaRegHeart } from "react-icons/fa";

export default function EmptyWishlist() {
    return (
        <div className="flex flex-col items-center justify-center py-12
        space-y-6 p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-300 border-2">
            <div className="text-gray-300 text-5xl mb-4">
                <FaRegHeart className="w-8 h-8"/>
            </div>
            <p className="text-gray-600 text-lg">Your wishlist is empty</p>
            <p className="text-gray-400 text-sm mt-1">Start adding items you love</p>
        </div>
    );
}