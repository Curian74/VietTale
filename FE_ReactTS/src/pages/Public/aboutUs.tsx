import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookOpenIcon from '@heroicons/react/24/outline/BookOpenIcon';
import NewspaperIcon from '@heroicons/react/24/outline/NewspaperIcon';
import VideoCameraIcon from '@heroicons/react/24/outline/VideoCameraIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';
import LightBulbIcon from '@heroicons/react/24/outline/LightBulbIcon';

const AboutUs = () => {
    return (
        <main className="font-sans text-gray-800">
            <Header />

            <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row gap-8 bg-orange-50">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4 bg-white p-6 rounded-xl shadow-md space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold border-b border-orange-300 pb-2 mb-4 text-gray-800">DANH MỤC</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <BookOpenIcon className="h-5 w-5 text-orange-600" />
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Câu chuyện lịch sử</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <NewspaperIcon className="h-5 w-5 text-orange-600" />
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Bài viết</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <VideoCameraIcon className="h-5 w-5 text-orange-600" />
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Video</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <UsersIcon className="h-5 w-5 text-orange-600" />
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Dòng họ</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <InformationCircleIcon className="h-5 w-5 text-orange-600" />
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Tham Khảo</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <LightBulbIcon className="h-5 w-5 text-orange-600" />
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Hướng dẫn sử dụng</a>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4 border-b border-orange-200 pb-2 text-gray-800">TIN TỨC MỚI</h3>
                        <div className="space-y-4">
                            <div className="border-b border-orange-100 pb-3">
                                <p className="text-sm text-gray-500 mb-1">15/03/2024</p>
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Khám phá di tích lịch sử mới phát hiện tại Hà Nội</a>
                            </div>
                            <div className="border-b border-orange-100 pb-3">
                                <p className="text-sm text-gray-500 mb-1">12/03/2024</p>
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Triển lãm "Văn hóa dân gian Việt Nam qua các thời kỳ"</a>
                            </div>
                            <div className="border-b border-orange-100 pb-3">
                                <p className="text-sm text-gray-500 mb-1">10/03/2024</p>
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Phát hiện tư liệu quý về triều đại nhà Lý</a>
                            </div>
                            <div className="border-b border-orange-100 pb-3">
                                <p className="text-sm text-gray-500 mb-1">08/03/2024</p>
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Hội thảo về bảo tồn di sản văn hóa phi vật thể</a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">05/03/2024</p>
                                <a href="#" className="text-gray-700 hover:text-gray-900 hover:underline">Ra mắt bộ sách "Lịch sử Việt Nam qua các triều đại"</a>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <article className="flex-1 bg-white p-8 rounded-xl shadow-md prose prose-lg max-w-none">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-orange-600 mb-2">Giới thiệu</h1>
                        <p className="text-gray-600 text-sm">Trang chủ / Giới thiệu</p>
                    </div>

                    <p>
                        Lịch sử trường tồn mãi theo thời gian, làm một việc gì đó để đời đời ghi nhớ công ơn của các bậc tiền nhân, các bậc tiền bối cách mạng, các anh hùng liệt sĩ, các chiến sỹ đồng bào đã hy sinh quên mình vì nền độc lập dân tộc của nước Việt Nam ta ngày nay. Việc ghi chép lại lịch sử theo thứ tự thời gian, thống kê về các sự kiện, con người và bài học thành công hay thất bại trong suốt 4000 năm lịch sử góp phần giáo dục truyền thống lịch sử văn hóa, lòng yêu nước, niềm tự hào, tự tôn dân tộc càng phải được coi trọng. Bởi đó là nhân tố, là nền tảng tư tưởng vun đắp nhân cách đẹp đẽ, hình thành lối sống cao thượng cho mỗi cuộc đời, mỗi con người. Đó chính là lí do mà Tùng Việt Smart Education thực hiện dự án này.
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md my-6">
                        <h4 className="text-lg font-semibold text-red-700">
                            TRA CỨU DỄ DÀNG - THÔNG TIN CHUẨN XÁC - CÂU CHUYỆN HẤP DẪN - THỂ HIỆN SINH ĐỘNG
                        </h4>
                        <p className="text-red-700 mt-2">
                            là nội dung cốt lõi và khác biệt chúng tôi muốn người đọc có thể dễ dàng tìm kiếm và dễ nhớ để học cho riêng mỗi bản thân mình khi truy cập trang web này.
                        </p>
                    </div>

                    <p>
                        Trang web hoạt động dưới dạng hệ thống mở, bạn đăng ký và đăng nhập. Bạn sẽ cập nhập, góp ý, lưu giữ được nhân vật bạn biết và yêu thích, các bài viết lịch sử hay bạn muốn lan toả. Bạn cũng có thể tạo câu hỏi trắc nghiệm cùng chia sẻ kiến thức với mọi người nhằm lan toả giá trị văn hoá lịch sử tới các thế hệ trẻ, đặc biệt là các giáo viên bộ môn Sử dùng làm tài liệu giảng dạy. Tất nhiên bạn cũng có thể trả lời các câu hỏi trắc nghiệm để hệ thống tự đánh giá kiến thức của mình về lịch sử.
                    </p>

                    <p>
                        Trang web xin chân thành cảm ơn các nguồn tin tham khảo khác nhau như sách, báo, tạp chí, cơ sở dữ liệu, các website lịch sử, kênh Youtube được nêu trong phần tham khảo... Chính các bạn đã làm những điều tuyệt vời và giúp cho chúng tôi hệ thống hoá theo cách của riêng mình nhằm góp phần nhỏ trong việc lan toả kiến thức lịch sử, giá trị văn hoá tới nhiều thế hệ khác nhau trên đất nước Việt Nam lẫn những độc giả nước ngoài muốn quan tâm hiểu về lịch sử, đất nước con người Việt Nam.
                    </p>

                    <p className="italic text-gray-600">Vì cuộc sống tốt đẹp hơn</p>
                </article>
            </div>

            <Footer />
        </main>
    );
};

export default AboutUs;