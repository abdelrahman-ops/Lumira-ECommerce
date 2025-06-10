import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { ShopProvider } from "./context/ShopContext";
import { WishlistProvider } from './context/WishlistContext';
import ErrorBoundary from './utils/ErrorBoundary';
import ScrollToTop from './components/utility/ScrollToTop';

// Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ProfileDashboard from './pages/ProfileDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderForm from './pages/OrderForm';
import NotFoundPage from './pages/NotFoundPage';
import ServerErrorPage from './pages/ServerErrorPage';

// Components
import Navbar from './components/Navbar';
import ProductDetail from './components/product/detail/ProductDetail';
import Footer from './components/Footer';
import ProtectedRoute from './components/utility/ProtectedRoute';

// Profile Tabs
import Wishlist from './components/profile/tabs/wishlist/WishList';
import Payment from './components/profile/tabs/Payment';
import Address from './components/profile/tabs/Address';
import Notifications from './components/profile/tabs/Notifications';
import Settings from './components/profile/tabs/Settings';
import OrderHistory from './components/profile/tabs/OrderHistory';
import ProfileDetails from './components/profile/tabs/ProfileDetails';
import GuestRoute from './components/QuestRoute';

function App() {
	const clientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
	
	if (!clientId) {
		console.error('VITE_REACT_APP_GOOGLE_CLIENT_ID environment variable');
		return <div>Configuration error - please contact support</div>;
	}
	
	return (
		<GoogleOAuthProvider clientId={clientId}>
			<AllProviders>
				<Router>
					<Routes>
						{/* Error routes (without layout) */}
						<Route path="/500" element={<ServerErrorPage />} />
						
						{/* Main layout routes (with navbar and footer) */}
						<Route element={<LayoutWithNavbarAndFooter />}>
							<Route index element={<Home />} />
							<Route path='/collection' element={<Collection />} />
							<Route path='/about' element={<About />} />
							<Route path='/contact' element={<Contact />} />
							<Route path='/login' element={
								<GuestRoute>
								<Login />
								</GuestRoute>
							}
							/>
							<Route path='/register' element={
								<GuestRoute>
								<Register />
								</GuestRoute>
							}
							/>
							<Route path='/profile' element={
									<ProtectedRoute>
										<ProfileDashboard />
									</ProtectedRoute>
								}
							>
								<Route path='me' element={<ProfileDetails />} />
								<Route path='orders' element={<OrderHistory />} />
								<Route path='wishlist' element={<Wishlist />} />
								<Route path='payment' element={<Payment />} />
								<Route path='address' element={<Address />} />
								<Route path='notifications' element={<Notifications />} />
								<Route path='settings' element={<Settings />} />
							</Route>
							<Route path='/cart' element={<Cart />} />
							<Route path='/place-order' element={<OrderForm />} />
							<Route path='/product/:id' element={<ProductDetail />} />
						</Route>
						
						{/* 404 catch-all (without layout) */}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</Router>
			</AllProviders>
		</GoogleOAuthProvider>
	);
}

const AllProviders = ({ children }) => (
	<ShopProvider>
		<AuthProvider>
			<DataProvider>
				<CartProvider>
					<ProductProvider>
						<WishlistProvider>
							{children}
						</WishlistProvider>
					</ProductProvider>
				</CartProvider>
			</DataProvider>
		</AuthProvider>
	</ShopProvider>
);

const LayoutWithNavbarAndFooter = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<ErrorBoundary>
				<Navbar />
				<Toaster toastOptions={{ duration: 3000 }} />
				<ScrollToTop />
				<Outlet /> {/* This renders the child routes */}
				<Footer />
			</ErrorBoundary>
		</div>
	);
};

export default App;