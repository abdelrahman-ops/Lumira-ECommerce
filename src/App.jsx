/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter as Router, Route, Routes , useMatch } from 'react-router-dom';
import { createContext } from 'react';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './customHook/AuthContext';
import {DataProvider} from './customHook/DataContext';
import { CartProvider } from './customHook/CartContext';
import { ProductProvider } from './customHook/ProductContext';

import Home from './pages/Home';
// import Home2 from './pages/Home2';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Error from './pages/Error';
import WishList from './pages/WishList';
import Register from './pages/Register';


import Nav3 from './components/Nav3';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

import { products } from "./assets/frontend_assets/assets";

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoutes from './components/AdminRoutes';








export const shop = createContext();

function App() {
	
	const currency = "$";
	const value ={
		products,
		currency,
	};
	return (
		<shop.Provider value={value}>
			<AuthProvider>
				<DataProvider>
					<CartProvider>
						<ProductProvider>
							<Router>
								<Main />
							</Router>
						</ProductProvider>
					</CartProvider>
				</DataProvider>
			</AuthProvider>
		</shop.Provider>
	);
};


const Main = () => {
	const isAdminPath = useMatch('/admin/*');

	return (
		<div className={isAdminPath ? 'bg-gray-50 min-h-screen' : 'px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'}>
			{!isAdminPath && <Nav3 />}
			<ToastContainer position="top-right" autoClose={3000} hideProgressBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/collection' element={<Collection />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/error' element={<Error />} />
				<Route path='/cart' element={<ProtectedRoute> <Cart /> </ProtectedRoute>} />
				<Route path='/wishlist' element={<WishList />} />
				<Route path='/product/:id' element={<ProductDetail />} />
				<Route path='/admin/*' element={<AdminRoutes />} />
			</Routes>
			{!isAdminPath && <Footer />}
		</div>
	);
}

export default App;
