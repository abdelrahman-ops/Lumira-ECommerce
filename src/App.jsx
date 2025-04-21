/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createContext } from 'react';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import {DataProvider} from './context/DataContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Error from './pages/Error';
import WishList from './pages/profile/WishList';
import Register from './pages/Register';


import Navbar from './components/Navbar';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// import { products } from "./assets/assets";

import ProtectedRoute from './components/ProtectedRoute';
import OrderForm from './pages/OrderForm';
import { ShopProvider } from "./context/ShopContext";

import ErrorBoundary from './utils/ErrorBoundary'







export const shop = createContext();

function App() {
	
	return (
		<ShopProvider>
			<AuthProvider>
				<DataProvider>
					<CartProvider>
						<ProductProvider>
							<Router>
								<ScrollToTop />
								<Main />
							</Router>
						</ProductProvider>
					</CartProvider>
				</DataProvider>
			</AuthProvider>
		</ShopProvider>
	);
};


const Main = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<ErrorBoundary>
					<Navbar />
					<Toaster />
				<ToastContainer position="top-right" autoClose={3000} hideProgressBar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/collection' element={<Collection />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/profile/:id' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
					<Route path='/error' element={<Error />} />
					<Route path='/cart' element={ <Cart /> } />
					<Route path='/place-order' element={ <OrderForm />} />
					<Route path='/wishlist' element={<WishList />} />
					<Route path='/product/:id' element={<ProductDetail />} />
				</Routes>
				<Footer />
			</ErrorBoundary>
			
		</div>
	);
}


export default App;
