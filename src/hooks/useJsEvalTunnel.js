import { useEffect } from 'react'
import io from 'socket.io-client'

// Single socket instance for the current display
let currentSocket = null
let currentTunnelId = null

export const useJsEvalTunnel = (tunnelId) => {
  useEffect(() => {
    // If switching to a different display, clean up the old socket
    if (currentSocket && currentTunnelId !== tunnelId) {
      console.log(`✓ Switching from ${currentTunnelId} to ${tunnelId}`)
      currentSocket.disconnect()
      currentSocket = null
      
      // Clean up old window object
      if (currentTunnelId) {
        const oldDisplayNumber = currentTunnelId.replace('Display', '')
        delete window[`display${oldDisplayNumber}Info`]
      }
    }
    
    // Create new socket if needed
    if (!currentSocket) {
      console.log(`✓ Creating socket for ${tunnelId}`)
      currentSocket = io('http://localhost:3000')
      currentTunnelId = tunnelId
      
      currentSocket.on('connect', () => {
        console.log(`✓ ${tunnelId} connected to server`)
        console.log(`✓ Tunnel ID: ${tunnelId}`)
        currentSocket.emit('createTunnel', { tunnelId })
      })
      
      currentSocket.on('disconnect', () => {
        console.log(`✗ ${tunnelId} disconnected from server`)
      })
      
      currentSocket.on('executeJs', (payload) => {
        if (payload && payload.code) {
          console.log(`> ${tunnelId} received code:`, payload.code)
          console.log(`> ${tunnelId} executing...`)
          
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
              console.log(`> ${tunnelId} console output:`)
              logs.forEach(log => console.log(log))
            }
            
            if (result !== undefined) {
              console.log(`> ${tunnelId} result:`)
              const resultStr = typeof result === 'object' 
                ? JSON.stringify(result, null, 2) 
                : String(result)
              console.log(resultStr)
            }
            
            console.log(`✓ ${tunnelId} execution completed`)
          } catch (error) {
            console.log(`✗ ${tunnelId} error: ${error.message}`)
          }
        }
      })
    }
    
    return () => {
      // We don't disconnect here because the socket should persist
      // across phase changes within the same display
    }
  }, [tunnelId])
  
  // Return the current socket instance
  return currentSocket
}