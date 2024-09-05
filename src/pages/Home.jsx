// import  { useEffect, useState } from 'react';
// import Cards from '../components/Cards';

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
