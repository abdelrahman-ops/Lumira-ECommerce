/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaRedo, FaHome, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ServerErrorPage = () => {
    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center p-4">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center"
        >
            <motion.div
            animate={{
                rotate: [0, 10, -10, 0],
            }}
            transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2,
            }}
            className="flex justify-center mb-6"
            >
            <FaExclamationTriangle className="text-6xl text-red-500" />
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-2">500</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Server Meltdown!</h2>
            <p className="text-gray-600 mb-6">
            Our servers are taking an unexpected coffee break. The tech team has been alerted.
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 text-left">
            <p className="text-red-700 font-medium">What you can do:</p>
            <ul className="list-disc pl-5 text-red-600 text-sm mt-1 space-y-1">
                <li>Try refreshing the page</li>
                <li>Check back in a few minutes</li>
                <li>Contact support if the issue persists</li>
            </ul>
            </div>
            
            <motion.div 
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            >
            <motion.button
                onClick={handleRefresh}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
                <FaRedo /> Refresh
            </motion.button>
            <Link to="/">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                <FaHome /> Home
                </motion.button>
            </Link>
            </motion.div>
            
            <div className="mt-8">
            <Link to="/contact">
                <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-red-600 font-medium flex items-center justify-center gap-2 mx-auto"
                >
                <FaHeadset /> Contact Support
                </motion.button>
            </Link>
            </div>
        </motion.div>
        
        <motion.div 
            className="mt-8 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
        >
            <p>We're sorry for the inconvenience. Our team is working hard to fix this.</p>
        </motion.div>
        </div>
    );
};

export default ServerErrorPage;