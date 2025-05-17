import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Title from "../common/Title";
import ProductCard from "../product/card/ProductCard";
import InlineLoader from "../utility/InlineLoader";
import { fetchProducts } from "../../services/api";
import { FiArrowRight } from "react-icons/fi";

const Latest = () => {
    const [latestCollection, setLatestCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const isProductNew = (createdAt) => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 365);
        
        return new Date(createdAt) > thirtyDaysAgo;
    };

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

    

    const handleViewAll = () => {
        navigate("/collection");
    };

    return (
        <div className="my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <Title text1="LATEST" text2="COLLECTION" />
                <motion.p 
                    className="mx-auto text-gray-600 text-sm sm:text-base max-w-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Fresh arrivals just for you
                </motion.p>
            </div>

            {loading ? (
                <motion.div 
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <InlineLoader
                        size="xl"
                        color="primary"
                        showText={true}
                        text="Loading New Arrivals..." 
                        className="my-8"
                    />
                </motion.div>
            ) : error ? (
                <motion.div 
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-red-500 mb-4">{error}</p>
                    <motion.button 
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Try again
                    </motion.button>
                </motion.div>
            ) : latestCollection.length > 0 ? (
                <>
                    <motion.div 
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {latestCollection.map((product) => (
                            <ProductCard
                                key={product._id}
                                _id={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.image[0]}
                                sizes={product.sizes}
                                rating={product.rating}
                                bestseller={product.bestseller}
                                isNew={isProductNew(product.createdAt || product.date)}
                            />
                        ))}
                    </motion.div>
                    <motion.div 
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.button 
                            onClick={handleViewAll}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>View all new arrivals</span>
                            <FiArrowRight className="w-4 h-4" />
                        </motion.button>
                    </motion.div>
                </>
            ) : (
                <motion.div 
                    className="text-center mt-8 text-gray-500 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    No new products available
                </motion.div>
            )}
        </div>
    );
};

export default memo(Latest);