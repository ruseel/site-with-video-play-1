import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Agent1Waiting from './components/Agent1Waiting'
import Agent1Video from './components/Agent1Video'
import Agent1Acting from './components/Agent1Acting'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/agent1/waiting" replace />} />
        <Route path="/agent1/waiting" element={<Agent1Waiting />} />
        <Route path="/agent1/video1" element={<Agent1Video />} />
        <Route path="/agent1/acting" element={<Agent1Acting />} />
      </Routes>
    </Router>
  )
}

export default App