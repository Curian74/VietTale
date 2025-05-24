import { Route, Routes } from 'react-router'
import Home from '../pages/Public/Home'

const Index = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default Index
