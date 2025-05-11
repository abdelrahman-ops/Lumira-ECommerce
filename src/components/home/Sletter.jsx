import { FiRefreshCw, FiCheckCircle, FiHeadphones, FiMail, FiArrowRight } from "react-icons/fi";

const Sletter = () => {
    return (
        <div className="bg-white">
            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {/* Feature 1 - Exchange */}
                    <div className="group relative p-8 rounded-xl bg-gradient-to-b from-white to-gray-50 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                                <FiRefreshCw className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Easy Exchange Policy</h3>
                            <p className="text-blue-600 font-medium transition-colors duration-300">
                                Hassle-free exchanges within 14 days
                            </p>
                        </div>
                    </div>

                    {/* Feature 2 - Returns */}
                    <div className="group relative p-8 rounded-xl bg-gradient-to-b from-white to-gray-50 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                                <FiCheckCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">7 Days Return</h3>
                            <p className="text-purple-600 font-medium transition-colors duration-300">
                                Free returns with no questions asked
                            </p>
                        </div>
                    </div>

                    {/* Feature 3 - Support */}
                    <div className="group relative p-8 rounded-xl bg-gradient-to-b from-white to-gray-50 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 flex items-center justify-center text-indigo-600 group-hover:text-indigo-700 transition-colors duration-300">
                                <FiHeadphones className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Support</h3>
                            <p className="text-indigo-600 font-medium transition-colors duration-300">
                                24/7 dedicated concierge service
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl overflow-hidden shadow-xl">
                    <div className="relative">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full filter blur-3xl opacity-20"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-500 rounded-full filter blur-3xl opacity-20"></div>
                        </div>
                        
                        <div className="relative z-10 py-16 px-6 sm:px-12 lg:px-20">
                            <div className="text-center">
                                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                    Subscribe & Receive <span className="text-blue-200">20% Off</span>
                                </h2>
                                <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                                    Join our exclusive list for early access to new collections and special offers.
                                </p>

                                <form className="mt-10 max-w-xl mx-auto">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-300">
                                                <FiMail className="w-5 h-5" />
                                            </div>
                                            <input
                                                type="email"
                                                className="block w-full pl-12 pr-4 py-4 rounded-lg bg-blue-800 bg-opacity-50 border border-blue-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 text-white placeholder-blue-300 transition-all duration-300"
                                                placeholder="Your email address"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                                        >
                                            Subscribe
                                            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                        </button>
                                    </div>
                                </form>

                                <p className="mt-6 text-sm text-blue-200">
                                    We respect your privacy. Unsubscribe at any time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sletter;