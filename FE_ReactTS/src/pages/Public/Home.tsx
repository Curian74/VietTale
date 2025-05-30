import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Timetoast from '../../components/timeline'
import SearchBar from '@/components/home/searchBar'
import { useState } from 'react'
import CustomCircularLoading from '@/components/layouts/CustomCircularLoading'
import HistoryFigure from '@/components/historicalFigure/historyFigure'
import TimeToastTest from '@/components/timetoast/timeToast'

const Home = () => {

  return (
    <main>
      <Header />

      <div className="container mx-auto">

        <section>
          <TimeToastTest />
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
