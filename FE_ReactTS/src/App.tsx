import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timetoast from './components/timetoast/timeline';
import './App.css'
import EventDetail from './pages/public/EventDetail';

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
