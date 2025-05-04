import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import RatingStars from './RatingStars';

const ProductTabs = ({ product }) => {
    const [activeTab, setActiveTab] = useState('description');
    
    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'details', label: 'Product Details' },
        { id: 'reviews', label: `Reviews (${product.reviewCount || 0})` }
    ];

    return (
        <div className="mt-16 border-t">
            {/* Tab Headers */}
            <div className="flex border-b">
                {tabs.map(tab => (
                    <TabHeader
                        key={tab.id}
                        tab={tab}
                        isActive={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    />
                ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-6"
                >
                    {activeTab === 'description' && <DescriptionTab product={product} />}
                    {activeTab === 'details' && <DetailsTab product={product} />}
                    {activeTab === 'reviews' && <ReviewsTab product={product} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// Sub-components
const TabHeader = ({ tab, isActive, onClick }) => (
    <button 
        className={`px-6 py-4 font-medium text-sm ${
            isActive 
                ? 'border-b-2 border-black text-black' 
                : 'text-gray-500 hover:text-black'
        }`}
        onClick={onClick}
    >
        {tab.label}
    </button>
);

const DescriptionTab = ({ product }) => (
    <div className="text-gray-600 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Product Description</h3>
        <p className="leading-relaxed">{product.description}</p>
        {product.features && (
            <ul className="space-y-3">
                {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <FontAwesomeIcon icon={faCircleCheck} className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="flex-1">{feature}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

const DetailsTab = ({ product }) => (
    <div className="text-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.details && Object.entries(product.details).map(([key, value]) => (
                <div key={key} className="flex">
                    <span className="font-medium text-gray-900 w-40 flex-shrink-0">{key}:</span>
                    <span>{value}</span>
                </div>
            ))}
        </div>
    </div>
);

const ReviewsTab = ({ product }) => (
    <div className="text-gray-600">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold mb-2">{product.rating?.toFixed(1) || '0.0'}</h4>
                <RatingStars rating={product.rating} />
                <p className="text-sm text-gray-500">
                    {product.reviewCount || 0} {product.reviewCount === 1 ? 'review' : 'reviews'}
                </p>
            </div>
            <div className="flex-1">
                {/* Rating breakdown would go here */}
            </div>
        </div>
        <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Be the first to review this product!</p>
            <button className="px-6 py-2 border border-black rounded-md hover:bg-gray-50 transition-colors">
                Write a Review
            </button>
        </div>
    </div>
);

export default ProductTabs;