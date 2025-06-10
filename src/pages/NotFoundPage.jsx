/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import { FaBoxOpen, FaHome, FaSearch, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center"
        >
            <motion.div
            animate={{
                y: [-10, 10, -10],
            }}
            transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
            }}
            className="flex justify-center mb-6"
            >
            <FaBoxOpen className="text-6xl text-purple-500" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Oops! Product Lost in Space</h2>
            <p className="text-gray-600 mb-8">
            The item you're looking for has drifted out of orbit. Maybe it's on a cosmic sale elsewhere?
            </p>
            
            <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            >
            <Link to="/">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                <FaHome /> Home
                </motion.button>
            </Link>
            <Link to="/collection">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                <FaShoppingBag /> Shop
                </motion.button>
            </Link>
            </motion.div>
            
            {/* <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">Or try searching</span>
            </div>
            </div>
            
            <motion.div 
            className="mt-6 flex"
            whileHover={{ scale: 1.02 }}
            >
            <input 
                type="text" 
                placeholder="Search for products..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded-r-lg hover:bg-purple-600 transition-colors">
                <FaSearch />
            </button>
            </motion.div> */}
        </motion.div>
        </div>
    );
};

export default NotFoundPage;