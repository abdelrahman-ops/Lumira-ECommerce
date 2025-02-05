import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import axios from "axios";
import PhoneNumberInput from "../hooks/PhoneNumberInput";
import Title from '../components/Title'
const Register = () => {
    const { login } = useAuth();
    const { storeData } = useData();
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegisterSuccess = (token, user) => {
        Cookies.set("token", token);
        login(token);
        storeData(user);
        toast.success("Welcome!");

        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
    };

    // Validation schema
    const schema = Yup.object().shape({
        email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
        password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(/\d/, "Password must contain at least one number")
        // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        // .matches(
        //     /[!@#$%^&*(),.?":{}|<>]/,
        //     "Password must contain at least one special character"
        // )
        .required("Password is required"),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required"),
        // number: Yup.string()
        // .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
        // .required("Phone number is required"),
        // gender: Yup.string().required("Gender is required"),
        // dateOfBirth: Yup.date().required("Date of Birth is required"),
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
        onSubmit: async (values) => {
        try {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
            });

            const response = await axios.post(
            "https://server-e-commerce-seven.vercel.app/api/users/register",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
            );

            if (response.data.status) {
            toast.success("Sign-up successful!");
            handleRegisterSuccess(response.data.data.token, response.data.data.user);
            } else {
            toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(
            error.response?.data?.message || error.message || "Registration failed"
            );
        }
        },
    });

    const handleCloseSignUp = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <form
            className="flex flex-col items-center w-full gap-4"
            onSubmit={formik.handleSubmit}
        >
            <div className="inline-flex items-center gap-2 mb-2 mt-10 text-3xl prata-regular">
                <Title text1="Sign" text2="Up" />
            </div>

            {[
            { name: "firstName", type: "text", placeholder: "First Name" },
            { name: "lastName", type: "text", placeholder: "Last Name" },
            { name: "username", type: "text", placeholder: "Username" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "password", type: "password", placeholder: "Password" },
            {
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm Password",
            },
            ].map((field) => (
            <div key={field.name} className="w-full">
                <input
                {...field}
                className="w-full px-3 py-2 border border-gray-800"
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                />
                {formik.errors[field.name] && (
                <div className="text-red-600">{formik.errors[field.name]}</div>
                )}
            </div>
            ))}

            <PhoneNumberInput
            onChange={(completePhoneNumber) =>
                formik.setFieldValue("number", completePhoneNumber)
            }
            defaultPhone={formik.values.number}
            defaultCountryCode={"US"}
            />
            {formik.errors.number && (
            <div className="text-red-600">{formik.errors.number}</div>
            )}

            <div className="w-full">
            <label>Gender:</label>
            <label className="ml-2">
                <input
                type="radio"
                name="gender"
                value="male"
                checked={formik.values.gender === "male"}
                onChange={formik.handleChange}
                />{" "}
                Male
            </label>
            <label className="ml-2">
                <input
                type="radio"
                name="gender"
                value="female"
                checked={formik.values.gender === "female"}
                onChange={formik.handleChange}
                />{" "}
                Female
            </label>
            </div>
            {formik.errors.gender && (
            <div className="text-red-600">{formik.errors.gender}</div>
            )}

            <div className="w-full">
            <input
                type="date"
                name="dateOfBirth"
                className="w-full px-3 py-2 border border-gray-800"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
            />
            {formik.errors.dateOfBirth && (
                <div className="text-red-600">{formik.errors.dateOfBirth}</div>
            )}
            </div>

            <div className="w-full">
            <input
                type="file"
                name="image"
                className="w-full px-3 py-2 border border-gray-800"
                onChange={(event) =>
                formik.setFieldValue("image", event.currentTarget.files[0])
                }
            />
            {formik.errors.image && (
                <div className="text-red-600">{formik.errors.image}</div>
            )}
            </div>

            <div className="w-full flex justify-between text-sm mt-[-8px]">
            <button
                type="button"
                onClick={handleCloseSignUp}
                className="cursor-pointer"
            >
                Back to Login
            </button>
            </div>
            <button
            className="bg-black text-white font-light px-8 py-2 mt-4"
            type="submit"
            >
            Sign Up
            </button>
        </form>
        </div>
    );
};

export default Register;
