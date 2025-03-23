import { useMemo, useState, useCallback } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import ProductItem from "../components/ProductCard";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import InlineLoader from "../components/InlineLoader";
import { debounce } from "lodash"; // For debouncing search input

const Collection = () => {
    const [showFilters, setShowFilters] = useState(false); // Toggle filters on mobile
    const [showSearch, setShowSearch] = useState(false); // Toggle search bar
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortBy, setSortBy] = useState("relevant");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: products, isLoading, isError } = useProductsQuery();

    // 🛠️ Debounced search handler
    const handleSearch = useCallback(
        debounce((value) => {
            setSearchTerm(value);
        }, 300),
        []
    );

    // 🛠️ Filter products for instant search results
    const instantSearchResults = useMemo(() => {
        if (!products || !searchTerm) return [];
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    // 🛠️ Optimized Filtering & Sorting Logic using `useMemo`
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = [...products];

        // Apply category filter
        if (category.length > 0) {
            filtered = filtered.filter((el) => category.includes(el.category));
        }

        // Apply subcategory filter
        if (subCategory.length > 0) {
            filtered = filtered.filter((el) => subCategory.includes(el.subCategory));
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter((el) =>
                el.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting logic
        if (sortBy === "low-high") {
            return filtered.sort((a, b) => a.price - b.price);
        }
        if (sortBy === "high-low") {
            return filtered.sort((a, b) => b.price - a.price);
        }
        return filtered;
    }, [products, category, subCategory, searchTerm, sortBy]);

    // 🛠️ Update category selection
    const toggleCategory = (value) => {
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((el) => el !== value) : [...prev, value]
        );
    };

    // 🛠️ Update sub-category selection
    const toggleSubCategory = (value) => {
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((el) => el !== value) : [...prev, value]
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 🛠️ Search Bar with Toggle */}
                <div className="flex justify-end my-6">
                    <button
                        className="p-2 rounded-full hover:bg-gray-100 transition-all"
                        onClick={() => setShowSearch(!showSearch)}
                    >
                        <img className="w-6" src={assets.search_icon} alt="Search" />
                    </button>
                </div>

                {showSearch && (
                    <div className="relative mb-8">
                        <div className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 p-1 rounded-full shadow-lg w-full sm:w-1/2 mx-auto">
                            <input
                                className="flex-1 outline-none bg-white rounded-full px-6 py-3 text-sm placeholder-gray-500"
                                type="text"
                                placeholder="Search for products..."
                                value={searchTerm}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            {searchTerm && (
                                <button
                                    className="p-2 rounded-full hover:bg-gray-100 transition-all"
                                    onClick={() => setSearchTerm("")}
                                >
                                    <img className="w-4" src={assets.cross_icon} alt="Clear" />
                                </button>
                            )}
                        </div>

                        {/* 🛠️ Instant Search Results Dropdown */}
                        {searchTerm && instantSearchResults.length > 0 && (
                            <div className="absolute left-0 right-0 mx-auto bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-full sm:w-1/2 mt-2">
                                <ul className="py-2">
                                    {instantSearchResults.map((product) => (
                                        <li
                                            key={product._id}
                                            className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition-all"
                                            onClick={() => {
                                                setSearchTerm(product.name); // Auto-fill search bar with selected product
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium">{product.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        ${product.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-6 pt-10">
                    {/* 🛠️ Sidebar Filters */}
                    <div className="sm:min-w-60">
                        <div className="flex justify-between items-center sm:block">
                            <p className="my-2 text-xl font-bold text-gray-800">FILTERS</p>
                            <button
                                className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition-all"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <img
                                    src={assets.dropdown_icon}
                                    alt="Dropdown"
                                    className={`h-3 ${showFilters ? "rotate-90" : ""}`}
                                />
                            </button>
                        </div>

                        {/* 🛠️ Category Filters */}
                        <div className={`bg-white border border-gray-200 rounded-lg p-5 mt-6 ${showFilters ? "block" : "hidden sm:block"}`}>
                            <p className="mb-3 text-sm font-medium text-gray-700">CATEGORIES</p>
                            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                                {["Men", "Women", "Kids"].map((cat) => (
                                    <label key={cat} className="flex gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={cat}
                                            checked={category.includes(cat)}
                                            onChange={() => toggleCategory(cat)}
                                            className="accent-purple-500"
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 🛠️ SubCategory Filters */}
                        <div className={`bg-white border border-gray-200 rounded-lg p-5 mt-6 ${showFilters ? "block" : "hidden sm:block"}`}>
                            <p className="mb-3 text-sm font-medium text-gray-700">TYPE</p>
                            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                                {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                                    <label key={sub} className="flex gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={sub}
                                            checked={subCategory.includes(sub)}
                                            onChange={() => toggleSubCategory(sub)}
                                            className="accent-purple-500"
                                        />
                                        {sub}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 🛠️ Product Listing */}
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <Title text1="ALL" text2="COLLECTION" />
                            <select
                                className="border-2 border-gray-300 text-sm px-4 py-2 rounded-full bg-white shadow-sm focus:outline-none focus:border-purple-500"
                                onChange={(e) => setSortBy(e.target.value)}
                                value={sortBy}
                            >
                                <option value="relevant">Sort by: Relevant</option>
                                <option value="low-high">Sort by: Low to High</option>
                                <option value="high-low">Sort by: High to Low</option>
                            </select>
                        </div>

                        {isLoading ? (
                            <InlineLoader />
                        ) : isError ? (
                            <div className="flex justify-center items-center text-red-500">
                                Failed to load products.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((el) => (
                                        <ProductItem
                                            key={el._id}
                                            _id={el._id}
                                            name={el.name}
                                            price={el.price}
                                            image={el.image}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center w-full text-gray-500">
                                        No products available.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Collection;