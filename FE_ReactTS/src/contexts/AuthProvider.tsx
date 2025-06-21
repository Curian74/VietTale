import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import type { AppUser } from '@/types/appUser';
import authService from '@/services/authService';
import Swal from 'sweetalert2';

interface AuthContextType {
    token: string | null;
    login: (newToken: string, email: string, refreshToken: string) => void;
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

    const login = (newToken: string, email: string, refreshToken: string) => {
        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('email', email);
        localStorage.setItem('refreshToken', refreshToken);
        setToken(newToken);
    };

    const logout = () => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn đăng xuất không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đăng xuất',
            cancelButtonText: 'Hủy',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('email');
                localStorage.removeItem('refreshToken');
                setToken(null);
                navigate('/auth/login');
            }
        });
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

