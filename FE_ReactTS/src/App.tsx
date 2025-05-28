import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventDetail from './pages/Public/EventDetail';
import Timetoast from './components/Timetoast';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timetoast onLoadComplete={() => {}} />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </Router>
  )
}

export default App
