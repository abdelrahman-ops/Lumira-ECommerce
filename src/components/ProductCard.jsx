import { useContext } from "react";
import { shop } from "../App";
import { Link } from "react-router-dom";


const ProductCard = ({ _id, name, price, image }) => {
    const { currency } = useContext(shop);
    
    // const [isFavorited, setIsFavorited] = useState(false);

    // const handleFavoriteClick = () => {
    //     setIsFavorited(!isFavorited);
    // };

    return (
        <Link to={`/product/${_id}`}>
            <div className="text-gray-700 cursor-pointer">
                <div className="overflow-hidden">
                    <img src={image} alt={name} className="hover:scale-110 transition ease-in-out" />
                </div>
                <div>
                    <p className="pt-3 pb-1 text-sm h-16">{name}</p>
                    <div className="flex justify-between text-sm font-medium">
                        {currency}{price}
                        <div className="flex items-center gap-2">
                            {/* <button className="p-0 m-0" onClick={handleFavoriteClick}>
                                <span className={`material-symbols-outlined transition ease-in-out ${
                                isFavorited ? 'text-red-600' : 'text-gray-500'
                            }`}>favorite</span> 
                            </button> */}
                            <button className="p-0 m-0">
                                <span className="material-symbols-outlined">favorite</span> 
                            </button>
                            <button className="p-0 m-0">
                                <span className="material-symbols-outlined">add_shopping_cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

        
    );
};

export default ProductCard;
