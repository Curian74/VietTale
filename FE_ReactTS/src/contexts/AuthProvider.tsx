import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import type { AppUser } from '@/types/appUser';
import authService from '@/services/authService';

interface AuthContextType {
    token: string | null;
    login: (newToken: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    user: AppUser | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));
    const [user, setUser] = useState<AppUser>();
    const [isLoading, setIsLoading] = useState(true);

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
        localStorage.removeItem('email');
        setToken(null);
        navigate('/auth/login');
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const userEmail = localStorage.getItem('email');
                const data = await authService.getCurrentUserAsync(userEmail);
                setUser(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCurrentUser();
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, logout, login, user, isAuthenticated: !!token }}>
            {isLoading ? <div></div> : children}
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

export { useAuth };

