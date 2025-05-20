import { Button } from "@/components/ui/button"

const Header = () => {
    return (
        <header className="bg-blue-800 text-white shadow mb-10">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">VietTale</h1>
                <nav className="space-x-4">
                    <a href="#" className="hover:underline">Trang chủ</a>
                    <a href="#" className="hover:underline">Mốc thời gian</a>
                    <a href="#" className="hover:underline">Liên hệ</a>
                </nav>

                <div className="ml-10 flex gap-x-3">
                    <Button
                        variant="secondary"
                        className="bg-[#f6f6f7] cursor-pointer hover:bg-[#e9e9e2] text-black">
                        Sign in
                    </Button>
                    <Button
                        variant="secondary"
                        className="bg-[#f6f6f7] cursor-pointer hover:bg-[#e9e9e2] text-black">
                        Register
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
