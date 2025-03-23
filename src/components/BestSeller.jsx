import { memo, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductCard";
// import Loader from "./Loader";
import InlineLoader from "./InlineLoader";

const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://server-e-commerce-seven.vercel.app/api/products");
                const data = await response.json();

                if (Array.isArray(data)) {
                    // Filter products where bestseller is true
                    const bestSellerProducts = data.filter((product) => product.bestseller === true);
                    setBestSellers(bestSellerProducts);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1="BEST" text2="SELLERS" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Explore our top-rated products selected by customers like you.
                </p>
            </div>

            {loading ? (
                // <div className="text-center">Loading...</div>
                // <Loader />
                <InlineLoader />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {bestSellers.length > 0 ? (
                        bestSellers.map((el) => (
                            <ProductItem
                                _id={el._id}
                                name={el.name}
                                price={el.price}
                                image={el.image[0]} // Use the first image
                                key={el._id}
                            />
                        ))
                    ) : (
                        <div>No best sellers available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(BestSellers);
