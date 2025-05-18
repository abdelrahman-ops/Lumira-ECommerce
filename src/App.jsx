import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import Error from './pages/Error';
import OrderForm from './pages/OrderForm';

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


function App() {

	const clientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
	// console.log("Google Client ID:", clientId);
	
	// Validate environment variables
	if (!clientId) {
		console.error('VITE_REACT_APP_GOOGLE_CLIENT_ID environment variable');
		return <div>Configuration error - please contact support</div>;
	}
	
	
	return (
		<GoogleOAuthProvider 
			clientId={clientId}
			// onScriptLoadError={() => console.error("Failed to load Google OAuth script")}
			// onScriptLoadSuccess={() => console.log("Google OAuth script loaded successfully")}
		>
			<AllProviders>
				<Router>
				<MainLayout />
				</Router>
			</AllProviders>
		</GoogleOAuthProvider>
	);

	
};

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


const MainLayout = () => {
	return (
		<div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
			<ErrorBoundary>
				<Navbar />
				<Toaster 
					// position="top-right"
					toastOptions={{
					duration: 3000,
					// style: {
					// 	background: '#363636',
					// 	color: '#fff',
					// },
					}}
				/>
				<ScrollToTop />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/collection' element={<Collection />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />


					<Route 
						path='/profile/:id' 
						element={
								<ProtectedRoute>
									<ProfileDashboard />
								</ProtectedRoute>
							}
						>
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
			</ErrorBoundary>
		</div>
	);
}


export default App;
