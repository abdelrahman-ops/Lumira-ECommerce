import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
// import PhoneNumberInput from "../hooks/PhoneNumberInput";
import Title from '../components/common/Title';
import { motion } from "framer-motion";
import { registerUser } from "../services/api";
import { useEffect, useState } from "react";
import { 
    FiUser, FiMail, FiLock, FiPhone, FiCalendar, 
    FiCamera, FiEye, FiEyeOff, FiArrowRight,
    FiLoader,
} from "react-icons/fi";
import { IoMaleOutline, IoFemaleOutline, } from "react-icons/io5";

const Register = () => {
    const { login } = useAuth();
    const { storeUserData } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleRegisterSuccess = (token, user) => {
        Cookies.set("token", token, { 
            expires: 7,
            sameSite: 'strict'
        });
        login(token);
        storeUserData(user);
        toast.success("Welcome to Lumière!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
        });
        navigate(location.state?.from?.pathname || "/");
    };

    const schema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        gender: Yup.string().required("Gender is required"),
        dateOfBirth: Yup.date()
            .required("Date of Birth is required")
            .max(new Date(), "Date of birth cannot be in the future"),
        image: Yup.mixed()
            .nullable()
            .test("fileSize", "File too large (max 2MB)", (value) =>
                value ? value.size <= 2 * 1024 * 1024 : true
            )
            .test("fileType", "Unsupported file format", (value) => 
                value ? ["image/jpeg", "image/png", "image/gif"].includes(value.type) : true
            ),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            number: "",
            gender: "",
            dateOfBirth: "",
            image: null,
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                setSubmitting(true);
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(key, value);
                    }
                });

                const response = await registerUser(formData);
                
                if (response?.status) {
                    handleRegisterSuccess(response.data.token, response.data.user);
                } else {
                    if (response?.errors) {
                        Object.entries(response.errors).forEach(([field, message]) => {
                            setFieldError(field, message);
                        });
                    }
                    throw new Error(response?.message || "Registration failed");
                }
            } catch (error) {
                toast.error(error.message || "Registration failed. Please try again.", {
                    position: "top-center"
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleLoginClick = () => {
        navigate('/login', { state: { from: location.state?.from } });
    };

    useEffect(() => {
        if (location.state?.loginEmail) {
            formik.setFieldValue('email', location.state.loginEmail);
        }
    }, [location.state]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
            <motion.div 
                className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

                <div className="p-8 md:p-10">
                    <div className="text-center mb-8">
                        <Title text1="Create Your" text2="Account" />
                        <p className="mt-2 text-gray-500">
                            Already have an account?{' '}
                            <button 
                                onClick={handleLoginClick}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">First Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        className={`w-full pl-10 pr-4 py-2.5 border ${formik.errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <p className="text-xs text-red-500">
                                        {formik.errors.firstName}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Last Name</label>
                                <div className="relative">
                                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        className={`w-full pl-10 pr-4 py-2.5 border ${formik.errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <p className="text-xs text-red-500">
                                        {formik.errors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Username */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Username</label>
                            <div className="relative">
                                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    name="username"
                                    type="text"
                                    placeholder="Username"
                                    className={`w-full pl-10 pr-4 py-2.5 border ${formik.errors.username ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.username && formik.errors.username && (
                                <p className="text-xs text-red-500">
                                    {formik.errors.username}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <div className="relative">
                                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    className={`w-full pl-10 pr-4 py-2.5 border ${formik.errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-xs text-red-500">
                                    {formik.errors.email}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        className={`w-full pl-10 pr-10 py-2.5 border ${formik.errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <button 
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-xs text-red-500">
                                        {formik.errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative">
                                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        className={`w-full pl-10 pr-10 py-2.5 border ${formik.errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                        value={formik.values.confirmPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <button 
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                                    </button>
                                </div>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <p className="text-xs text-red-500">
                                        {formik.errors.confirmPassword}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            <div className="relative">
                                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    name="number"
                                    type="number"
                                    placeholder="Phone Number"
                                    className={`w-full pl-10 pr-4 py-2.5 border ${formik.errors.number ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    value={formik.values.number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.number && formik.errors.number && (
                                <p className="text-xs text-red-500">
                                    {formik.errors.number}
                                </p>
                            )}
                        </div>

                        {/* Gender */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Gender</label>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { value: 'male', label: 'Male', icon: <IoMaleOutline className="mr-1" /> },
                                    { value: 'female', label: 'Female', icon: <IoFemaleOutline className="mr-1" /> }
                                ].map((option) => (
                                    <label 
                                        key={option.value}
                                        className={`flex items-center justify-center px-3 py-2 border rounded-lg cursor-pointer transition ${formik.values.gender === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                    >
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option.value}
                                            checked={formik.values.gender === option.value}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm text-gray-700 flex items-center">
                                            {option.icon}
                                            {option.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            {formik.touched.gender && formik.errors.gender && (
                                <p className="text-xs text-red-500">
                                    {formik.errors.gender}
                                </p>
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                            <div className="relative">
                                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    className={`w-full pl-10 pr-4 py-2.5 border ${formik.errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
                                    value={formik.values.dateOfBirth}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    max={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                <p className="text-xs text-red-500">
                                    {formik.errors.dateOfBirth}
                                </p>
                            )}
                        </div>

                        {/* Profile Image */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Profile Image (Optional)</label>
                            <div className="flex items-center">
                                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center">
                                    <FiCamera className="mr-2" />
                                    <span>Choose file</span>
                                    <input
                                        type="file"
                                        name="image"
                                        className="sr-only"
                                        accept="image/jpeg, image/png, image/gif"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            if (file) {
                                                formik.setFieldValue("image", file);
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                    />
                                </label>
                                <span className="ml-3 text-sm text-gray-500 truncate max-w-xs">
                                    {formik.values.image ? formik.values.image.name : 'No file chosen'}
                                </span>
                            </div>
                            {formik.touched.image && formik.errors.image && (
                                <p className="text-xs text-red-500">
                                    {formik.errors.image}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <FiLoader className="animate-spin mr-2" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account <FiArrowRight className="ml-2" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;