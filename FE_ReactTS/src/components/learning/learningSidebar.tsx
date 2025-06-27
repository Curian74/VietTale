import { NavLink } from "react-router-dom";
import { Bell, FolderOpen, Home, AlignJustify, X } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

const navItems = [
    { label: "Trang chủ", to: "/learning/latest", icon: <Home size={18} /> },
    { label: "Thư viện của bạn", to: "/#", icon: <FolderOpen size={18} /> },
    { label: "Thông báo", to: "/#", icon: <Bell size={18} /> },
];

export default function LearningSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [openMobile, setOpenMobile] = useState(false);

    return (
        <>
            <div className="md:hidden p-2">
                <button
                    onClick={() => setOpenMobile(!openMobile)}
                    className="text-gray-600"
                >
                    <AlignJustify size={24} />
                </button>
            </div>

            <div
                className={clsx(
                    "bg-white text-[#586380] font-semibold pt-27 flex flex-col transition-all duration-300 ease-in-out border-gray-200",
                    collapsed ? "w-16" : "w-60",
                    "hidden md:flex fixed top-0 left-0 min-h-[90vh] z-40",
                    openMobile && "!fixed z-50 top-0 left-0 h-full w-60 !flex md:hidden shadow-lg"
                )}
            >

                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    {!collapsed && <h2 className="text-xl font-bold">Điều hướng</h2>}
                    <button
                        onClick={() =>
                            openMobile ? setOpenMobile(false) : setCollapsed(!collapsed)
                        }
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <div className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                            {openMobile ? <X size={20} /> : <AlignJustify size={20} />}
                        </div>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 px-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                clsx(
                                    "flex items-center gap-3 py-2 px-2 rounded hover:bg-[#f6f7fb] transition-all",
                                    isActive
                                        ? "bg-[#e6f0ff] text-[#1a73e8] font-semibold"
                                        : "text-[#586380]"
                                )
                            }
                        >
                            {item.icon}
                            {!collapsed && <span>{item.label}</span>}
                        </NavLink>

                    ))}
                    <hr className="border-1"></hr>
                </nav>
            </div>
        </>
    );
}
