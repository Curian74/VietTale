import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { QADropdown } from "./home/QADropdown"

const Header = () => {
    const location = useLocation()
    const currentPath = location.pathname

    const navItems = [
        { label: "Trang chủ", to: "/" },
        { label: "Giới thiệu", to: "#" },
        { label: "Sách", to: "#" },
        { label: "Video", to: "#" },
    ]

    return (
        <header className="bg-blue-800 text-white shadow mb-10 sticky top-0 z-100">
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
                    VietTale
                </Link>

                {/* Navigation */}
                <nav className="space-x-6 text-white font-medium">
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
                            className="hover:border-b-2 hover:border-white pb-1 transition"
                        >
                            {item.label}
                        </Link>
                    ))}

                    <QADropdown />
                </nav>

                {/* Auth buttons */}
                <div className="ml-10 flex flex-col md:flex-row gap-3">
                    <Button
                        variant="secondary"
                        className="bg-[#212121] cursor-pointer hover:bg-[#2f2f2f] text-white">
                        Đăng nhập
                    </Button>
                    <Button
                        variant="secondary"
                        className="bg-[#f6f6f7] cursor-pointer hover:bg-[#e9e9e2] text-black">
                        Đăng ký
                    </Button>
                </div>
            </div>
        </header>
    )
}

export default Header
