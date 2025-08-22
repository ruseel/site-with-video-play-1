import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import io from 'socket.io-client'

import Display5Before from './Display5Before'
import Display5Greeting from './Display5Greeting'
import Display5PainpointDiscovery from './Display5PainpointDiscovery'
import Display5Opening from './Display5Opening'
import Display5Demo from './Display5Demo'
import Display5SolutionExperience from './Display5SolutionExperience'
import Display5Closing from './Display5Closing'
import Display5After from './Display5After'

const tunnelId = 'Display5'
const socket = io('http://localhost:3000')

socket.on('connect', () => {
    console.log(`✓ Display5 connected to server`)
    console.log(`✓ Tunnel ID: ${tunnelId}`)
    socket.emit('createTunnel', { tunnelId })
})

socket.on('disconnect', () => {
    console.log('✗ Display5 disconnected from server')
})

socket.on('executeJs', (payload) => {
    if (payload && payload.code) {
        console.log('> Display5 received code:', payload.code)
        console.log('> Display5 executing...')
        
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
                console.log('> Display5 console output:')
                logs.forEach(log => console.log(log))
            }
            
            if (result !== undefined) {
                console.log('> Display5 result:')
                const resultStr = typeof result === 'object' 
                    ? JSON.stringify(result, null, 2) 
                    : String(result)
                console.log(resultStr)
            }
            
            console.log('✓ Display5 execution completed')
        } catch (error) {
            console.log(`✗ Display5 error: ${error.message}`)
        }
    }
})

window.display5Info = {
    tunnelId,
    socket,
    status: 'initialized'
}

const Display5 = () => {
    const navigate = useNavigate()
    
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