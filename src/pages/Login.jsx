import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Title from '../components/Title';
import { useCart } from '../context/CartContext';

const Login = () => {
    const { login } = useAuth();
    const { storeData } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    const { transferCart } = useCart(); // Use the transferCart function from CartContext

    const handleLoginSuccess = async (token) => {
        Cookies.set("token", token);
        login(token);
        toast.success("Login successful!");

        // Transfer guest cart to user cart after successful login
        try {
            await transferCart(); // Call transferCart to merge guest cart with user cart
        } catch (error) {
            console.error("Error transferring guest cart:", error);
            toast.error("Failed to transfer guest cart. Please try again.");
        }

        const redirectPath = location.state?.from?.pathname || '/';
        navigate(redirectPath);
    };

    // SCHEMA FOR VALIDATION
    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
    });

    // SIGN IN FORM handling
    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (values) => {
            try {
                const response = await fetch("https://server-e-commerce-seven.vercel.app/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                });

                const data = await response.json();

                if (response.ok && data.data.user && data.data.token) {
                    handleLoginSuccess(data.data.token); // Call handleLoginSuccess with the token
                    storeData(data.data.user); // Store user data in DataContext
                    console.log("Stored data successfully.");
                } else {
                    toast.error(data.message || "Invalid credentials!");
                }
            } catch (error) {
                console.error("Login error:", error);
                toast.error("An error occurred during login!");
            }
        },
    });

    const handleCreateAccountClick = () => {
        navigate('/register');
    };

    return (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <form className="flex flex-col items-center w-full gap-4" onSubmit={formikLogin.handleSubmit}>
                <div className="inline-flex items-center gap-2 mb-2 mt-10 text-3xl prata-regular">
                    <Title text2="Login" />
                </div>

                <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Email"
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                />
                {formikLogin.touched.email && formikLogin.errors.email ? (
                    <div className="text-red-500">{formikLogin.errors.email}</div>
                ) : null}

                <input
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Password"
                    value={formikLogin.values.password}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                />
                {formikLogin.touched.password && formikLogin.errors.password ? (
                    <div className="text-red-500">{formikLogin.errors.password}</div>
                ) : null}

                <div className="w-full flex justify-between text-sm mt-[-8px]">
                    <p className="cursor-pointer">Forgot your password?</p>
                    <button type="button" className="cursor-pointer" onClick={handleCreateAccountClick}>
                        Create account
                    </button>
                </div>

                <button className="bg-black text-white font-light px-8 py-2 mt-4" type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Login;