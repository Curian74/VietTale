import { Link } from 'react-router';
import aboutUs1 from '../../assets/images/aboutUs/aboutUs1.jpg';
import aboutUs2 from '../../assets/images/aboutUs/aboutUs2.jpg';

const INTRODUCTION_TEXT = 'Trải qua lịch sử hàng ngàn năm dựng và giữ nước, dân tộc Việt Nam đã hun đúc nên nhiều giá trị truyền thống văn hóa tốt đẹp, nổi bật là tinh thần yêu nước, đoàn kết, tương thân tương ái, nhân nghĩa, bao dung, cần cù, sáng tạo và ý chí kiên cường, bất khuất. Để giữ gìn, phát huy và lan toả tinh thần đó...';

const AboutUs = () => {
    return (
        <section className="mb-10 w-10/12 ml-2 md:ml-20">
            <div>
                <h1 className='uppercase text-3xl font-medium'>Về chúng tôi</h1>
            </div>

            <div className="bg-[#f8b560] p-0.5 w-9 ml-1 my-2 mb-4"></div>

            {/* Content section */}
            <div className='flex flex-col gap-5 md:flex-row'>
                {/* Text and button */}
                <div className='flex flex-col gap-y-2 md:gap-y-10'>
                    <div className="text-sm">
                        {INTRODUCTION_TEXT}
                    </div>

                    <div>
                        <Link
                            to={'/about-us'}
                            className='border-2 cursor-pointer
                             transition-colors duration-200
                             hover:bg-[#f8b560] hover:text-white border-black py-2.5 px-4 rounded font-semibold'>
                            XEM THÊM
                        </Link>
                    </div>
                </div>

                {/* Images */}
                <div>
                    <img src={aboutUs1} alt='img'></img>
                </div>

                <div>
                    <img src={aboutUs2} alt='img'></img>
                </div>

            </div>

        </section>
    )
}

export default AboutUs
