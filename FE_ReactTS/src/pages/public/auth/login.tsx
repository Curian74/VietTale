import Footer from '@/components/Footer';
import Header from '@/components/Header';
import loginBackground from '@/assets/images/backgrounds/auth.jpg'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { LoginRequest } from '@/types/requests/loginRequest';
import authService from '@/services/authService';
import { useAuth } from '@/contexts/AuthProvider';
import { Link, useNavigate } from 'react-router';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Alert, CircularProgress } from '@mui/material';

const validationSchema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email!'),
    password: yup.string().required('Vui lòng nhập mật khẩu!')
})

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const successMsg = location.state?.registerMessage;

    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();

    const handleLoginAsync = async (formData: LoginRequest) => {
        setIsLoading(true);
        try {
            const data = await authService.loginAsync(formData);

            const token = data.token;
            const email = data.email;
            const refreshToken = data.refreshToken;

            login(token, email, refreshToken);
            navigate('/');
        }

        catch (error) {
            const axiosError = error as AxiosError;
            console.log(error);
            if (axiosError.response) {
                setErrorMsg(axiosError.response.data as string);
            }
        }

        finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <Header />
            <div
                style={{
                    backgroundImage:
                        `url(${loginBackground})`,
                }}
                className="flex min-h-screen items-center justify-center bg-[#fdf6ea] bg-cover bg-center
                 animate-[staticFadeIn.6s_ease-out]"
            >
                <div className="bg-[#fff7e6]/90 backdrop-blur-sm shadow-lg rounded-2xl p-10 w-full max-w-md border border-[#d2b48c]
                 animate-[customFadeIn_0.6s_ease-out]">
                    <h2 className="text-3xl font-semibold text-center text-[#4b3b2a] mb-6">
                        Đăng nhập
                    </h2>

                    {successMsg && (
                        <Alert className='mb-3' variant='filled' severity="success">{successMsg}</Alert>
                    )}

                    <form
                        onSubmit={handleSubmit(handleLoginAsync)}
                        className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm text-[#4b3b2a] font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email")}
                                className="w-full px-4 py-2 rounded-md border border-[#c2a47e] transition-all duration-300 ease-in-out 
                                        focus:outline-none focus:ring-2 focus:ring-[#caa468] focus:bg-[#fff3e0] bg-[#fff9f1] text-[#3a2f22]"                                placeholder="Nhập email của bạn"
                            />
                            {errors.email?.message && <p className='text-red-400 text-sm'>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm text-[#4b3b2a] font-medium mb-1">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("password")}
                                className="w-full px-4 py-2 rounded-md border border-[#c2a47e] transition-all duration-300 ease-in-out 
                                            focus:outline-none focus:ring-2 focus:ring-[#caa468] focus:bg-[#fff3e0] bg-[#fff9f1] text-[#3a2f22]"                                placeholder="Nhập mật khẩu"
                            />
                            {errors.password?.message && <p className='text-red-400 text-sm'>{errors.password.message}</p>}
                        </div>

                        {errorMsg && (
                            <p className='text-red-400 text-md'>{errorMsg}</p>
                        )}

                        <button
                            type="submit"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(handleLoginAsync);
                                }
                            }}  
                            disabled={isLoading}
                            className="w-full cursor-pointer bg-[#cc9e55] hover:bg-[#b89252] hover:scale-[1.02] 
                                    text-white font-medium py-2 rounded-md shadow-sm 
                                    transition-transform duration-200 ease-in-out"
                        >
                            {isLoading
                                ? <CircularProgress
                                    color="inherit"
                                    className='mt-1 text-[#daddb9]'
                                    size={30} />
                                : <p>Đăng nhập</p>
                            }
                        </button>

                        <p className="text-sm text-center text-[#5a4633] mt-4">
                            Chưa có tài khoản?
                            <Link
                                to={'/auth/register'}
                                className="underline text-[#8b5e3c] ml-1">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Login;
