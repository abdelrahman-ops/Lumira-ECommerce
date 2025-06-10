import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorBoundary = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const errorHandler = (error) => {
        console.error('Error caught by error boundary:', error);
        navigate('/500');
        };

        window.addEventListener('error', errorHandler);
        window.addEventListener('unhandledrejection', errorHandler);

        return () => {
        window.removeEventListener('error', errorHandler);
        window.removeEventListener('unhandledrejection', errorHandler);
        };
    }, [navigate]);

    return children;
};

export default ErrorBoundary;