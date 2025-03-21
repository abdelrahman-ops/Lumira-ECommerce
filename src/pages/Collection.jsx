import { useMemo, useState } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery";
import ProductItem from "../components/ProductCard";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Collection = () => {
    const [show, setShow] = useState(true);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortBy, setSortBy] = useState("relevant");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: products, isLoading, isError } = useProductsQuery();

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
        <>
            {/* 🛠️ Search Bar with Debouncing */}
            <div className="border-t border-b bg-gray-50 text-center">
                <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                    <input
                        className="flex-1 outline-none bg-inherit text-sm"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img className="w-4" src={assets.search_icon} alt="" />
                </div>
                {searchTerm && (
                    <img
                        className="inline w-3 cursor-pointer"
                        src={assets.cross_icon}
                        alt="Clear"
                        onClick={() => setSearchTerm("")}
                    />
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
                {/* 🛠️ Sidebar Filters */}
                <div className="min-w-60">
                    <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
                        FILTERS
                        <img
                            src={assets.dropdown_icon}
                            alt="Dropdown"
                            className={`h-3 sm:hidden ${show ? "rotate-90" : ""}`}
                            onClick={() => setShow(!show)}
                        />
                    </p>

                    {/* 🛠️ Category Filters */}
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${show ? "" : "hidden"}`}>
                        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            {["Men", "Women", "Kids"].map((cat) => (
                                <label key={cat} className="flex gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={cat}
                                        checked={category.includes(cat)}
                                        onChange={() => toggleCategory(cat)}
                                    />
                                    {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 🛠️ SubCategory Filters */}
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${show ? "" : "hidden"}`}>
                        <p className="mb-3 text-sm font-medium">TYPE</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                                <label key={sub} className="flex gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={sub}
                                        checked={subCategory.includes(sub)}
                                        onChange={() => toggleSubCategory(sub)}
                                    />
                                    {sub}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 🛠️ Product Listing */}
                <div className="flex-1">
                    <div className="flex justify-between text-base sm:text-2xl mb-4">
                        <Title text1="ALL" text2="COLLECTION" />
                        <select
                            className="border-2 border-gray-300 text-sm px-2"
                            onChange={(e) => setSortBy(e.target.value)}
                            value={sortBy}
                        >
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center">Loading...</div>
                    ) : isError ? (
                        <div className="flex justify-center items-center">Failed to load products.</div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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
                                <div className="text-center w-full">No products available</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Collection;