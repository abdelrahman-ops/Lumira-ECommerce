import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const url = `https://fakestoreapi.com/products/${id}`;
        fetch(url)
        .then(response => response.json())
        .then(data => setProduct(data));
    }, [id]);

    if (!product) return <div className="loader"></div>;

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
