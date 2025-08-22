import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useJsEvalTunnel } from '../../hooks/useJsEvalTunnel'

import Display2Before from './Display2Before'
import Display2Greeting from './Display2Greeting'
import Display2PainpointDiscovery from './Display2PainpointDiscovery'
import Display2Opening from './Display2Opening'
import Display2Demo from './Display2Demo'
import Display2SolutionExperience from './Display2SolutionExperience'
import Display2Closing from './Display2Closing'
import Display2After from './Display2After'

const Display2 = () => {
    const navigate = useNavigate()
    useJsEvalTunnel('Display2')
    
    useEffect(() => {
        window.axd = {
            nav: navigate
        }
    }, [navigate])

    return (
        <Routes>
            <Route path="before" element={<Display2Before />} />
            <Route path="greeting" element={<Display2Greeting />} />
            <Route path="painpoint_discovery" element={<Display2PainpointDiscovery />} />
            <Route path="opening" element={<Display2Opening />} />
            <Route path="demo" element={<Display2Demo />} />
            <Route path="solution_experience" element={<Display2SolutionExperience />} />
            <Route path="closing" element={<Display2Closing />} />
            <Route path="after" element={<Display2After />} />
            <Route path="*" element={<Navigate to="before" replace />} />
        </Routes>
    )
}

export default Display2