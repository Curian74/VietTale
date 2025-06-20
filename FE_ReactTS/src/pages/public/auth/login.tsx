import Footer from '@/components/Footer';
import Header from '@/components/Header';
import loginBackground from '@/assets/images/backgrounds/login.jpg'

const Login = () => {
    return (
        <main>
            <Header />
            <div
                style={{
                    backgroundImage:
                        `url(${loginBackground})`,
                }}
                className="flex min-h-screen items-center justify-center bg-[#fdf6ea] bg-cover bg-center"
            >
                <div className="bg-[#fff7e6]/90 backdrop-blur-sm shadow-lg rounded-2xl p-10 w-full max-w-md border border-[#d2b48c]">
                    <h2 className="text-3xl font-semibold text-center text-[#4b3b2a] mb-6">
                        Đăng nhập
                    </h2>
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm text-[#4b3b2a] font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 rounded-md border border-[#c2a47e] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#caa468] bg-[#fff9f1] text-[#3a2f22]"
                                placeholder="Nhập email của bạn"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm text-[#4b3b2a] font-medium mb-1">
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 rounded-md border border-[#c2a47e] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#caa468] bg-[#fff9f1] text-[#3a2f22]"
                                placeholder="Nhập mật khẩu"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-[#caa468] hover:bg-[#b89252] text-white font-medium py-2 rounded-md shadow-sm transition-all duration-200 ease-in-out"
                        >
                            Đăng nhập
                        </button>
                        <p className="text-sm text-center text-[#5a4633] mt-4">
                            Chưa có tài khoản? <a href="/register" className="underline text-[#8b5e3c]">Đăng ký ngay</a>
                        </p>
                    </form>
                </div>
            </div>
            <Footer />
        </main>
    );
};

export default Login;
