import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useJsEvalTunnel } from '../../hooks/useJsEvalTunnel'

import Display3Before from './Display3Before'
import Display3Greeting from './Display3Greeting'
import Display3PainpointDiscovery from './Display3PainpointDiscovery'
import Display3Opening from './Display3Opening'
import Display3Demo from './Display3Demo'
import Display3SolutionExperience from './Display3SolutionExperience'
import Display3Closing from './Display3Closing'
import Display3After from './Display3After'

const Display3 = () => {
    const navigate = useNavigate()
    useJsEvalTunnel('Display3')
    
    useEffect(() => {
        window.axd = {
            nav: navigate
        }
    }, [navigate])

    return (
        <Routes>
            <Route path="before" element={<Display3Before />} />
            <Route path="greeting" element={<Display3Greeting />} />
            <Route path="painpoint_discovery" element={<Display3PainpointDiscovery />} />
            <Route path="opening" element={<Display3Opening />} />
            <Route path="demo" element={<Display3Demo />} />
            <Route path="solution_experience" element={<Display3SolutionExperience />} />
            <Route path="closing" element={<Display3Closing />} />
            <Route path="after" element={<Display3After />} />
            <Route path="*" element={<Navigate to="before" replace />} />
        </Routes>
    )
}

export default Display3