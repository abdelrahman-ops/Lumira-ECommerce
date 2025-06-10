/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from "js-cookie";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaXTwitter, FaSpinner, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdEmail, MdShoppingBag } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginUser } from '../services/api';
import { useUserStore } from '../stores/userStore';
import Title from '../components/common/Title';
import { url } from '../components/constant/URL';
import EmptyCartIllustration from '../components/illustrations/EmptyCartIllustration';
import { useAuthStore } from '../stores/authStore';

const Login = () => {
    const { storeUserData } = useUserStore();
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLoginSuccess = async (token, user) => {
        try {
            Cookies.set("token", token, { 
                expires: 7, 
                sameSite: 'strict'
            });
            
            login(token);
            storeUserData(user);
            
            toast.success("Welcome back! Login successful");
            window.location.reload();
            const redirectPath = location.state?.from?.pathname || '/';
            navigate(redirectPath);
        } catch (error) {
            console.error("Login success handler error:", error);
            toast.error("An error occurred after login. Please refresh the page.");
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setIsGoogleLoading(true);
        try {
            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            const response = await axios.post(`${url}/api/auth/google`, {
                credential: credentialResponse.credential
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response?.data?.data?.token) {
                await handleLoginSuccess(response.data.data.token, response.data.data.user);
                return;
            }
            throw new Error(response?.data?.message || "Invalid response from server");
        } catch (error) {
            console.error("Google login error:", error);
            toast.error(error.response?.data?.message || "Google login failed. Please try again.");
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleGoogleError = () => {
        toast.error("Google login failed. Please try again.");
    };

    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Please enter a valid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")
    });

    const formikLogin = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                setSubmitting(true);
                const response = await loginUser(values.email, values.password);

                if (response?.data?.token) {
                    await handleLoginSuccess(response.data.token, response.data.user);
                } else {
                    if (response?.errors) {
                        Object.entries(response.errors).forEach(([field, message]) => {
                            setFieldError(field, message);
                        });
                    }
                    throw new Error(response?.data?.message || "Invalid credentials");
                }
            } catch (error) {
                console.error("Login error:", error);
                toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleCreateAccountClick = () => {
        navigate('/register', { state: { from: location.state?.from } });
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (location.state?.registeredEmail) {
            formikLogin.setFieldValue('email', location.state.registeredEmail);
        }
    }, [location.state, formikLogin]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center border rounded-xl shadow-xl"
        >
            <div className="w-full max-w-6xl flex flex-col md:flex-row rounded-xl overflow-hidden bg-white ">
                {/* Left side - Brand/Product showcase (hidden on mobile) */}
                {!isMobile && (
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-8 w-1/2"
                    >
                        <div className="mb-8 flex items-center">
                            <MdShoppingBag className="text-4xl mr-2" />
                            <span className="text-2xl font-bold">Lumira</span>
                        </div>
                        <motion.div 
                            className="text-center"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                            <p className="mb-6">Sign in to access your personalized shopping experience, wishlist, and order history.</p>
                            <div className="flex justify-center">
                                <div className="w-16 h-1 bg-blue-300 rounded-full"></div>
                            </div>
                        </motion.div>
                        <motion.div 
                            className="mt-8"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <EmptyCartIllustration 
                                width={300}
                                height={300}
                                primaryColor="#103783"
                                secondaryColor="#9bafd9"
                                className="mb-6"
                            />
                        </motion.div>
                    </motion.div>
                )}

                {/* Right side - Login form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full md:w-1/2 p-6 sm:p-8 md:p-10"
                >
                    <div className="text-center mb-8">
                        {isMobile && (
                            <div className="flex justify-center items-center mb-4">
                                <MdShoppingBag className="text-3xl text-blue-600 mr-2" />
                                <span className="text-xl font-bold text-gray-800">Lumira</span>
                            </div>
                        )}
                        <Title text1="Welcome" text2="Back" />
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to access your account and continue shopping
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={formikLogin.handleSubmit}>
                        <motion.div 
                            className="space-y-1" 
                            whileHover={{ y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <MdEmail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    className={`w-full pl-10 pr-4 py-3 border ${
                                        formikLogin.errors.email ? 'border-red-300' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400`}
                                    placeholder="your@email.com"
                                    value={formikLogin.values.email}
                                    onChange={formikLogin.handleChange}
                                    onBlur={formikLogin.handleBlur}
                                    disabled={formikLogin.isSubmitting}
                                />
                                {formikLogin.touched.email && formikLogin.errors.email && (
                                    <motion.p 
                                        className="text-xs text-red-500 mt-1"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {formikLogin.errors.email}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>

                        <motion.div 
                            className="space-y-1" 
                            whileHover={{ y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className={`w-full pl-10 pr-10 py-3 border ${
                                        formikLogin.errors.password ? 'border-red-300' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400`}
                                    placeholder="••••••••"
                                    value={formikLogin.values.password}
                                    onChange={formikLogin.handleChange}
                                    onBlur={formikLogin.handleBlur}
                                    disabled={formikLogin.isSubmitting}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    onClick={togglePasswordVisibility}
                                    tabIndex="-1"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                                {formikLogin.touched.password && formikLogin.errors.password && (
                                    <motion.p 
                                        className="text-xs text-red-500 mt-1"
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {formikLogin.errors.password}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>

                        <div className="flex items-center justify-between pt-1">
                            <motion.button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                                whileHover={{ x: 2 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={formikLogin.isSubmitting}
                            >
                                Forgot password?
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={handleCreateAccountClick}
                                className="text-sm text-blue-600 hover:text-blue-500 font-medium flex items-center gap-1"
                                whileHover={{ x: 2 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={formikLogin.isSubmitting}
                            >
                                Create account
                                <FaArrowRight className="w-3 h-3" />
                            </motion.button>
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={formikLogin.isSubmitting}
                        >
                            {formikLogin.isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <motion.button
                                type="button"
                                className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaXTwitter className="w-5 h-5 text-black"/>
                                {!isMobile && <span className="ml-2">Twitter</span>}
                            </motion.button>

                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                useOneTap
                                render={({ onClick }) => (
                                    <motion.button
                                        type="button"
                                        className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={onClick}
                                        disabled={isGoogleLoading}
                                    >
                                        {isGoogleLoading ? (
                                            <FaSpinner className="animate-spin mr-2 h-4 w-4" />
                                        ) : (
                                            <FcGoogle className="w-5 h-5" />
                                        )}
                                        {!isMobile && <span className="ml-2">Google</span>}
                                    </motion.button>
                                )}
                            />
                        </div>
                    </div>

                    {isMobile && (
                        <div className="mt-8 text-center text-xs text-gray-500">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Login;