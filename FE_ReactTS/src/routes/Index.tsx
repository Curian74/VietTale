import { Route, Routes } from 'react-router'
import Home from '../pages/public/Home'
import CreateHistoricalFigure from '@/pages/public/createHistoricalFigure'

const Index = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create-figure' element={<CreateHistoricalFigure/>}/>
    </Routes>
  )
}

export default Index
