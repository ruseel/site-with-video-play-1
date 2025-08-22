import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useJsEvalTunnel } from '../../hooks/useJsEvalTunnel'

import Display1Before from './Display1Before'
import Display1Greeting from './Display1Greeting'
import Display1PainpointDiscovery from './Display1PainpointDiscovery'
import Display1Opening from './Display1Opening'
import Display1Demo from './Display1Demo'
import Display1SolutionExperience from './Display1SolutionExperience'
import Display1Closing from './Display1Closing'
import Display1After from './Display1After'

const Display1 = () => {
    const navigate = useNavigate()
    useJsEvalTunnel('Display1')
    
    useEffect(() => {
        window.axd = {
            nav: navigate
        }
    }, [navigate])

    return (
        <Routes>
            <Route path="before" element={<Display1Before />} />
            <Route path="greeting" element={<Display1Greeting />} />
            <Route path="painpoint_discovery" element={<Display1PainpointDiscovery />} />
            <Route path="opening" element={<Display1Opening />} />
            <Route path="demo" element={<Display1Demo />} />
            <Route path="solution_experience" element={<Display1SolutionExperience />} />
            <Route path="closing" element={<Display1Closing />} />
            <Route path="after" element={<Display1After />} />
            <Route path="*" element={<Navigate to="before" replace />} />
        </Routes>
    )
}

export default Display1