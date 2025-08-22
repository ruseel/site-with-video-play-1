import { Routes, Route, Navigate } from 'react-router-dom'
import { useJsEvalTunnel } from '../../hooks/useJsEvalTunnel'

import Display4Before from './Display4Before'
import Display4Greeting from './Display4Greeting'
import Display4PainpointDiscovery from './Display4PainpointDiscovery'
import Display4Opening from './Display4Opening'
import Display4Demo from './Display4Demo'
import Display4SolutionExperience from './Display4SolutionExperience'
import Display4Closing from './Display4Closing'
import Display4After from './Display4After'

const Display4 = () => {
    useJsEvalTunnel('display4')

    return (
        <Routes>
            <Route path="before" element={<Display4Before />} />
            <Route path="greeting" element={<Display4Greeting />} />
            <Route path="painpoint_discovery" element={<Display4PainpointDiscovery />} />
            <Route path="opening" element={<Display4Opening />} />
            <Route path="demo" element={<Display4Demo />} />
            <Route path="solution_experience" element={<Display4SolutionExperience />} />
            <Route path="closing" element={<Display4Closing />} />
            <Route path="after" element={<Display4After />} />
            <Route path="*" element={<Navigate to="before" replace />} />
        </Routes>
    )
}

export default Display4