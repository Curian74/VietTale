import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useState } from 'react';
import userAvatar from '@/assets/images/user/defaultAvatar.jpg';
import { useAuth } from '@/contexts/AuthProvider';
import { Link } from 'react-router';

type SidebarTabs = 'Hồ sơ cá nhân' | 'Đổi mật khẩu';

const tabs: SidebarTabs[] =
    ['Hồ sơ cá nhân', 'Đổi mật khẩu']

const Profile = () => {

    const { user } = useAuth();

    const [activeTab, setActiveTab] = useState<SidebarTabs>('Hồ sơ cá nhân');

    return (
        <>
            <Header />
            <section className="md:min-h-[75vh] min-h-[55vh] py-10 w-full flex justify-center bg-[#fdf6ea]
            animate-[fadeInLeft_0.5s_ease-out]">
                <div className="bg-white rounded-2xl shadow-lg p-0 w-full max-w-6xl flex overflow-hidden">

                    {/* Sidebar */}
                    <aside className="w-32 md:w-64 bg-[#f7f3e9] border-r p-6">
                        <h2 className="text-xl font-semibold mb-6">Tài khoản</h2>
                        <ul className="space-y-4">
                            {tabs.map((i, key) => (
                                <li
                                    key={key}
                                    onClick={() => {
                                        setActiveTab(i);
                                    }}
                                    className={`${activeTab === i
                                        ? `text-blue-600`
                                        : `text-gray-700`
                                        } font-medium cursor-pointer hover:underline`}>
                                    {i}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <div className="flex-1 p-10">
                        <h1 className="text-3xl font-semibold mb-8 text-center">Thông tin tài khoản</h1>

                        <div className="flex gap-8">
                            {/* Form inputs */}
                            <div className="flex-1 space-y-3">
                                <div>
                                    <label className="block text-base font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        disabled
                                        className="mt-1 bg-gray-100 w-full md:w-2/4 rounded-lg border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={user?.userName ?? ''}
                                    />
                                </div>

                                <div>
                                    <label className="block text-base font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        disabled
                                        className="mt-1 bg-gray-100 w-full md:w-2/4 rounded-lg border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={user?.email ?? ''}
                                    />
                                </div>

                                {/* <div>
                                    <label className="block text-base font-medium text-gray-700">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        className="mt-1 w-full md:w-2/4 rounded-lg border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Số điện thoại"
                                        value={user?.phoneNumber ?? ''}
                                    />
                                </div> */}
                            </div>

                            {/* Avatar */}
                            <div className="flex flex-col justify-center items-center">
                                <img
                                    src={user?.avatar || userAvatar}
                                    alt="Avatar"
                                    className="md:w-28 md:h-28 w-20 h-20 rounded-full border-4 border-white shadow-md"
                                />
                                <p className="mt-2 text-gray-600 text-sm">Ảnh đại diện</p>
                            </div>
                        </div>
                        <div className='flex justify-end mt-10 md:mt-30 gap-5'>
                            <button
                                type="submit"
                                className="md:w-1/6 w-1/2 cursor-pointer bg-[#3fa17d] hover:bg-[#396656] 
                                    text-white font-medium py-2 rounded-md shadow-sm transition-all duration-200"
                            >
                                Cập nhật
                            </button>

                            <Link
                                to={'/'}
                                type="submit"
                                className="md:w-1/6 w-1/2 cursor-pointer text-center bg-[#d84545] hover:bg-[#c82333] p-2
                                    text-white font-medium py-2 rounded-md shadow-sm transition-all duration-200"
                            >
                                Hủy
                            </Link>
                        </div>
                    </div>
                </div>

            </section>

            <Footer />
        </>
    );
};

export default Profile;
