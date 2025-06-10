// utils/handleApiError.js
import { toast } from 'react-hot-toast';

export const handleApiError = (error, navigate) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 500) {
            if (navigate) navigate('/500');
        } else {
            toast.error(error.response.data.message || 'Something went wrong');
        }
    } else {
        // Something happened in setting up the request
        toast.error('Network error - please check your connection');
    }
};