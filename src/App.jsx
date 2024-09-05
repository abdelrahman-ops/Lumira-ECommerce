// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';

import Nav3 from './components/Nav3';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

import './css/App.css';
import './css/Nav.css';
import './css/Hero.css';
import './css/Settler.css';
import { createContext } from 'react';

import { products } from "./assets/frontend_assets/assets";

export const shop = createContext();

function App() {
	
	const currency = "$";
	const value ={
		products,
		currency,
	};
	return (
		<>
		<shop.Provider value={value}>
			<Router>
				<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
					<Nav3 />
					
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/collection' element={<Collection />} />
						<Route path='/about' element={<About />} />
						<Route path='/contact' element={<Contact />} />
						<Route path='/product/:id' element={<ProductDetail />} />
					</Routes>
					
					<Footer />
				</div>
			</Router>
		</shop.Provider>
		</>
    
	);
}

export default App;
