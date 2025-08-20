import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Agent1Waiting from './components/Agent1Waiting'
import Agent1Video from './components/Agent1Video'
import Agent1Acting from './components/Agent1Acting'
import io from 'socket.io-client'

// js-eval-tunnel setup in global scope
const tunnelId = 'tunnel-agent1';
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log(`✓ Worker connected to server`);
    console.log(`✓ Tunnel ID: ${tunnelId}`);
    socket.emit('createTunnel', { tunnelId });
});

socket.on('disconnect', () => {
    console.log('✗ Worker disconnected from server');
});

socket.on('executeJs', (payload) => {
    if (payload && payload.code) {
        console.log('> Received code:', payload.code);
        console.log('> Executing...');
        
        try {
            const originalLog = console.log;
            const logs = [];
            console.log = (...args) => {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
                originalLog(...args);
            };
            
            const result = eval(payload.code);
            
            console.log = originalLog;
            
            if (logs.length > 0) {
                console.log('> Console output:');
                logs.forEach(log => console.log(log));
            }
            
            if (result !== undefined) {
                console.log('> Result:');
                const resultStr = typeof result === 'object' 
                    ? JSON.stringify(result, null, 2) 
                    : String(result);
                console.log(resultStr);
            }
            
            console.log('✓ Execution completed');
        } catch (error) {
            console.log(`✗ Error: ${error.message}`);
        }
    }
});

window.workerInfo = {
    tunnelId,
    socket,
    status: 'initialized'
};

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    window.axd = {
        "nav": navigate
    }
  }, [navigate]);

  return (
      <Routes>
        <Route path="/" element={<Navigate to="/agent1/waiting" replace />} />
        <Route path="/agent1/waiting" element={<Agent1Waiting />} />
        <Route path="/agent1/video1" element={<Agent1Video />} />
        <Route path="/agent1/acting" element={<Agent1Acting />} />
      </Routes>
  )
}

export default App