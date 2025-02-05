import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductCard";
import { memo, useEffect, useState } from "react";
import { useProductsQuery } from "../hooks/useProductsQuery"; // Import the custom hook

const Collection = () => {
    const [show, setShow] = useState(true);
    const [filter, setFilter] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortBy, setSortBy] = useState("relevant");
    const [searchTerm, setSearchTerm] = useState("");

    const { data: products, isLoading, isError } = useProductsQuery();

    useEffect(() => {
        function applyFilter() {
            if (!products) return; // Ensure products are available

            let productcopy = [...products];
            if (category.length > 0) {
                productcopy = productcopy.filter((el) => category.includes(el.category));
            }
            if (subCategory.length > 0) {
                productcopy = productcopy.filter((el) => subCategory.includes(el.subCategory));
            }
            if (searchTerm) {
                productcopy = productcopy.filter((el) =>
                    el.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Sorting logic
            if (sortBy === "low-high") {
                productcopy = productcopy.sort((a, b) => a.price - b.price);
            } else if (sortBy === "high-low") {
                productcopy = productcopy.sort((a, b) => b.price - a.price);
            }

            setFilter(productcopy);
        }

        applyFilter();
    }, [category, subCategory, products, sortBy, searchTerm]);

    const categoryFun = (e) => {
        const value = e.target.value;
        if (category.includes(value)) {
            setCategory((prev) => prev.filter((el) => el !== value));
        } else {
            setCategory((prev) => [...prev, value]);
        }
    };

    const subCategoryFun = (e) => {
        const value = e.target.value;
        if (subCategory.includes(value)) {
            setSubCategory((prev) => prev.filter((el) => el !== value));
        } else {
            setSubCategory((prev) => [...prev, value]);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    return (
        <>
            <div className="border-t border-b bg-gray-50 text-center">
                <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                    <input
                        className="flex-1 outline-none bg-inherit text-sm"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <img className="w-4" src={assets.search_icon} alt="" />
                </div>
                {searchTerm && (
                    <img
                        className="inline w-3 cursor-pointer"
                        src={assets.cross_icon}
                        alt=""
                        onClick={clearSearch}
                    />
                )}
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
                <div className="min-w-60">
                    <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
                        FILTERS
                        <img
                            src={assets.dropdown_icon}
                            alt=""
                            className={`h-3 sm:hidden ${show ? "rotate-90" : ""}`}
                            onClick={() => setShow(!show)}
                        />
                    </p>
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${show ? "" : "hidden"}`}>
                        <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Men"
                                    onChange={categoryFun}
                                /> Men
                            </p>
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Women"
                                    onChange={categoryFun}
                                /> Women
                            </p>
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Kids"
                                    onChange={categoryFun}
                                /> Kids
                            </p>
                        </div>
                    </div>
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${show ? "" : "hidden"}`}>
                        <p className="mb-3 text-sm font-medium">TYPE</p>
                        <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Topwear"
                                    onChange={subCategoryFun}
                                /> Topwear
                            </p>
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Bottomwear"
                                    onChange={subCategoryFun}
                                /> Bottomwear
                            </p>
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Winterwear"
                                    onChange={subCategoryFun}
                                /> Winterwear
                            </p>
                        </div>
                    </div>
                </div>

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
                            {filter.length > 0 ? (
                                filter.map((el) => (
                                    <ProductItem
                                        _id={el._id}
                                        name={el.name}
                                        price={el.price}
                                        image={el.image}
                                        key={el._id}
                                    />
                                ))
                            ) : (
                                <div>No products available</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default memo(Collection);