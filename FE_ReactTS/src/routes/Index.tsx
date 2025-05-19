import { Route, Routes } from 'react-router'
import Home from '../pages/Public/Home'
import Test from '../pages/Public/Test'

const Index = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/test' element={<Test/>}/>
    </Routes>
  )
}

export default Index
