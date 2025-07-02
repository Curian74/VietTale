import { Button } from "@/components/ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { QADropdown } from "./home/QADropdown"
import logoImage from '../assets//images/logo/logo.jpg';
import { useAuth } from "@/contexts/AuthProvider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User } from "lucide-react";
import userAvatar from '@/assets/images/user/defaultAvatar.jpg';

const Header = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navigate = useNavigate();

    const navItems = [
        { label: "Trang chủ", to: "/" },
        { label: "Giới thiệu", to: "/about-us" },
        { label: "Sách", to: "#" },
        { label: "Video", to: "##" },
        { label: "Ôn tập", to: "/learning/latest" },
    ]

    const { isAuthenticated, logout, user } = useAuth();

    const dropdownItem = [
        {
            title: "Tài khoản",
            icon: User,
            style: "",
            onclick: () => navigate('/auth/profile'),
        },

        {
            title: "Đăng xuất",
            icon: LogOut,
            style: "text-[#d84545]",
            onclick: logout
        },
    ];

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
                    {!isAuthenticated ?
                        <>
                            <Link to={'/auth/login'}>
                                <Button
                                    variant="secondary"
                                    className="bg-[#212121] cursor-pointer hover:bg-[#2f2f2f] text-white">
                                    Đăng nhập
                                </Button>
                            </Link>
                            <Link
                                to={"/auth/register"}>
                                <Button
                                    variant="secondary"
                                    className="bg-[#f8b560] cursor-pointer hover:bg-[#d0a670] text-black">
                                    Đăng ký
                                </Button>
                            </Link>
                        </>
                        :
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center cursor-pointer">
                                        <img
                                            className="rounded-full w-20 md:w-10"
                                            src={user?.avatar || userAvatar}
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-56 z-100">
                                    <DropdownMenuGroup className="font-medium">
                                        {dropdownItem.map((item, index) => {
                                            const IconComponent = item.icon;
                                            return (
                                                <DropdownMenuItem
                                                    onClick={item.onclick}
                                                    key={index}
                                                    className="cursor-pointer flex items-center gap-2">
                                                    <IconComponent className={item.style} />
                                                    {item.title}
                                                </DropdownMenuItem>
                                            );
                                        })}
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
