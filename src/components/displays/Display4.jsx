import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import io from 'socket.io-client'

import Display4Before from './Display4Before'
import Display4Greeting from './Display4Greeting'
import Display4PainpointDiscovery from './Display4PainpointDiscovery'
import Display4Opening from './Display4Opening'
import Display4Demo from './Display4Demo'
import Display4SolutionExperience from './Display4SolutionExperience'
import Display4Closing from './Display4Closing'
import Display4After from './Display4After'

const tunnelId = 'Display4'
const socket = io('http://localhost:3000')

socket.on('connect', () => {
    console.log(`✓ Display4 connected to server`)
    console.log(`✓ Tunnel ID: ${tunnelId}`)
    socket.emit('createTunnel', { tunnelId })
})

socket.on('disconnect', () => {
    console.log('✗ Display4 disconnected from server')
})

socket.on('executeJs', (payload) => {
    if (payload && payload.code) {
        console.log('> Display4 received code:', payload.code)
        console.log('> Display4 executing...')
        
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
                console.log('> Display4 console output:')
                logs.forEach(log => console.log(log))
            }
            
            if (result !== undefined) {
                console.log('> Display4 result:')
                const resultStr = typeof result === 'object' 
                    ? JSON.stringify(result, null, 2) 
                    : String(result)
                console.log(resultStr)
            }
            
            console.log('✓ Display4 execution completed')
        } catch (error) {
            console.log(`✗ Display4 error: ${error.message}`)
        }
    }
})

window.display4Info = {
    tunnelId,
    socket,
    status: 'initialized'
}

const Display4 = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        window.axd = {
            nav: navigate
        }
    }, [navigate])

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