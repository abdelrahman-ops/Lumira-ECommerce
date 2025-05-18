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
import { FaXTwitter, FaSpinner } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { loginUser } from '../services/api';
import { useData } from '../context/DataContext';
import Title from '../components/common/Title';

const Login = () => {
    const { login, storeUserData } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleLoginSuccess = async (token, user) => {
        try {
            Cookies.set("token", token, { 
                expires: 7, 
                sameSite: 'strict'
            });
            // console.log(token);
            
            login(token);
            storeUserData(user);
            
            toast.success("Welcome back! Login successful");
            
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
            // console.log('Decoded Credential:', credentialResponseDecoded);

            const response = await axios.post('http://localhost:5000/api/auth/google', {
                credential: credentialResponse.credential
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // console.log('response: ',response.data.data.token);
            
            
            if (response?.data?.data?.token) {
                await handleLoginSuccess(response.data.data.token, response.data.data.user);
                // console.log('response.data.token',response);
                return;
            }
            // If we get here, something was wrong with the response
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
                    // console.log('response.data.token',response.data.token);
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

    useEffect(() => {
        if (location.state?.registeredEmail) {
            formikLogin.setFieldValue('email', location.state.registeredEmail);
        }
    }, [location.state, formikLogin]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
        >
            <motion.div 
                className="w-full max-w-md"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
                    <div className="text-center mb-8">
                        <Title text1="Welcome" text2="Back" />
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to access your account and continue shopping
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={formikLogin.handleSubmit}>
                        <motion.div className="space-y-1" whileHover={{ y: -2 }}>
                            <div className="relative">
                                <MdEmail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                                <input
                                    type="email"
                                    name="email"
                                    className={`w-full pl-10 pr-4 py-3 border ${
                                        formikLogin.errors.email ? 'border-red-300' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    placeholder="Email Address"
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

                        <motion.div className="space-y-1" whileHover={{ y: -2 }}>
                            <div className="relative">
                                <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    className={`w-full pl-10 pr-4 py-3 border ${
                                        formikLogin.errors.password ? 'border-red-300' : 'border-gray-300'
                                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    placeholder="Password"
                                    value={formikLogin.values.password}
                                    onChange={formikLogin.handleChange}
                                    onBlur={formikLogin.handleBlur}
                                    disabled={formikLogin.isSubmitting}
                                />
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
                                className="text-sm text-blue-600 hover:text-blue-500"
                                whileHover={{ x: 2 }}
                                disabled={formikLogin.isSubmitting}
                            >
                                Forgot your password?
                            </motion.button>
                            <motion.button
                                type="button"
                                onClick={handleCreateAccountClick}
                                className="text-sm text-blue-600 hover:text-blue-500 flex items-center gap-1"
                                whileHover={{ x: 2 }}
                                disabled={formikLogin.isSubmitting}
                            >
                                Create account
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </div>

                        <motion.button
                            type="submit"
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
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

                    <div className="mt-6">
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
                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FaXTwitter className="w-5 h-5"/>
                            </motion.button>

                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleError}
                                useOneTap
                                render={({ onClick }) => (
                                    <motion.button
                                        type="button"
                                        className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={onClick}
                                        disabled={isGoogleLoading}
                                    >
                                        {isGoogleLoading ? (
                                            <FaSpinner className="animate-spin mr-2 h-4 w-4" />
                                        ) : (
                                            <FcGoogle className="mr-2 h-5 w-5" />
                                        )}
                                        Google
                                    </motion.button>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Login;