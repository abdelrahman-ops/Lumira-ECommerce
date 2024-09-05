import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { shop } from "../App";
import { assets } from "../assets/frontend_assets/assets";

// import { useEffect, useState } from 'react';


const ProductDetail = () => {
    const { products } = useContext(shop); 
    const {currency} = useContext(shop);
    const { id } = useParams();
    
    // const [loading, setLoading] = useState(true);
    // const [product, setProduct] = useState(null);

    // useEffect(() => {
    //     const productData = products.find(prod => prod._id === id);
        
    //     setTimeout(() => {
    //         setProduct(productData);
    //         setLoading(false); 
    //     }, 1000);
    // }, [id, products]);

    // if (loading) {
    //     return <div className="loader"></div>;
    // }

    // if (!product) {
    //     return <div>Product not found</div>;
    // }

    const product = products.find(prod => prod._id === id);

    if (!product) return <div className="loader"></div>;

    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto  justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        <img src={product.image} alt="" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img src={product.image} alt="" className='w-full h-auto' />
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
                    <div className=" flex items-center gap-1 mt-2">
                        {[...Array(4)].map((_,index) => (
                            <img key={index} src={assets.star_icon} alt="" className="w-3 5" />
                        ))}
                        
                        <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                            <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">
                        {currency}
                        {product.price}
                    </p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>
                        A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
                    </p>
                    <div className='flex flex-col gap-4 my-8'>
                        <p>Select Size</p>
                        <div className='flex gap-2'>
                            <button className="border py-2 px-4 bg-gray-100 ">S</button>
                            <button className="border py-2 px-4 bg-gray-100 ">M</button>
                            <button className="border py-2 px-4 bg-gray-100 ">L</button>
                            <button className="border py-2 px-4 bg-gray-100 ">XL</button>
                            <button className="border py-2 px-4 bg-gray-100 ">XXL</button>
                        </div>
                    </div>
                    <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
                
            </div>
            
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>{product.description}</p>
                </div>
            </div>
            <div className='my-24'></div>
        </div>
    );
};

export default ProductDetail;
