import AboutUs from '@/pages/public/aboutUs'
import Login from '@/pages/public/auth/login'
import Profile from '@/pages/public/auth/profile'
import EventDetail from '@/pages/public/EventDetail'
import Home from '@/pages/public/Home'
import { Route, Routes } from 'react-router'
import PrivateRoute from './privateRoute'
import Register from '@/pages/public/auth/register'
import Test from '@/pages/public/test'
import Latest from '@/pages/private/latest'

const Index = () => {
    //
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/test" element={<Test />} />

            <Route path='/auth'>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route element={<PrivateRoute />}>
                    <Route path="profile" element={<Profile />} />
                </Route>
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="learning">
                    <Route path='latest' element={<Latest />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default Index

