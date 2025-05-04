import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ProductCard from "../card/ProductCard";
import { useProductsQuery } from "../../../hooks/useProductsQuery"; // adjust this path

const RelatedProducts = ({ category, currentProductId }) => {
    console.log(category, currentProductId);
    
    const navigate = useNavigate();
    const { data: products, isLoading, isError } = useProductsQuery();

    if (isLoading || isError) return null;

    const relatedProducts = products
        .filter(
            (product) =>
                product.category === category && product._id !== currentProductId
        )
        .slice(0, 4); // Limit to 8 suggestions

    return (
        <div>
            {relatedProducts.length > 0 && (
                <div className="mt-16">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">You May Also Like</h2>
                        <button
                            onClick={() => navigate(`/collection?categories=${category}`)}
                            className="text-sm text-gray-500 hover:text-black flex items-center"
                        >
                            View all in {category}{" "}
                            <FontAwesomeIcon icon={faChevronRight} className="ml-1 text-xs" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {relatedProducts.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                product={product}
                                _id={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.image[0]}
                                sizes={product.sizes}
                                rating={product.rating}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RelatedProducts;
