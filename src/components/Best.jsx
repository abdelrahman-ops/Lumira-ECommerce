import { memo, useContext, useEffect, useState } from "react";
import Title from "./Title";
import { shop } from "../App";
import ProductItem from "./ProductCard";

const Latest = () => {
    const { products } = useContext(shop);
    const [latestCollection, setLatest] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            setLatest(products.slice(14, 24));
        }
    }, [products]);

    return (
        <div className="my-10">
            <div className="text-center py-8 text-3xl">
                <Title text1="BEST" text2="SELLERS" />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
                </p>
            </div>
            
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
        </div>
    );
};

export default memo(Latest);
