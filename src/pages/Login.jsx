import { useFormik} from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation , useNavigate} from 'react-router-dom';

import Cookies from "js-cookie";
import { useAuth } from '../hooks/AuthContext';
import { useData } from '../hooks/DataContext';



const Login = () => {
    const { login } = useAuth();
    const { storeData } = useData();
    const navigate = useNavigate();
    const location = useLocation();

    
    
    
    const handleLoginSuccess = (token) =>{
        Cookies.set("token", token)
        login(token);
        toast.success("Login successful!");
        
        const redirectPath = location.state?.from?.pathname || '/';
        navigate(redirectPath);
    }

    
    // SCHEMA FOR VALIDATION
    const schema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            // .matches(/\d/, "Password must contain at least one number")
            // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            // .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
            .required("Password is required"),
    });
            
    


    // SIGN IN FORM handling
    const formikLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema ,
        
        onSubmit: values => {
            
            // ######################
            // # Backend Validation #
            // ######################
        //     fetch("http://localhost:5050/api/users/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(values),
        //     })
        //     .then((validationResponse) =>validationResponse.json()
        //     .then((validationData) => {
        //         console.log(validationData);
        //         if (validationResponse.status === 422) {
        //             toast.error(validationData.message || "Validation failed!");
        //             return;
        //         }
        //     })
        // )
        // .catch(() => toast.error("An error occurred during validation!"));
            
            
        
            // ######################
            // #  Authentication   #
            // ######################
            // fetch("https://pm.alexondev.net/api/login", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify(values),
            // })
            // .then((res)=> res.json())
            // .then(res => {
            //     console.log(res);
            //     if (res.data && res.data.user.token) {
            //         handleLoginSuccess(res.data.user.token);
            //         console.log("User data before storing:", res.data.user);
            //         storeData(res.data.user);
            //         console.log("Stored data successfully.");

            //     } else {
            //         toast.error("Invalid credentials!");
            //     }
            // })
            // .catch(() => toast.error("An error occurred!"));


            fetch("http://localhost:5050/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            .then((res)=> res.json())
            .then(res => {
                console.log(res);
                
                if (res.data.user && res.data.token) {
                    handleLoginSuccess(res.data.token);
                    // console.log("User data before storing:", res.data.user);
                    storeData(res.data.user);
                    console.log("Stored data successfully.");
                } else {
                    toast.error("Invalid credentials!");
                }
            })
            .catch(() => toast.error("An error occurred!"));
        },
    });

    const handleCreateAccountClick = () => {
        navigate('/register')
    };

    

    return (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
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
        </div>
    );
};

export default Login;