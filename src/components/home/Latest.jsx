import { memo, useEffect, useState } from "react";
import Title from "../common/Title";
import ProductCard from "../product/card/ProductCard";
import InlineLoader from "../utility/InlineLoader";
import { fetchProducts } from "../../services/api";

const Latest = () => {
    const [latestCollection, setLatestCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadLatestProducts = async () => {
            try {
                const products = await fetchProducts();
                const sortedProducts = [...products].sort((a, b) => 
                    new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
                );
                setLatestCollection(sortedProducts.slice(0, 10));
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load latest collection");
            } finally {
                setLoading(false);
            }
        };

        loadLatestProducts();
    }, []);

    return (
        <div className="my-10">
            <div className="text-center">
                <Title text1="LATEST" text2="COLLECTION" />
                <p className="mx-auto text-gray-600 text-sm max-w-md">
                    Fresh arrivals just for you
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center mt-8">
                    <InlineLoader />
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
            ) : latestCollection.length > 0 ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                        {latestCollection.map((product) => (
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
                            View all new arrivals →
                        </button>
                    </div>
                </>
            ) : (
                <div className="text-center mt-8 text-gray-500">
                    No new products available
                </div>
            )}
        </div>
    );
};

export default memo(Latest);