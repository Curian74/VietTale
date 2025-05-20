import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Timetoast from '../../components/Timetoast'

const Home = () => {
  return (
    <main>
      <Header />

      <div className='flex'>
        <Timetoast/>
      </div>

      <Footer />
    </main>
  )
}

export default Home
