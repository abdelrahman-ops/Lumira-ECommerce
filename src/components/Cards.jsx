import React from 'react';
import { Link } from 'react-router-dom';

const Cards = ({ product }) => {
    return (
        <div className="card">
            <img src={product.image} className="card-img-top" alt={product.title} />
            <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.rating.rate}</p>
                <div>
                    <Link to={`/product/${product.id}`} className="btn btn-primary">Watch More</Link>
                    <a href="#" className="btn btn-secondary"><span class="material-symbols-outlined">add_shopping_cart</span></a>
                </div>
            </div>
        </div>
    );
};

export default Cards;
