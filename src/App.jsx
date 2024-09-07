/* eslint-disable react-refresh/only-export-components */
// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './customHook/AuthContext';
// import  PrivateRoute  from './customHook/PrivateRoute';
import {DataProvider} from './customHook/DataContext';

import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart2 from './pages/Cart2';

import Nav3 from './components/Nav3';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

import './css/App.css';
import './css/Nav.css';
import './css/Hero.css';
import './css/Settler.css';


import { products } from "./assets/frontend_assets/assets";
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Error from './pages/Error';





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
			<AuthProvider>
				<DataProvider>

					<Router>
						<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
							<Nav3 />
							<ToastContainer position="top-right" autoClose={3000} hideProgressBar />

							<Routes>

								<Route path='/' element={<Home />} />
								<Route path='/collection' element={<Collection />} />
								<Route path='/about' element={<About />} />
								<Route path='/contact' element={<Contact />} />
								<Route path='/login' element={<Login />} />
								<Route path='/profile' element={<Profile />} />
								<Route path='/error' element={<Error />} />
								<Route path='/cart' element={<ProtectedRoute> <Cart2 /> </ProtectedRoute>} />
								
								<Route path='/product/:id' element={<ProductDetail />} />
							</Routes>

							<Footer />
						</div>
					</Router>

				</DataProvider>
			</AuthProvider>
		</shop.Provider>
		</>
    
	);
}

export default App;
