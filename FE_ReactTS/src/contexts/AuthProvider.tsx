import React, { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router';

interface AuthContextType {
    token: string | null;
    login: (newToken: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const navigate = useNavigate();

    const login = (newToken: string, email: string) => {
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('email', email);
        setToken(newToken);
    };

    const logout = () => {
        const isConfirm = confirm('Bạn có chắc là muốn đăng xuất không?');

        if (!isConfirm) return;

        localStorage.removeItem('accessToken');
        setToken(null);
        navigate('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ token, logout, login, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }
    return context;
};

export default useAuth;

