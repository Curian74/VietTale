import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Timetoast from '../../components/Timetoast'
import SearchBar from '@/components/layouts/home/searchBar'

const Home = () => {
  return (
    <main>
      <Header />

      <div className="container mx-auto flex gap-10">
        <SearchBar />
        <Timetoast />
      </div>

      <Footer />
    </main>
  )
}

export default Home
