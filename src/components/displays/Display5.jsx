import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useJsEvalTunnel } from '../../hooks/useJsEvalTunnel'

import Display5Before from './Display5Before'
import Display5Greeting from './Display5Greeting'
import Display5PainpointDiscovery from './Display5PainpointDiscovery'
import Display5Opening from './Display5Opening'
import Display5Demo from './Display5Demo'
import Display5SolutionExperience from './Display5SolutionExperience'
import Display5Closing from './Display5Closing'
import Display5After from './Display5After'

const Display5 = () => {
    const navigate = useNavigate()
    useJsEvalTunnel('display5')
    
    useEffect(() => {
        window.axd = {
            nav: navigate
        }
    }, [navigate])

    return (
        <Routes>
            <Route path="before" element={<Display5Before />} />
            <Route path="greeting" element={<Display5Greeting />} />
            <Route path="painpoint_discovery" element={<Display5PainpointDiscovery />} />
            <Route path="opening" element={<Display5Opening />} />
            <Route path="demo" element={<Display5Demo />} />
            <Route path="solution_experience" element={<Display5SolutionExperience />} />
            <Route path="closing" element={<Display5Closing />} />
            <Route path="after" element={<Display5After />} />
            <Route path="*" element={<Navigate to="before" replace />} />
        </Routes>
    )
}

export default Display5