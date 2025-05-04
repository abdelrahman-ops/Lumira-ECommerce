import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import PhoneNumberInput from "../hooks/PhoneNumberInput";
import Title from '../components/common/Title';
import { motion } from "framer-motion";
import { registerUser } from "../services/api"; // Import from api.ts

const Register = () => {
    const { login } = useAuth();
    const { storeUserData } = useData();
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegisterSuccess = (token, user) => {
        Cookies.set("token", token, { expires: 7 });
        login(token);
        storeUserData(user);
        toast.success("Welcome to our store!");

        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
    };

    // Validation schema
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
            // .matches(/\d/, "Password must contain at least one number")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        // number: Yup.string()
            // .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
            // .required("Phone number is required"),
        gender: Yup.string().required("Gender is required"),
        dateOfBirth: Yup.date().required("Date of Birth is required"),
        image: Yup.mixed()
            .nullable()
            .test("fileSize", "File too large", (value) =>
                value ? value.size <= 2 * 1024 * 1024 : true
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
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    if (value !== null && value !== undefined) {
                        formData.append(key, value);
                    }
                });

                // Use the registerUser function from api.ts
                const response = await registerUser(formData);
                
                if (response?.status) {
                    handleRegisterSuccess(response.data.token, response.data.user);
                } else {
                    throw new Error(response?.message || "Registration failed");
                }
            } catch (error) {
                console.error("Registration error:", error);
                toast.error(error.message || "Registration failed. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleCloseSignUp = () => {
        navigate("/login");
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
                <div className="text-center mb-8">
                    <Title text1="Create Account" text2="" />
                    <p className="mt-2 text-sm text-gray-600">
                        Join our e-commerce platform to start shopping
                    </p>
                </div>

                <form className="space-y-4" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: "firstName", type: "text", placeholder: "First Name" },
                            { name: "lastName", type: "text", placeholder: "Last Name" },
                        ].map((field) => (
                            <div key={field.name}>
                                <input
                                    {...field}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    value={formik.values[field.name]}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors[field.name] && (
                                    <p className="mt-1 text-xs text-red-500">{formik.errors[field.name]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.username && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.username}</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.password && (
                                <p className="mt-1 text-xs text-red-500">{formik.errors.password}</p>
                            )}
                        </div>
                        <div>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                            />
                            {formik.errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-500">{formik.errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <PhoneNumberInput
                            onChange={(completePhoneNumber) =>
                                formik.setFieldValue("number", completePhoneNumber)
                            }
                            defaultPhone={formik.values.number}
                            defaultCountryCode={"US"}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        {formik.errors.number && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.number}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <div className="flex space-x-4">
                            {['male', 'female', 'other'].map((gender) => (
                                <label key={gender} className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={gender}
                                        checked={formik.values.gender === gender}
                                        onChange={formik.handleChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 capitalize">
                                        {gender}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {formik.errors.gender && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.gender}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            value={formik.values.dateOfBirth}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.dateOfBirth && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.dateOfBirth}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <div className="mt-1 flex items-center">
                            <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <span>Choose file</span>
                                <input
                                    type="file"
                                    name="image"
                                    className="sr-only"
                                    onChange={(event) =>
                                        formik.setFieldValue("image", event.currentTarget.files[0])
                                    }
                                />
                            </label>
                            <span className="ml-3 text-sm text-gray-500">
                                {formik.values.image ? formik.values.image.name : 'No file chosen'}
                            </span>
                        </div>
                        {formik.errors.image && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.image}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={handleCloseSignUp}
                            className="text-sm text-blue-600 hover:text-blue-500"
                        >
                            Already have an account? Sign in
                        </button>
                    </div>

                    <motion.button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Creating Account..." : "Create Account"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
};

export default Register;