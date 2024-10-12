import { useFormik } from 'formik';
import * as Yup from 'yup';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocation , useNavigate} from 'react-router-dom';
import Cookies from "js-cookie";
import { useAuth } from '../customHook/AuthContext';
import { useData } from '../customHook/DataContext';
import axios from 'axios';
import PhoneNumberInput from '../customHook/PhoneNumberInput';


const Register = () => {
    const { login } = useAuth();
    const { storeData } = useData();
    const navigate = useNavigate();
    const location = useLocation();
    
    
    const handleRegisterSuccess = (token) =>{
        Cookies.set("token", token)
        login(token);
        toast.success("Welcome!");
        
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
            .matches(/\d/, "Password must contain at least one number")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
            .required("Password is required"),
        username: Yup.string()
            .required("Username is required"),
        firstName: Yup.string().required(),
    });

    const formikSignUp = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            number: "",
            gender: "",
            dateOfBirth: "",
            image: null
        },
        validationSchema: schema ,
        
        onSubmit: async (values) => {
            if (!values.firstName || !values.lastName || !values.username || !values.email || !values.password || !values.number || !values.gender || !values.dateOfBirth) {
                toast.error("Please fill in all fields");
            } else {
                try {
                    const formData = new FormData();
                    formData.append('firstName', values.firstName);
                    formData.append('lastName', values.lastName);
                    formData.append('username', values.username);
                    formData.append('email', values.email);
                    formData.append('password', values.password);
                    formData.append('number', values.number);
                    formData.append('gender', values.gender);
                    formData.append('dateOfBirth', values.dateOfBirth);
                    formData.append('image', values.image);
                    
                    
                    const response = await axios.post('http://localhost:5050/api/users/register', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    if (response.data.status === true) {
                        toast.success('Sign-up successful!');
                        handleRegisterSuccess(response.data.data.token);
                        storeData(response.data.data.user);
                    } else {
                        toast.error(response.data.message || 'Something went wrong');
                    }
                } catch (error) {
                    console.error("Error during registration:", error);
                    toast.error(error.response?.data?.message || "Error during registration");
                }
            }
        },
    });
    
    const handleCloseSignUp = () => {
        navigate('/login')
    };

    return (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <form className="flex flex-col items-center w-full gap-4" onSubmit={formikSignUp.handleSubmit}>
                <div className="inline-flex items-center gap-2 mb-2 mt-10">
                    <p className="prata-regular text-3xl">Sign Up</p>
                    <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
                </div>

                <input
                    type="text"
                    name="firstName"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="First Name"
                    value={formikSignUp.values.firstName}
                    onChange={formikSignUp.handleChange}
                />
                <input
                    type="text"
                    name="lastName"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Last Name"
                    value={formikSignUp.values.lastName}
                    onChange={formikSignUp.handleChange}
                />
                <input
                    type="text"
                    name="username"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="username"
                    value={formikSignUp.values.username}
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
                {/* <input
                    type="text"
                    name="number"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Phone Number"
                    value={formikSignUp.values.number}
                    onChange={formikSignUp.handleChange}
                /> */}

                <PhoneNumberInput
                    onChange={(completePhoneNumber) => formikSignUp.setFieldValue('number', completePhoneNumber)}
                    defaultPhone={formikSignUp.values.number}
                    defaultCountryCode={''}  // Adjust this if you have default country data
                />
                <div>
                    <label>Gender: </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            onChange={formikSignUp.handleChange}
                        /> Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            onChange={formikSignUp.handleChange}
                        /> Female
                    </label>
                </div>
                <input
                    type="date"
                    name="dateOfBirth"
                    className="w-full px-3 py-2 border border-gray-800"
                    placeholder="Confirm Password"
                    value={formikSignUp.values.dateOfBirth}
                    onChange={formikSignUp.handleChange}
                />
                <input
                    type="file"
                    name="image"
                    className="w-full px-3 py-2 border border-gray-800"
                    onChange={(event) => formikSignUp.setFieldValue('image', event.currentTarget.files[0])}
                />
                <div className="w-full flex justify-between text-sm mt-[-8px]">
                    <button type="button" onClick={handleCloseSignUp} className="cursor-pointer">
                        Back to Login
                    </button>
                </div>
                <button className="bg-black text-white font-light px-8 py-2 mt-4" type="submit">Sign Up</button>
            </form>
        </div>
        
    );
};

export default Register;
