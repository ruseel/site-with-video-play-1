import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// Display parent components
import Display1 from './components/displays/Display1'
import Display2 from './components/displays/Display2'
import Display3 from './components/displays/Display3'
import Display4 from './components/displays/Display4'
import Display5 from './components/displays/Display5'

function App() {
  const navigate = useNavigate()
  
  useEffect(() => {
    window.axd = {
      nav: navigate
    }
  }, [navigate])
  
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/display1/before" replace />} />
        
        {/* Display routes with nested routing */}
        <Route path="/display1/*" element={<Display1 />} />
        <Route path="/display2/*" element={<Display2 />} />
        <Route path="/display3/*" element={<Display3 />} />
        <Route path="/display4/*" element={<Display4 />} />
        <Route path="/display5/*" element={<Display5 />} />
      </Routes>
  )
}

export default App