import  { useEffect, useState } from 'react';
import Cards from './Cards';
import Hero from './Hero';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const url = "https://fakestoreapi.com/products";
        fetch(url)
        .then(response => response.json())
        .then(data => setProducts(data));
    }, []);

    return (
        <>
        <Hero />
        <div className="container mt-4">
            <div className="row g-4">
            {products.map(product => (
                <div key={product.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <Cards product={product} />
                </div>
            ))}
            </div>
        </div>

            
            {/* <div className="row g-4">
            {products.map(el => (
                <div key={el.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <Cards product={el} />
                </div>
            ))}
            </div> */}
        </>
    );
};

export default Home;
