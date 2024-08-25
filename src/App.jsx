import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import Collection from './components/Collection';
import About from './components/About';
import Contact from './components/Contact';
import ProductDetail from './components/ProductDetail'; // Import ProductDetail

import './css/App.css';
import './css/Nav.css';
import './css/Hero.css';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:id' element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
