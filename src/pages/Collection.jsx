import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import { shop } from "../App";
import ProductItem from "../components/ProductCard";
import { memo, useContext, useEffect, useState } from "react";

const Collection = () => {
    const { products } = useContext(shop);

    const [show, setShow] = useState(true);
    const [filter, setFilter] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    // useEffect(() => {
    //     if (products && products.length > 0) {
    //         setFilter(products.slice(0, 52));
    //     }
    // }, [products]);

    useEffect(() => {
        function applyFilter() {
            if (products.length > 0) {
                let productcopy = [...products];
                if (category.length > 0) {
                    productcopy = productcopy.filter((el) => category.includes(el.category));
                }
                if (subCategory.length > 0) {
                    productcopy = productcopy.filter((el) => subCategory.includes(el.subCategory));
                }
                setFilter(productcopy);
            }
        }
        applyFilter();
    }, [category, subCategory, products]);

    function categoryFun(e) {
        const value = e.target.value;
        if (category.includes(value)) {
            setCategory(prev => prev.filter(el => el !== value));
        } else {
            setCategory(prev => [...prev, value]);
        }
    }

    function subCategoryFun(e) {
        const value = e.target.value;
        if (subCategory.includes(value)) {
            setSubCategory(prev => prev.filter(el => el !== value));
        } else {
            setSubCategory(prev => [...prev, value]);
        }
    }

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
                <div className="min-w-60">
                    <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
                        FILTERS
                        <img
                            src={assets.dropdown_icon} alt=""
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
                                    onChange={(e) => categoryFun(e)}
                                /> Men
                            </p>
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Women"
                                    onChange={(e) => categoryFun(e)}
                                /> Women
                            </p>
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Kids"
                                    onChange={(e) => categoryFun(e)}
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
                                    onChange={(e) => subCategoryFun(e)}
                                /> Topwear
                            </p>
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Bottomwear"
                                    onChange={(e) => subCategoryFun(e)}
                                /> Bottomwear
                            </p>
                            <p className="flex gap-2">
                                <input
                                    className="w-3"
                                    type="checkbox"
                                    value="Winterwear"
                                    onChange={(e) => subCategoryFun(e)}
                                /> Winterwear
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex justify-between text-base sm:text-2xl mb-4">
                        <Title text1="ALL" text2="COLLECTION" />
                        <select className="border-2 border-gray-300 text-sm px-2" name="" id="">
                            <option value="relevant">Sort by: Relevant</option>
                            <option value="low-high">Sort by: Low to High</option>
                            <option value="high-low">Sort by: High to Low</option>
                        </select>
                    </div>
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
                </div>
            </div>
        </>
    );
}

export default memo(Collection);


