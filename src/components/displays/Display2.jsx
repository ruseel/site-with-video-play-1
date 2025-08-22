import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import io from 'socket.io-client'

import Display2Before from './Display2Before'
import Display2Greeting from './Display2Greeting'
import Display2PainpointDiscovery from './Display2PainpointDiscovery'
import Display2Opening from './Display2Opening'
import Display2Demo from './Display2Demo'
import Display2SolutionExperience from './Display2SolutionExperience'
import Display2Closing from './Display2Closing'
import Display2After from './Display2After'

const tunnelId = 'Display2'
const socket = io('http://localhost:3000')

socket.on('connect', () => {
    console.log(`✓ Display2 connected to server`)
    console.log(`✓ Tunnel ID: ${tunnelId}`)
    socket.emit('createTunnel', { tunnelId })
})

socket.on('disconnect', () => {
    console.log('✗ Display2 disconnected from server')
})

socket.on('executeJs', (payload) => {
    if (payload && payload.code) {
        console.log('> Display2 received code:', payload.code)
        console.log('> Display2 executing...')
        
        try {
            const originalLog = console.log
            const logs = []
            console.log = (...args) => {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '))
                originalLog(...args)
            }
            
            const result = eval(payload.code)
            
            console.log = originalLog
            
            if (logs.length > 0) {
                console.log('> Display2 console output:')
                logs.forEach(log => console.log(log))
            }
            
            if (result !== undefined) {
                console.log('> Display2 result:')
                const resultStr = typeof result === 'object' 
                    ? JSON.stringify(result, null, 2) 
                    : String(result)
                console.log(resultStr)
            }
            
            console.log('✓ Display2 execution completed')
        } catch (error) {
            console.log(`✗ Display2 error: ${error.message}`)
        }
    }
})

window.display2Info = {
    tunnelId,
    socket,
    status: 'initialized'
}

const Display2 = () => {
    const navigate = useNavigate()
    
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