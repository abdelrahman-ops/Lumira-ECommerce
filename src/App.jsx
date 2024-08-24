import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = "https://fakestoreapi.com/products";
    fetch(url)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);
  
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="row g-4">
              {products.map(el => (
                <div key={el.id} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                  <Cards product={el} />
                </div>
              ))}
            </div>
          } />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
