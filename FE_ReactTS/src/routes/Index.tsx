import {Route, Routes} from 'react-router'
import Home from '@/pages/Public/Home';
import EventDetail from '@/pages/Public/EventDetail';

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/event/:id" element={<EventDetail/>}/>
        </Routes>
    )
}

export default Index

