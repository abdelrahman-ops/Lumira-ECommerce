import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../stores/authStore';

const GuestRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default GuestRoute;