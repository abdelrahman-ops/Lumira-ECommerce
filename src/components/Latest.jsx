import { memo, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductCard";
import InlineLoader from "./InlineLoader";

const Latest = () => {
    const [latestCollection, setLatestCollection] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products from the API
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://server-e-commerce-seven.vercel.app/api/products");
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    // Sort products by date and get the last 10 products
                    const sortedProducts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                    const latestProducts = sortedProducts.slice(0, 10);
                    setLatestCollection(latestProducts);
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
                <Title text1="LATEST" text2="COLLECTION" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>

            {loading ? (
                // <div className="text-center">Loading...</div>
                <InlineLoader />
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                    {latestCollection.length > 0 ? (
                        latestCollection.map((el) => (
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
    );
};

export default memo(Latest);
