import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuthStore } from "../../stores/authStore";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();

    
    const token = Cookies.get("token");

    if (!isAuthenticated && !token) {
        
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    
    return children;
};

export default ProtectedRoute;
