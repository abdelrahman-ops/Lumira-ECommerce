import { useContext } from "react";
import { shop } from "../App";
import { Link } from "react-router-dom";

const ProductCard = ({ _id, name, price, image }) => {
    const { currency } = useContext(shop);

    return (
        <Link to={`/product/${_id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                {/* Product Image */}
                <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                    <img
                        src={`https://server-e-commerce-seven.vercel.app${image}`}
                        alt={name}
                        className="w-full h-full object-cover hover:scale-110 transition ease-in-out"
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
                            {currency}{price}
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
                            >
                                <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
