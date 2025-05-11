/* eslint-disable react/no-unescaped-entities */
import { useMemo, useState, useCallback, useEffect } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import ProductCard from "../components/product/card/ProductCard";
import Title from "../components/common/Title";
import InlineLoader from "../components/utility/InlineLoader";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/utility/SearchBar";
import { FiSearch, FiFilter, FiX, FiChevronDown, FiCheck, FiAlertCircle, FiFrown } from "react-icons/fi";

const Collection = () => {
    const [showFilters, setShowFilters] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortBy, setSortBy] = useState("relevant");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: products, isLoading, isError } = useProductsQuery();
    const [searchParams, setSearchParams] = useSearchParams();

    // Sync `category` from URL
    useEffect(() => {
        const categoryParam = searchParams.get("categories");
        if (categoryParam) {
            setCategory(categoryParam.split(","));
        } else {
            setCategory([]);
        }
    }, [searchParams]);

    const toggleCategory = (value) => {
        let updatedCategories = category.includes(value)
            ? category.filter((el) => el !== value)
            : [...category, value];

        setCategory(updatedCategories);

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
        <div className="min-h-screen ">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 py-10">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-200 filter blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-indigo-200 filter blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-1">
                        <Title text1={"OUR"} text2={"Collection"} />
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
                            Discover timeless pieces crafted with exceptional attention to detail
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-0 py-12 -mt-16 relative z-10">
                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 lg:px-8">
                    {/* Search Button */}
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                        onClick={() => {
                            setShowSearch(!showSearch);
                            if (showSearch) setSearchTerm("");
                        }}
                        aria-label={showSearch ? "Close search" : "Open search"}
                    >
                        {showSearch ? (
                            <FiX className="w-5 h-5 text-gray-600" />
                        ) : (
                            <FiSearch className="w-5 h-5 text-gray-600" />
                        )}
                        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                            {showSearch ? "Close" : "Search"}
                        </span>
                    </button>

                    {/* Filter Button (Mobile) */}
                    <button
                        className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                        onClick={() => setShowFilters(!showFilters)}
                        aria-expanded={showFilters}
                    >
                        <FiFilter className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Filters</span>
                    </button>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-3 ml-auto">
                        <span className="text-sm text-gray-600 hidden sm:block">Sort by:</span>
                        <div className="relative">
                            <select
                                className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-8 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                onChange={(e) => setSortBy(e.target.value)}
                                value={sortBy}
                            >
                                <option value="relevant">Most Relevant</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <FiChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                {showSearch && (
                    <div className="mb-8">
                        <SearchBar
                            onSearch={handleSearch}
                            instantResults={instantSearchResults}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8 ">
                    {/* Filters Sidebar */}
                    <div className={`lg:w-72 bg-white rounded-3xl shadow-md p-6 h-fit lg:sticky lg:top-8 ${showFilters ? "block" : "hidden lg:block"} 
                    bg-gradient-to-r from-blue-50 to-indigo-50  border-2 ` }>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-900">FILTERS</h2>
                            <button
                                className="lg:hidden p-1 rounded-full hover:bg-gray-100"
                                onClick={() => setShowFilters(false)}
                            >
                                <FiX className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="space-y-8 ">
                            {/* Categories */}
                            <div>
                                <h3 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categories</h3>
                                <div className="space-y-3">
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
                                                <div className="w-5 h-5 rounded border border-gray-300 bg-white peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all flex items-center justify-center">
                                                    {category.includes(cat) && (
                                                        <FiCheck className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                                                {cat}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Subcategories */}
                            <div>
                                <h3 className="mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Collections</h3>
                                <div className="space-y-3">
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
                                                <div className="w-5 h-5 rounded border border-gray-300 bg-white peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all flex items-center justify-center">
                                                    {subCategory.includes(sub) && (
                                                        <FiCheck className="w-3 h-3 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                                                {sub}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="flex-1">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center h-96 space-y-6">
                                <InlineLoader 
                                    size="xl"
                                    color="primary"
                                    showText={true}
                                    text="Loading Collection..." 
                                    className="my-8"
                                />
                                <p className="text-gray-500 text-sm max-w-md text-center px-4">
                                    We're gathering the finest items for you. Please wait a moment...
                                </p>
                            </div>
                        ) : isError ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                                    <FiAlertCircle className="w-8 h-8 text-red-500" />
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">Failed to load collection</h3>
                                <p className="text-gray-500 max-w-md mb-6">
                                    We're having trouble loading the products. Please try again later.
                                </p>
                                <button 
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                    onClick={() => window.location.reload()}
                                >
                                    <span>Retry</span>
                                </button>
                            </div>
                        ) : (
                            <>
                                {filteredProducts.length > 0 ? (
                                    <>
                                        <div className="mb-6 flex justify-between items-center">
                                            <h2 className="text-2xl font-light text-gray-900">
                                                <span className="font-serif italic">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "Item" : "Items"}
                                            </h2>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                                            {filteredProducts.map((el) => (
                                                <ProductCard
                                                    key={el._id}
                                                    _id={el._id}
                                                    name={el.name}
                                                    price={el.price}
                                                    image={el.image}
                                                    sizes={el.sizes}
                                                />
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <FiFrown className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-medium text-gray-900 mb-2">
                                            {searchTerm ? "No matching items" : "No products found"}
                                        </h3>
                                        <p className="text-gray-500 max-w-md mb-6">
                                            {searchTerm 
                                                ? `We couldn't find any products matching "${searchTerm}"`
                                                : "Try adjusting your filters to find what you're looking for."}
                                        </p>
                                        <button 
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                                            onClick={() => {
                                                setSearchTerm("");
                                                setCategory([]);
                                                setSubCategory([]);
                                            }}
                                        >
                                            <span>Clear filters</span>
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