import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import io from 'socket.io-client'

import Display1Before from './Display1Before'
import Display1Greeting from './Display1Greeting'
import Display1PainpointDiscovery from './Display1PainpointDiscovery'
import Display1Opening from './Display1Opening'
import Display1Demo from './Display1Demo'
import Display1SolutionExperience from './Display1SolutionExperience'
import Display1Closing from './Display1Closing'
import Display1After from './Display1After'

const tunnelId = 'Display1'
const socket = io('http://localhost:3000')

socket.on('connect', () => {
    console.log(`✓ Display1 connected to server`)
    console.log(`✓ Tunnel ID: ${tunnelId}`)
    socket.emit('createTunnel', { tunnelId })
})

socket.on('disconnect', () => {
    console.log('✗ Display1 disconnected from server')
})

socket.on('executeJs', (payload) => {
    if (payload && payload.code) {
        console.log('> Display1 received code:', payload.code)
        console.log('> Display1 executing...')
        
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
                console.log('> Display1 console output:')
                logs.forEach(log => console.log(log))
            }
            
            if (result !== undefined) {
                console.log('> Display1 result:')
                const resultStr = typeof result === 'object' 
                    ? JSON.stringify(result, null, 2) 
                    : String(result)
                console.log(resultStr)
            }
            
            console.log('✓ Display1 execution completed')
        } catch (error) {
            console.log(`✗ Display1 error: ${error.message}`)
        }
    }
})

window.display1Info = {
    tunnelId,
    socket,
    status: 'initialized'
}

const Display1 = () => {
    const navigate = useNavigate()
    
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