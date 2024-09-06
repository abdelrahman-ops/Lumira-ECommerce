import { useFormik} from 'formik';
import * as Yup from 'yup';

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const Login = () => {
    
    const location = useLocation();
    const [showSignUp, setShowSignUp] = useState(false);
    
    useEffect(() => {
        if (location.state?.showSignUp === false) {
            setShowSignUp(false);
        }
    }, [location.state]);
    
            // SCHEMA FOR VALIDATION
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Invalid email format")
                    .required("Email is required"),
                password: Yup.string()
                    .min(8, "Password must be at least 8 characters long")
                    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
                    .matches(/\d/, "Password must contain at least one number")
                    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
                    .required("Password is required"),
            });
            
    


            // SIGN IN FORM
    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema ,
        onSubmit: values => {
            const missing = [];
            if (!values.email) {
                missing.push("Email");
            }
            if (!values.password) {
                missing.push("Password");
            }

            if (missing.length > 0) {
            toast.error(`Please fill in ${missing.join(", ")}`);
        } else {
            toast.success("Login successful!");
        }
        },
    });

    
            // signup form  
    const formikSignUp = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        onSubmit: values => {
            if (!values.name || !values.email || !values.password || !values.confirmPassword) {
                toast.error("Please fill in all fields");
            } else if (values.password !== values.confirmPassword) {
                toast.error("Passwords do not match");
            } else {
                toast.success("Sign-up successful!");
            }
        },
    });

    const handleCreateAccountClick = () => {
        setShowSignUp(true);
    };

    const handleCloseSignUp = () => {
        setShowSignUp(false);
    };

    return (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <ToastContainer />
            
            {!showSignUp ? (
                
                <form className="flex flex-col items-center w-full gap-4" onSubmit={formikLogin.handleSubmit}>
                    <div className="inline-flex items-center gap-2 mb-2 mt-10">
                        <p className="prata-regular text-3xl">Login</p>
                        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
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
            ) : (
                <form className="flex flex-col items-center w-full gap-4" onSubmit={formikSignUp.handleSubmit}>
                    <div className="inline-flex items-center gap-2 mb-2 mt-10">
                        <p className="prata-regular text-3xl">Sign Up</p>
                        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                    </div>

                    <input
                        type="text"
                        name="name"
                        className="w-full px-3 py-2 border border-gray-800"
                        placeholder="Name"
                        value={formikSignUp.values.name}
                        onChange={formikSignUp.handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-800"
                        placeholder="Email"
                        value={formikSignUp.values.email}
                        onChange={formikSignUp.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="w-full px-3 py-2 border border-gray-800"
                        placeholder="Password"
                        value={formikSignUp.values.password}
                        onChange={formikSignUp.handleChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        className="w-full px-3 py-2 border border-gray-800"
                        placeholder="Confirm Password"
                        value={formikSignUp.values.confirmPassword}
                        onChange={formikSignUp.handleChange}
                    />
                    <div className="w-full flex justify-between text-sm mt-[-8px]">
                        <button type="button" onClick={handleCloseSignUp} className="cursor-pointer">
                            Back to Login
                        </button>
                    </div>
                    <button className="bg-black text-white font-light px-8 py-2 mt-4" type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
};

export default Login;
