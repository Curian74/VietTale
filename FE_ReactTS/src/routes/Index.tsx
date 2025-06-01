import {Route, Routes} from 'react-router'
import Home from '@/pages/Public/Home';
import EventDetail from '@/pages/Public/EventDetail';
import AboutUs from '@/pages/Public/AboutUs';

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/event/:id" element={<EventDetail/>}/>
            <Route path="/about-us" element={<AboutUs/>}/>
        </Routes>
    )
}

export default Index

