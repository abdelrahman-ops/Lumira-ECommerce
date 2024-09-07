
import { Navigate , useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    const token = Cookies.get("token");

    if (!isAuthenticated && !token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;