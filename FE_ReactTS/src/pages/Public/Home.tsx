import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Timetoast from '../../components/Timetoast'
import SearchBar from '@/components/home/searchBar'
import { useState } from 'react'
import CustomCircularLoading from '@/components/layouts/CustomCircularLoading'
import HistoryFigure from '@/components/historicalFigure/historyFigure'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleXemThemClick = () => {
    navigate('/about-us');
  };

  return (
    <main>
      <Header />

      <div className="container mx-auto">

        {isLoading && <CustomCircularLoading />}
        <section className='my-10 bg-amber-50 p-8 flex flex-col md:flex-row items-center gap-10'>
          <div className="flex-1">
            <h2 className='text-2xl font-bold mb-4 border-b-2 border-amber-600 inline-block pb-1'>VỀ CHÚNG TÔI</h2>
            <p className="mb-4">
              Trải qua lịch sử hàng ngàn năm dựng và giữ nước, dân tộc Việt Nam đã hun đúc nên nhiều giá trị truyền thống văn hóa tốt đẹp, nổi bật là tinh thần yêu nước, đoàn kết, tương thân tương ái, nhân nghĩa, bao dung, cần cù, sáng tạo và ý chí kiên cường, bất khuất. Để giữ gìn, phát huy và lan tỏa tinh thần đó...
            </p>
            <button className="border border-gray-900 px-6 py-2 mt-4 hover:bg-gray-100" onClick={handleXemThemClick}>XEM THÊM</button>
          </div>
          <div className="flex gap-4 flex-1 justify-center">
            <img src="https://lichsuvietnam.online/resource/files/image00316012019105312.jpg" alt="Historical Image 1" className="max-w-sm"/>
            <img src="https://lichsuvietnam.online/resource/files/Danh-sach-14-vi-anh-hung-dan-toc-tieu-bieu-nhat-trong-lich-su-Viet-Nam-0.jpg" alt="Historical Image 2" className="max-w-sm"/>
          </div>
        </section>
        <section className='flex flex-col md:flex-row gap-2 md:gap-10 ml-2'>
          <SearchBar />
          <Timetoast onLoadComplete={() => {
            setIsLoading(false);
          }} />
        </section>


        <section className='my-10'>
          <HistoryFigure />
        </section>

      </div>

      <Footer />
    </main>
  )
}

export default Home
