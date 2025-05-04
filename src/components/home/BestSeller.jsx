import { memo, useEffect, useState } from "react";
import Title from "../common/Title";
import ProductCard from "../product/card/ProductCard";
import InlineLoader from "../utility/InlineLoader";
import { fetchProducts } from "../../services/api";

const BestSellers = () => {
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBestSellers = async () => {
            try {
                const products = await fetchProducts();
                const bestSellerProducts = products.filter(product => product.bestseller);
                setBestSellers(bestSellerProducts);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load best sellers");
            } finally {
                setLoading(false);
            }
        };

        loadBestSellers();
    }, []);

    return (
        <div className="my-10">
            <div className="text-center">
                <Title text1="BEST" text2="SELLERS" />
                <p className="mx-auto text-gray-600 text-sm max-w-md">
                    Customer favorites that never disappoint
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center mt-8">
                    <InlineLoader
                        size = "xl"
                        color="primary"
                        showText={true}
                        text="Loading Our Best Sellers..." 
                        className="my-8"
                    />
                </div>
            ) : error ? (
                <div className="text-center mt-8">
                    <p className="text-red-500 mb-2">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Try again
                    </button>
                </div>
            ) : bestSellers.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                        {bestSellers.map((product) => (
                            <ProductCard
                                key={product._id}
                                _id={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.image[0]}
                                sizes={product.sizes}
                                rating={product.rating}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <button className="text-sm text-blue-600 hover:underline">
                            View all bestsellers →
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center mt-8 text-gray-500">
                    Check back soon for our bestsellers
                </div>
            )}
        </div>
    );
};

export default memo(BestSellers);