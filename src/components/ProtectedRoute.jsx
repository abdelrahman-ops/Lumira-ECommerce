import { useAuth } from "../customHook/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    
    const token = Cookies.get("token");

    if (!isAuthenticated && !token) {
        
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    return children;
};

export default ProtectedRoute;
