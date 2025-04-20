/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const SearchBar = ({ onSearch, instantResults, searchTerm, setSearchTerm }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = useCallback(
        debounce((value) => {
        onSearch(value);
        setIsTyping(false);
        }, 300),
        [onSearch]
    );

    const handleInputChange = (e) => {
        setIsTyping(true);
        setSearchTerm(e.target.value);
        handleSearchChange(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
        onSearch("");
        setIsTyping(false);
    };

    return (
        <div className="relative mb-8 transition-all duration-300">
            <div className="flex items-center bg-white rounded-full shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto border border-gray-200 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-200 transition-all duration-200">
                <div className="pl-4 pr-2">
                    <img 
                        className="w-5 h-5 opacity-70" 
                        src={assets.search_icon} 
                        alt="Search" 
                    />
                </div>
                <input
                    className="flex-1 outline-none bg-transparent px-4 py-3 text-sm placeholder-gray-500"
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    autoFocus
                />
                {searchTerm && (
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition-all mr-2"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
                        <img className="w-4 h-4" src={assets.cross_icon} alt="Clear" />
                    </button>
                )}
            </div>

            {(isFocused && (isTyping || (searchTerm && instantResults?.length > 0))) && (
                <div className="absolute left-0 right-0 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mt-2 max-h-96 overflow-y-auto">
                    {isTyping ? (
                        <div className="p-4 flex justify-center items-center">
                        <div className="animate-pulse flex items-center gap-2 text-gray-500">
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                            Searching...
                        </div>
                        </div>
                    ) : instantResults.length > 0 ? (
                        <ul className="py-2 divide-y divide-gray-100">
                        {instantResults.slice(0, 5).map((product) => (
                            <li
                            key={product._id}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-all"
                            onClick={() => {
                                setSearchTerm(product.name);
                                setIsTyping(false);
                                navigate(`/product/${product._id}`);
                            }}
                            >
                            <div className="flex items-center gap-4">
                                <img
                                src={`http://localhost:5000${product.image}`}
                                alt={product.name}
                                className="w-12 h-12 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{product.name}</p>
                                <p className="text-xs text-gray-500">
                                    ${product.price.toFixed(2)}
                                </p>
                                </div>
                                <div className="text-xs text-purple-600 font-medium">View</div>
                            </div>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <div className="p-4 text-center text-gray-500">No results found for "{searchTerm}"</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;