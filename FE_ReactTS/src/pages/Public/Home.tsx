import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Timetoast from '../../components/Timetoast'
import SearchBar from '@/components/home/searchBar'
import { useState } from 'react'
import CustomCircularLoading from '@/components/layouts/CustomCircularLoading'
import HistoryFigure from '@/components/historicalFigure/historyFigure'

const Home = () => {

  const [isLoading, setIsLoading] = useState(true);

  return (
    <main>
      <Header />

      <div className="container mx-auto">

        {isLoading && <CustomCircularLoading />}
        <section className='flex gap-10'>
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
