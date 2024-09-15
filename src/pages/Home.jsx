// import  { useEffect, useState } from 'react';
// import Cards from '../components/Cards';
import { assets } from "../assets/frontend_assets/assets"
import Best from '../components/Best';
import Hero from '../components/Hero';
import Latest from '../components/Latest';
import Settler from '../components/Settler';
// import Title from "../components/Title";

const Home = () => {
    return(
        <div>
            <Hero />
            <Latest />
            <Best />
            <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
                <div>
                    <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
                    <p className="font-semibold">Easy Exchange Policy </p>
                    <p className=" text-gray-400">We offer hassle free exchange policy</p>
                </div>
                <div>
                    <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5" />
                    <p className="font-semibold">7 Days Return Policy</p>
                    <p className=" text-gray-400">We provide 7 days free return policy</p>   
                </div>
                <div>
                    <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
                    <p className="font-semibold">Best customer support</p>
                    <p className=" text-gray-400">we provide 24/7 customer support</p>
                </div>
            </div>
            <Settler />
    </div>

    );
    


    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     const url = "https://fakestoreapi.com/products";
    //     fetch(url)
    //     .then(response => response.json())
    //     .then(data => setProducts(data));
    // }, []);

    // return (
    //     <>
    //     <Hero />
    //     <div className="container mt-4">
    //         <div className="row g-4">
    //         {products.map(product => (
    //             <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
    //             <Cards product={product} />
    //             </div>
    //         ))}
    //         </div>
    //     </div>
    //         {/* <div className="row g-4">
    //         {products.map(el => (
    //             <div key={el.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
    //             <Cards product={el} />
    //             </div>
    //         ))}
    //         </div> */}
    //         <Settler />
    //     </>
    // );
};

export default Home;
