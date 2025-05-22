import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Timetoast from '../../components/Timetoast'
import SearchBar from '@/components/layouts/home/searchBar'
import { useState } from 'react'
import CustomCircularLoading from '@/components/layouts/CustomCircularLoading'

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      <Header />

      <div className="container mx-auto">

        <section className='flex gap-10'>
          <SearchBar />
          <Timetoast onLoadComplete={() => {
            setIsLoading(false);
          }} />
        </section>

        {isLoading && <CustomCircularLoading />}

        <section className='my-10'>
          <h1 className='text-center text-3xl font-medium mb-8'>NHÂN VẬT LỊCH SỬ</h1>
          <div className='flex items-center gap-10'>

          </div>
        </section>

      </div>

      <Footer />
    </main>
  )
}

export default Home
