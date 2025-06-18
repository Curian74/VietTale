import AboutUs from '@/pages/public/aboutUs'
import EventDetail from '@/pages/public/EventDetail'
import Home from '@/pages/public/Home'
import {Route, Routes} from 'react-router'


const Index = () => {
    //
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/event/:id" element={<EventDetail/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
        </Routes>
    )
}

export default Index

