import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowRight, Monitor, Clock } from 'lucide-react'
import io from 'socket.io-client'

const DocentDashboard = () => {
  const [actionLog, setActionLog] = useState([])
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance = io('http://localhost:3000')
    
    socketInstance.on('connect', () => {
      setIsConnected(true)
      addToLog('시스템', 'js-eval-tunnel 서버에 연결되었습니다')
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
      addToLog('시스템', 'js-eval-tunnel 서버와 연결이 끊어졌습니다')
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const addToLog = (phase, action, displays = []) => {
    const timestamp = new Date().toLocaleTimeString('ko-KR')
    const newEntry = {
      id: Date.now(),
      timestamp,
      phase,
      action,
      displays
    }
    setActionLog(prev => [newEntry, ...prev].slice(0, 50))
  }

  const sendJsToTunnel = (tunnelId, code) => {
    if (socket && isConnected) {
      socket.emit('sendJsToTunnel', {
        tunnelId: tunnelId,
        code: code
      })
    }
  }

  const handlePhaseTransition = (phaseName, phaseKey, targetDisplays) => {
    if (targetDisplays.length === 0) {
      addToLog(phaseName, '비활성 버튼입니다')
      return
    }

    const displayNames = targetDisplays.map(d => `Display${d}`)
    addToLog(phaseName, `${displayNames.join(', ')}로 전환 명령 전송`, targetDisplays)

    targetDisplays.forEach(displayNum => {
      const tunnelId = `display${displayNum}`
      const code = `axd.nav("/display${displayNum}/${phaseKey}")`
      sendJsToTunnel(tunnelId, code)
    })
  }

  const phases = [
    { 
      name: "'이전'단계로 전환", 
      key: "before",
      icon: <ArrowRight className="w-5 h-5" />,
      disabled: true,
      displays: [],
      color: "bg-gray-100"
    },
    { 
      name: "'인사'단계로 전환", 
      key: "greeting",
      icon: <ArrowRight className="w-5 h-5" />,
      disabled: true,
      displays: [],
      color: "bg-gray-100"
    },
    { 
      name: "'PainPoint체험'단계로 전환", 
      key: "painpoint_discovery",
      icon: <ArrowRight className="w-5 h-5" />,
      disabled: true,
      displays: [],
      color: "bg-gray-100"
    },
    { 
      name: "'오프닝영상'단계로 전환", 
      key: "opening",
      icon: <Monitor className="w-5 h-5" />,
      disabled: false,
      displays: [2, 3],
      color: "bg-blue-50 hover:bg-blue-100"
    },
    { 
      name: "'시연'단계로 전환", 
      key: "demo",
      icon: <Monitor className="w-5 h-5" />,
      disabled: false,
      displays: [2, 3],
      color: "bg-green-50 hover:bg-green-100"
    },
    { 
      name: "'솔루션체험'단계로 전환", 
      key: "solution_experience",
      icon: <Monitor className="w-5 h-5" />,
      disabled: false,
      displays: [2, 3, 4, 5],
      color: "bg-purple-50 hover:bg-purple-100"
    },
    { 
      name: "'클로징'단계로 전환", 
      key: "closing",
      icon: <Monitor className="w-5 h-5" />,
      disabled: false,
      displays: [2, 3, 4, 5],
      color: "bg-orange-50 hover:bg-orange-100"
    },
    { 
      name: "'이후'단계로 전환", 
      key: "after",
      icon: <ArrowRight className="w-5 h-5" />,
      disabled: false,
      displays: [2, 3],
      color: "bg-indigo-50 hover:bg-indigo-100"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">도슨트 컨트롤 대시보드</h1>
          <p className="text-gray-600">
            디스플레이 화면 전환을 제어합니다
            {isConnected ? (
              <span className="ml-4 text-green-600 font-medium">● 연결됨</span>
            ) : (
              <span className="ml-4 text-red-600 font-medium">● 연결 끊김</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>단계 전환 컨트롤</CardTitle>
                <CardDescription>버튼을 클릭하여 해당 단계로 전환합니다</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {phases.map((phase) => (
                    <button
                      key={phase.key}
                      onClick={() => handlePhaseTransition(phase.name, phase.key, phase.displays)}
                      disabled={phase.disabled}
                      className={`
                        relative p-6 rounded-lg border-2 transition-all
                        ${phase.disabled 
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50' 
                          : `border-gray-300 ${phase.color} cursor-pointer hover:border-gray-400 active:scale-95`
                        }
                      `}
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <div className={`p-3 rounded-full ${phase.disabled ? 'bg-gray-200' : 'bg-white'}`}>
                          {phase.icon}
                        </div>
                        <span className="font-medium text-gray-900">{phase.name}</span>
                        {phase.displays.length > 0 && (
                          <div className="flex gap-1 flex-wrap justify-center">
                            {phase.displays.map(d => (
                              <span key={d} className="px-2 py-1 text-xs bg-white rounded-full border">
                                D{d}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  액션 로그
                </CardTitle>
                <CardDescription>최근 50개의 작업 기록</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-4">
                  {actionLog.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      아직 작업 기록이 없습니다
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {actionLog.map((log) => (
                        <div key={log.id} className="p-3 bg-gray-50 rounded-lg text-sm">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-gray-700">{log.phase}</span>
                            <span className="text-xs text-gray-500">{log.timestamp}</span>
                          </div>
                          <div className="text-gray-600">{log.action}</div>
                          {log.displays.length > 0 && (
                            <div className="mt-1 flex gap-1">
                              {log.displays.map(d => (
                                <span key={d} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded">
                                  Display{d}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocentDashboard