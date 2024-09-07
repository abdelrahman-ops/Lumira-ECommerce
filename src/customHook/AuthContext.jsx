/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for token in cookies or localStorage on mount
    useEffect(() => {
        const token = Cookies.get("token");
        const storedUser = Cookies.get("user");
        if (token && setUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        Cookies.set("token", userData.token); // Store token in cookies
        Cookies.set("user", JSON.stringify(userData)); // Store user data in cookies
        setUser(userData); // Set user data in state
        setIsAuthenticated(true);
    };

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user"); // Remove user data from cookies
        setUser(null); // Clear user data in state
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user , login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
