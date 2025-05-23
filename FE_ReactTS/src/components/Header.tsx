import { Button } from "@/components/ui/button"
import { Link } from "react-router";
import { QADropdown } from "./home/QADropdown";

const Header = () => {
    return (
        <header className="bg-blue-800 text-white shadow mb-10">
            <div className="max-w-7xl mx-auto py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">VietTale</h1>
                <nav className="space-x-6 text-white font-medium">
                    <Link to="#" className="hover:border-b-2 hover:border-white pb-1 transition">Trang chủ</Link>
                    <Link to="#" className="hover:border-b-2 hover:border-white pb-1 transition">Giới thiệu</Link>
                    <Link to="#" className="hover:border-b-2 hover:border-white pb-1 transition">Sách</Link>
                    <Link to="#" className="hover:border-b-2 hover:border-white pb-1 transition">Video</Link>

                    <QADropdown></QADropdown>

                </nav>

                <div className="ml-10 flex gap-x-3">
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
    );
};

export default Header;
