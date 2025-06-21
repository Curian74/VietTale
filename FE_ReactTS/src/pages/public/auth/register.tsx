import Footer from '@/components/Footer';
import Header from '@/components/Header';
import authBackground from '@/assets/images/backgrounds/auth.jpg'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import authService from '@/services/authService';
import type { AxiosError } from 'axios';
import type { RegisterRequest } from '@/types/requests/registerRequest';

const validationSchema = yup.object().shape({
    email: yup.string().required('Vui lòng nhập email!'),
    password: yup.string().required('Vui lòng nhập mật khẩu!'),
    confirmPassword: yup
        .string()
        .required('Vui lòng nhập lại mật khẩu!')
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp!'),
    username: yup.string().required('Vui lòng nhập tên người dùng!')
});

const Register = () => {
    const [errorMsg, setErrorMsg] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const navigate = useNavigate();

    const handleRegisterAsync = async (formData: RegisterRequest) => {
        console.log("ali");
        try {
            const data = await authService.registerAsync(formData);

            if (data.succeeded) {
                navigate('/auth/login', { state: { registerMessage: 'Đăng ký thành công! Vui lòng đăng nhập.' } });
            }

            else {
                setErrorMsg(data.errors[0].description || 'Đăng ký không thành công. Vui lòng thử lại sau.');
                console.log(data.errors[0].description);
            }
        }

        catch (error) {
            const axiosError = error as AxiosError;
            console.log(error);
            if (axiosError.response) {
                setErrorMsg(axiosError.response.data as string);
            }
        }
    }

    return (
        <main>
            <Header />
            <div
                style={{
                    backgroundImage:
                        `url(${authBackground})`,
                }}
                className="flex min-h-screen items-center justify-center bg-[#fdf6ea] bg-cover bg-center
                 animate-[staticFadeIn.6s_ease-out]"
            >
                <div className="bg-[#fff7e6]/90 backdrop-blur-sm shadow-lg rounded-2xl p-10 w-full max-w-md border border-[#d2b48c]
                 animate-[customFadeIn_0.6s_ease-out]">
                    <h2 className="text-3xl font-semibold text-center text-[#4b3b2a] mb-6">
                        Đăng Ký
                    </h2>
                    <form
                        onSubmit={handleSubmit(handleRegisterAsync)}
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
                                        focus:outline-none focus:ring-2 focus:ring-[#caa468] focus:bg-[#fff3e0] bg-[#fff9f1] text-[#3a2f22]"
                                placeholder="Nhập email của bạn"
                            />
                            {errors.email?.message && <p className='text-red-400 text-sm'>{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm text-[#4b3b2a] font-medium mb-1">
                                Tên người dùng
                            </label>
                            <input
                                {...register("username")}
                                className="w-full px-4 py-2 rounded-md border border-[#c2a47e] transition-all duration-300 ease-in-out 
                                        focus:outline-none focus:ring-2 focus:ring-[#caa468] focus:bg-[#fff3e0] bg-[#fff9f1] text-[#3a2f22]"
                                placeholder="Nhập username"
                            />
                            {errors.username?.message && <p className='text-red-400 text-sm'>{errors.username.message}</p>}
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

                        <div>
                            <label htmlFor="password" className="block text-sm text-[#4b3b2a] font-medium mb-1">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                {...register("confirmPassword")}
                                className="w-full px-4 py-2 rounded-md border border-[#c2a47e] transition-all duration-300 ease-in-out 
                                            focus:outline-none focus:ring-2 focus:ring-[#caa468] focus:bg-[#fff3e0] bg-[#fff9f1] text-[#3a2f22]"                                placeholder="Nhập mật khẩu"
                            />
                            {errors.confirmPassword?.message && <p className='text-red-400 text-sm'>{errors.confirmPassword.message}</p>}
                        </div>


                        {errorMsg && (
                            <p className='text-red-400 text-md'>{errorMsg}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-[#cc9e55] hover:bg-[#b89252] hover:scale-[1.02] 
                                    text-white font-medium py-2 rounded-md shadow-sm 
                                    transition-transform duration-200 ease-in-out"
                        >
                            Đăng Ký
                        </button>

                        <p className="text-sm text-center text-[#5a4633] mt-4">
                            Đã có tài khoản?
                            <Link
                                to={'/auth/login'}
                                className="underline text-[#8b5e3c]">
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Register
