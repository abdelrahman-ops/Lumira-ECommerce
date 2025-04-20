/* eslint-disable react/no-unescaped-entities */
import { useMemo, useState, useCallback, useEffect } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import ProductItem from "../components/ProductCard";
import Title from "../components/Title";
import InlineLoader from "../components/InlineLoader";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";

import { assets } from "../assets/assets";

const Collection = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortBy, setSortBy] = useState("relevant");
    const [searchTerm, setSearchTerm] = useState("");
    // const [isTyping, setIsTyping] = useState(false);

    const { data: products, isLoading, isError } = useProductsQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    // const navigate = useNavigate();

    // Sync `category` from URL when component mounts or URL changes
    useEffect(() => {
        const categoryParam = searchParams.get("categories");
        if (categoryParam) {
            setCategory(categoryParam.split(","));
        } else {
            setCategory([]);
        }
    }, [searchParams]);

    // Update URL query when user changes category filter
    const toggleCategory = (value) => {
        let updatedCategories = category.includes(value)
            ? category.filter((el) => el !== value)
            : [...category, value];

        setCategory(updatedCategories);

        // Update query param
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (updatedCategories.length > 0) {
            newSearchParams.set("categories", updatedCategories.join(","));
        } else {
            newSearchParams.delete("categories");
        }
        setSearchParams(newSearchParams);
    };

    const toggleSubCategory = (value) => {
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((el) => el !== value) : [...prev, value]
        );
    };

    const handleSearch = useCallback((value) => {
        setSearchTerm(value);
    }, []);

    const instantSearchResults = useMemo(() => {
        if (!products || !searchTerm) return [];
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = [...products];

        if (category.length > 0) {
            filtered = filtered.filter((el) => category.includes(el.category));
        }

        if (subCategory.length > 0) {
            filtered = filtered.filter((el) => subCategory.includes(el.subCategory));
        }

        if (searchTerm) {
            filtered = filtered.filter((el) =>
                el.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortBy === "low-high") {
            return filtered.sort((a, b) => a.price - b.price);
        }
        if (sortBy === "high-low") {
            return filtered.sort((a, b) => b.price - a.price);
        }

        return filtered;
    }, [products, category, subCategory, searchTerm, sortBy]);

    const categories = ["Men", "Women", "Kids"];
    const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Toggle Button */}
                <div className="flex justify-end mb-6">
                    <button
                        className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all"
                        onClick={() => {
                            setShowSearch(!showSearch);
                            if (showSearch) setSearchTerm("");
                        }}
                        aria-label={showSearch ? "Close search" : "Open search"}
                    >
                        <svg 
                            className="w-6 h-6 text-gray-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                            />
                        </svg>
                    </button>
                </div>

                {/* Search Bar Component */}
                {showSearch && (
                    <SearchBar
                        onSearch={handleSearch}
                        instantResults={instantSearchResults}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                )}

                <div className="flex flex-col lg:flex-row gap-6 pt-4">
                    {/* Filters Sidebar */}
                    <div className="lg:w-64">
                        <div className="flex justify-between items-center lg:block sticky top-4 z-10 bg-white p-2 rounded-lg shadow-sm lg:shadow-none lg:bg-transparent">
                            <h2 className="text-xl font-bold text-gray-800">FILTERS</h2>
                            <button
                                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-all"
                                onClick={() => setShowFilters(!showFilters)}
                                aria-expanded={showFilters}
                                aria-controls="filters-section"
                            >
                                <img
                                    src={assets.dropdown_icon}
                                    alt="Toggle filters"
                                    className={`h-3 transition-transform ${showFilters ? "rotate-180" : ""}`}
                                />
                            </button>
                        </div>

                        <div 
                            id="filters-section"
                            className={`bg-white border border-gray-200 rounded-lg p-5 mt-2 shadow-sm lg:shadow-none ${showFilters ? "block" : "hidden lg:block"} sticky top-20`}
                        >
                            <div className="space-y-6">
                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-gray-800 uppercase tracking-wider">CATEGORIES</h3>
                                    <div className="space-y-2">
                                        {categories.map((cat) => (
                                            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        value={cat}
                                                        checked={category.includes(cat)}
                                                        onChange={() => toggleCategory(cat)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-5 h-5 rounded border border-gray-300 bg-white peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all flex items-center justify-center">
                                                        {category.includes(cat) && (
                                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                                                    {cat}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-semibold text-gray-800 uppercase tracking-wider">TYPE</h3>
                                    <div className="space-y-2">
                                        {subCategories.map((sub) => (
                                            <label key={sub} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative">
                                                    <input
                                                        type="checkbox"
                                                        value={sub}
                                                        checked={subCategory.includes(sub)}
                                                        onChange={() => toggleSubCategory(sub)}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-5 h-5 rounded border border-gray-300 bg-white peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all flex items-center justify-center">
                                                        {subCategory.includes(sub) && (
                                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                                                    {sub}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <Title text1="ALL" text2="COLLECTION" />
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 hidden sm:block">Sort by:</span>
                                <select
                                    className="border border-gray-300 text-sm px-4 py-2 rounded-full bg-white shadow-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjY3NThhIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[center_right_0.5rem] pr-8"
                                    onChange={(e) => setSortBy(e.target.value)}
                                    value={sortBy}
                                >
                                    <option value="relevant">Most Relevant</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <InlineLoader />
                            </div>
                        ) : isError ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
                                <p className="text-gray-500 max-w-md">We're having trouble loading the products. Please try again later.</p>
                                <button 
                                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                    onClick={() => window.location.reload()}
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <>
                                {filteredProducts.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                        {filteredProducts.map((el) => (
                                            <ProductItem
                                                key={el._id}
                                                _id={el._id}
                                                name={el.name}
                                                price={el.price}
                                                image={el.image}
                                                sizes={el.sizes}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-16 text-center">
                                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                                        <p className="text-gray-500 max-w-md mb-4">
                                            {searchTerm 
                                                ? `We couldn't find any products matching "${searchTerm}"`
                                                : "Try adjusting your filters to find what you're looking for."}
                                        </p>
                                        <button 
                                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                            onClick={() => {
                                                setSearchTerm("");
                                                setCategory([]);
                                                setSubCategory([]);
                                            }}
                                        >
                                            Clear filters
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collection;