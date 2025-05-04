import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProfileDashboard from './pages/ProfileDashboard';
import Error from './pages/Error';

import Register from './pages/Register';


import Navbar from './components/Navbar';
import ProductDetail from './components/product/detail/ProductDetail';
import Footer from './components/Footer';
import ScrollToTop from './components/utility/ScrollToTop';
// import WishList from './components/profile/WishList';

import ProtectedRoute from './components/utility/ProtectedRoute';
import OrderForm from './pages/OrderForm';
import { ShopProvider } from "./context/ShopContext";

import ErrorBoundary from './utils/ErrorBoundary'
import { WishlistProvider } from './context/WishlistContext';
import Wishlist from './components/profile/WishList';
import Payment from './components/profile/Payment';
import Address from './components/profile/Address';
import Notifications from './components/profile/Notifications';
import Settings from './components/profile/Settings';
import OrderHistory from './components/profile/OrderHistory';
import ProfileDetails from './components/profile/ProfileDetails';






function App() {
	
	return (
		<ShopProvider>
			<AuthProvider>
				<DataProvider>
					<CartProvider>
						<ProductProvider>
							<WishlistProvider >
								<Router>
									<Main />
								</Router>
							</WishlistProvider>
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
					<Route path='/profile/:id' element={<ProtectedRoute> <ProfileDashboard /></ProtectedRoute>}>
						<Route index element={<ProfileDetails />} />
						<Route path='orders' element={<OrderHistory />} />
						<Route path='wishlist' element={<Wishlist />} />
						<Route path='payment' element={<Payment />} />
						<Route path='address' element={<Address />} />
						<Route path='notifications' element={<Notifications />} />
						<Route path='settings' element={<Settings />} />
					</Route>
					<Route path='/error' element={<Error />} />
					<Route path='/cart' element={ <Cart /> } />
					<Route path='/place-order' element={ <OrderForm />} />
					<Route path='/product/:id' element={<ProductDetail />} />
				</Routes>
				<Footer />
				<ScrollToTop />
			</ErrorBoundary>
			
		</div>
	);
}


export default App;
