import AboutUs from '@/pages/public/aboutUs'
import Login from '@/pages/public/auth/login'
import Profile from '@/pages/public/auth/profile'
import EventDetail from '@/pages/public/EventDetail'
import Home from '@/pages/public/Home'
import { Route, Routes } from 'react-router'
import PrivateRoute from './privateRoute'
import Register from '@/pages/public/auth/register'
import Test from '@/pages/public/test'
import Latest from '@/pages/public/learning/latest'
import LessonDetail from '@/pages/public/learning/lessonDetail'
import Flashcard from '@/pages/public/learning/flashcard'
import Library from '@/pages/public/learning/library'
import Quiz from '@/pages/public/learning/quiz'

const Index = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/test/:id" element={<Test />} />

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
                    <Route path="lesson/:id" element={<LessonDetail />} />
                    <Route path="flashcard/:attemptId/:lessonId" element={<Flashcard />} />
                    <Route path="library" element={<Library />} />
                    <Route path="quiz/:id/:mode" element={<Quiz />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default Index

