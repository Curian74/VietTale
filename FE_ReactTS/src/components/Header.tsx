import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { QADropdown } from "./home/QADropdown"
import logoImage from '../assets//images/logo/logo.jpg';

const Header = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const navItems = [
        { label: "Trang chủ", to: "/" },
        { label: "Giới thiệu", to: "/about-us" },
        { label: "Sách", to: "#" },
        { label: "Video", to: "#" },
    ]

    return (
        <header className="bg-[#fdf6ea] text-black shadow mb-0 sticky top-0 z-100">
            <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    onClick={(e) => {
                        if (currentPath === '/') {
                            e.preventDefault()
                            window.location.reload()
                        }
                    }}
                    className="text-2xl font-bold"
                >
                    <img className="rounded-full max-w-20" src={logoImage}></img>
                </Link>

                {/* Navigation */}
                <nav className="space-x-6 text-black font-medium">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            onClick={(e) => {
                                if (currentPath === item.to) {
                                    e.preventDefault()
                                    window.location.reload()
                                }
                            }}
                            className="hover:border-b-2 hover:border-black pb-1 transition"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <QADropdown />
                </nav>

                {/* Auth buttons */}
                <div className="ml-10 flex flex-col md:flex-row gap-3">
                    <Link to={'auth/login'}>
                        <Button
                            variant="secondary"
                            className="bg-[#212121] cursor-pointer hover:bg-[#2f2f2f] text-white">
                            Đăng nhập
                        </Button>
                    </Link>
                    <Button
                        variant="secondary"
                        className="bg-[#f8b560] cursor-pointer hover:bg-[#d0a670] text-black">
                        Đăng ký
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header
