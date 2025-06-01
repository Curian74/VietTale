import Header from '../../components/Header'
import Footer from '../../components/Footer'
import HistoryFigure from '@/components/historicalFigure/historyFigure'
import TimeToast from '@/components/timetoast/timeToast'
import AboutUs from '@/components/home/aboutUs'
import Quiz from '@/components/home/quiz/quiz'

const Home = () => {

  return (
    <main>
      <Header />

      <div className="container mx-auto">

        <AboutUs />

        <TimeToast />

        <section className='my-10'>
          <HistoryFigure />
        </section>

        <Quiz />

      </div>

      <Footer />
    </main>
  )
}

export default Home
