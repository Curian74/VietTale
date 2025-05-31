import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HistoryFigure from '@/components/historicalFigure/historyFigure'
import TimeToast from '@/components/timetoast/timeToast'

const Home = () => {

  return (
    <main>
      <Header />

      <div className="container mx-auto">

        <section>
          <TimeToast />
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
