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
      name: "이전", 
      key: "before",
      icon: <ArrowRight className="w-6 h-6" />,
      disabled: true,
      displays: [],
      bgColor: "bg-gray-300",
      textColor: "text-gray-500",
      iconColor: "text-gray-400"
    },
    { 
      name: "인사", 
      key: "greeting",
      icon: <ArrowRight className="w-6 h-6" />,
      disabled: true,
      displays: [],
      bgColor: "bg-gray-300",
      textColor: "text-gray-500",
      iconColor: "text-gray-400"
    },
    { 
      name: "PainPoint체험", 
      key: "painpoint_discovery",
      icon: <ArrowRight className="w-6 h-6" />,
      disabled: true,
      displays: [],
      bgColor: "bg-gray-300",
      textColor: "text-gray-500",
      iconColor: "text-gray-400"
    },
    { 
      name: "오프닝영상", 
      key: "opening",
      icon: <Monitor className="w-6 h-6" />,
      disabled: false,
      displays: [2, 3],
      bgColor: "bg-red-500 hover:bg-red-600",
      textColor: "text-white",
      iconColor: "text-white"
    },
    { 
      name: "시연", 
      key: "demo",
      icon: <Monitor className="w-6 h-6" />,
      disabled: false,
      displays: [2, 3],
      bgColor: "bg-red-500 hover:bg-red-600",
      textColor: "text-white",
      iconColor: "text-white"
    },
    { 
      name: "솔루션체험", 
      key: "solution_experience",
      icon: <Monitor className="w-6 h-6" />,
      disabled: false,
      displays: [2, 3, 4, 5],
      bgColor: "bg-red-500 hover:bg-red-600",
      textColor: "text-white",
      iconColor: "text-white"
    },
    { 
      name: "클로징", 
      key: "closing",
      icon: <Monitor className="w-6 h-6" />,
      disabled: false,
      displays: [2, 3, 4, 5],
      bgColor: "bg-red-500 hover:bg-red-600",
      textColor: "text-white",
      iconColor: "text-white"
    },
    { 
      name: "이후", 
      key: "after",
      icon: <ArrowRight className="w-6 h-6" />,
      disabled: false,
      displays: [2, 3],
      bgColor: "bg-red-500 hover:bg-red-600",
      textColor: "text-white",
      iconColor: "text-white"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-light text-slate-800 mb-3 tracking-tight">도슨트 컨트롤</h1>
          <div className="flex items-center gap-4 text-slate-600">
            <p className="text-lg font-light">디스플레이 화면 전환 제어</p>
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-emerald-700">연결됨</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm font-medium text-red-700">연결 끊김</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/40 p-10 shadow-xl shadow-slate-200/30">
              <h2 className="text-xl font-semibold text-red-600 mb-8 tracking-tight">단계 전환</h2>
              <div className="grid grid-cols-3 gap-7">
                {phases.map((phase) => (
                  <button
                    key={phase.key}
                    onClick={() => handlePhaseTransition(`'${phase.name}'단계로 전환`, phase.key, phase.displays)}
                    disabled={phase.disabled}
                    className={`
                      group relative h-36 rounded-3xl transition-all duration-200 transform shadow-lg
                      ${phase.disabled 
                        ? `${phase.bgColor} cursor-not-allowed opacity-70` 
                        : `${phase.bgColor} cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]`
                      }
                    `}
                  >
                    <div className="flex flex-col items-center justify-center h-full space-y-3 px-4">
                      <div className={`p-3 rounded-2xl ${phase.disabled ? 'bg-white/50' : 'bg-white/20'} transition-all duration-200`}>
                        <div className={phase.iconColor}>
                          {phase.icon}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`font-semibold text-lg leading-tight ${phase.textColor}`}>
                          {phase.name}
                        </div>
                        <div className={`text-sm mt-1.5 font-medium ${phase.disabled ? 'text-gray-400' : 'text-white/90'}`}>
                          단계로 전환
                        </div>
                      </div>
                      {phase.displays.length > 0 && (
                        <div className="flex gap-1 flex-wrap justify-center">
                          {phase.displays.map(d => (
                            <span key={d} className="px-2 py-1 text-xs bg-white/20 text-white rounded-xl font-medium">
                              D{d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/40 shadow-xl shadow-slate-200/30 h-[520px] flex flex-col">
              <div className="p-6 border-b border-slate-200/50">
                <h3 className="flex items-center gap-2 text-lg font-medium text-slate-700">
                  <Clock className="w-5 h-5 text-slate-500" />
                  액션 로그
                </h3>
                <p className="text-sm text-slate-500 mt-1">최근 50개의 작업 기록</p>
              </div>
              <div className="flex-1 overflow-hidden p-6">
                <ScrollArea className="h-full pr-2">
                  {actionLog.length === 0 ? (
                    <div className="text-center text-slate-400 py-12 text-sm">
                      아직 작업 기록이 없습니다
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {actionLog.map((log) => (
                        <div key={log.id} className="p-3 bg-slate-50/80 rounded-lg text-sm border border-slate-200/30">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-slate-700 text-xs">{log.phase}</span>
                            <span className="text-xs text-slate-400">{log.timestamp}</span>
                          </div>
                          <div className="text-slate-600 text-xs leading-relaxed">{log.action}</div>
                          {log.displays.length > 0 && (
                            <div className="mt-2 flex gap-1 flex-wrap">
                              {log.displays.map(d => (
                                <span key={d} className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded border">
                                  D{d}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocentDashboard