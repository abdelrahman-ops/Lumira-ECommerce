import { useContext } from "react";
import { shop } from "../App";
import { Link } from "react-router-dom";


const ProductCard = ({ _id, name, price, image }) => {
    const { currency } = useContext(shop);
    console.log();
    
    return (
        <div className="text-gray-700 cursor-pointer">
            <div className="overflow-hidden">
                <img src={image} alt={name} className="hover:scale-110 transition ease-in-out" />
            </div>
            <div>
                <p className="pt-3 pb-1 text-sm">{name}</p>
                <p className="text-sm font-medium">
                    {currency}
                    {price}
                </p>
            </div>
            <div>
                <Link to={`/product/${_id}`} className="btn btn-primary">Watch More</Link>
                <button className="btn btn-secondary">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
