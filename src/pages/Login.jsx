import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import Title from '../components/Title';
// import { useCart } from '../context/CartContext';
import { loginUser } from '../services/api';

const Login = () => {
    const { login } = useAuth();
    const { storeUserData } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    // const { transferCart } = useCart();

    const handleLoginSuccess = async (token, user) => {
        try {
            // Set token in cookies and auth context
            Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
            login(token);
            
            // Store user data in context
            storeUserData(user);
            
            // Transfer guest cart to user cart
            // await transferCart();
            
            toast.success("Login successful!");
            
            // Redirect to previous page or home
            const redirectPath = location.state?.from?.pathname || '/';
            navigate(redirectPath);
        } catch (error) {
            console.error("Login success handler error:", error);
            toast.error("An error occurred after login. Please refresh the page.");
        }
    };

    // Validation schema
    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .required("Password is required"),
    });

    // Form handling
    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true);
                
                // Use the loginUser function from api.ts
                const response = await loginUser(values.email, values.password);

                console.log('Login API response:', response);

                if (response && response.status && response.data) {
                    await handleLoginSuccess(response.data.token, response.data.user);
                } else {
                    throw new Error(response.message || "Invalid credentials");
                }
            } catch (error) {
                console.error("Login error:", error);
                toast.error(error.message || "Login failed. Please try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleCreateAccountClick = () => {
        navigate('/register', { state: { from: location.state?.from } });
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
                    disabled={formikLogin.isSubmitting}
                />
                {formikLogin.touched.email && formikLogin.errors.email && (
                    <div className="text-red-500">{formikLogin.errors.email}</div>
                )}

                <input
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Password"
                    value={formikLogin.values.password}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    disabled={formikLogin.isSubmitting}
                />
                {formikLogin.touched.password && formikLogin.errors.password && (
                    <div className="text-red-500">{formikLogin.errors.password}</div>
                )}

                <div className="w-full flex justify-between text-sm mt-[-8px]">
                    <p className="cursor-pointer">Forgot your password?</p>
                    <button 
                        type="button" 
                        className="cursor-pointer" 
                        onClick={handleCreateAccountClick}
                        disabled={formikLogin.isSubmitting}
                    >
                        Create account
                    </button>
                </div>

                <button 
                    className="bg-black text-white font-light px-8 py-2 mt-4" 
                    type="submit"
                    disabled={formikLogin.isSubmitting}
                >
                    {formikLogin.isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default Login;