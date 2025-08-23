import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowRight, Monitor, Clock, Play, Users, Settings, Zap, Target, MessageSquare, Video, CheckCircle } from 'lucide-react'
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
      icon: <Settings className="w-7 h-7" />,
      disabled: true,
      displays: [],
      bgColor: "bg-gradient-to-br from-gray-200 to-gray-300",
      textColor: "text-gray-500",
      iconColor: "text-gray-400",
      borderColor: "border-gray-300",
      description: "준비 단계"
    },
    { 
      name: "인사", 
      key: "greeting",
      icon: <Users className="w-7 h-7" />,
      disabled: true,
      displays: [],
      bgColor: "bg-gradient-to-br from-gray-200 to-gray-300",
      textColor: "text-gray-500",
      iconColor: "text-gray-400",
      borderColor: "border-gray-300",
      description: "환영 인사"
    },
    { 
      name: "PainPoint체험", 
      key: "painpoint_discovery",
      icon: <Target className="w-7 h-7" />,
      disabled: true,
      displays: [],
      bgColor: "bg-gradient-to-br from-gray-200 to-gray-300",
      textColor: "text-gray-500",
      iconColor: "text-gray-400",
      borderColor: "border-gray-300",
      description: "문제점 파악"
    },
    { 
      name: "오프닝영상", 
      key: "opening",
      icon: <Video className="w-7 h-7" />,
      disabled: false,
      displays: [2, 3],
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      textColor: "text-white",
      iconColor: "text-white",
      borderColor: "border-blue-400",
      description: "영상 시작",
      glowColor: "shadow-blue-500/25"
    },
    { 
      name: "시연", 
      key: "demo",
      icon: <Play className="w-7 h-7" />,
      disabled: false,
      displays: [2, 3],
      bgColor: "bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      textColor: "text-white",
      iconColor: "text-white",
      borderColor: "border-purple-400",
      description: "실시간 시연",
      glowColor: "shadow-purple-500/25"
    },
    { 
      name: "솔루션체험", 
      key: "solution_experience",
      icon: <Zap className="w-7 h-7" />,
      disabled: false,
      displays: [2, 3, 4, 5],
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      textColor: "text-white",
      iconColor: "text-white",
      borderColor: "border-orange-400",
      description: "직접 체험",
      glowColor: "shadow-orange-500/25"
    },
    { 
      name: "클로징", 
      key: "closing",
      icon: <MessageSquare className="w-7 h-7" />,
      disabled: false,
      displays: [2, 3, 4, 5],
      bgColor: "bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      textColor: "text-white",
      iconColor: "text-white",
      borderColor: "border-green-400",
      description: "마무리 설명",
      glowColor: "shadow-green-500/25"
    },
    { 
      name: "이후", 
      key: "after",
      icon: <CheckCircle className="w-7 h-7" />,
      disabled: false,
      displays: [2, 3],
      bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
      textColor: "text-white",
      iconColor: "text-white",
      borderColor: "border-emerald-400",
      description: "완료 단계",
      glowColor: "shadow-emerald-500/25"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4 pt-8">
      <div className="w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-left">
              <h1 className="text-4xl font-thin bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-2 tracking-tight">
                도슨트 컨트롤 센터
              </h1>
              <p className="text-lg text-slate-600 font-medium">프레젠테이션 단계 제어 시스템</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-200/50 shadow-lg flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">연결 상태</span>
              </div>
              <div className="w-px h-6 bg-slate-300"></div>
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <>
                    <div className="relative">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                    </div>
                    <span className="text-sm font-semibold text-emerald-700">연결됨</span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-sm font-semibold text-red-700">연결 끊김</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">단계로 전환</h2>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {phases.map((phase) => (
                  <button
                    key={phase.key}
                    onClick={() => handlePhaseTransition(`'${phase.name}'단계로 전환`, phase.key, phase.displays)}
                    disabled={phase.disabled}
                    className={`
                      group relative h-32 rounded-xl transition-all duration-300 transform border-2
                      ${phase.disabled 
                        ? `${phase.bgColor} ${phase.borderColor} cursor-not-allowed opacity-60` 
                        : `${phase.bgColor} ${phase.borderColor} cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${phase.glowColor || ''}`
                      }
                    `}
                  >
                    <div className="flex flex-col items-center justify-center h-full space-y-2 px-2">
                      <div className={`p-2 rounded-lg transition-all duration-300 ${phase.disabled ? 'bg-white/60' : 'bg-white/25 group-hover:bg-white/35'}`}>
                        <div className={`${phase.iconColor} transition-colors duration-200`}>
                          {React.cloneElement(phase.icon, { className: "w-5 h-5" })}
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <div className={`font-bold text-sm leading-tight ${phase.textColor}`}>
                          {phase.name}
                        </div>
                        <div className={`text-xs font-light opacity-80 ${phase.disabled ? 'text-gray-400' : 'text-white'}`}>
                          단계로 전환
                        </div>
                      </div>
                      {phase.displays.length > 0 && (
                        <div className="flex gap-0.5 flex-wrap justify-center">
                          {phase.displays.map(d => (
                            <span key={d} className="px-1 py-0.5 text-[10px] bg-white/30 backdrop-blur text-white rounded font-medium border border-white/20">
                              D{d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {!phase.disabled && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="h-[500px] flex flex-col">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">활동 로그</h3>
                </div>
                <p className="text-sm text-slate-600 font-medium">실시간 작업 기록 모니터링</p>
              </div>
              <div className="flex-1 overflow-hidden p-4">
                <ScrollArea className="h-full pr-2">
                  {actionLog.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="p-3 bg-slate-100 rounded-xl inline-block mb-3">
                        <Clock className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="text-slate-500 font-medium text-sm">작업 기록이 없습니다</p>
                      <p className="text-slate-400 text-xs mt-1">버튼을 눌러 작업을 시작하세요</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {actionLog.map((log, index) => (
                        <div key={log.id} className={`p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                          index === 0 
                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200' 
                            : 'bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200'
                        }`}>
                          <div className="flex justify-between items-start mb-2">
                            <span className={`font-bold text-xs px-2 py-1 rounded ${
                              index === 0 
                                ? 'bg-blue-200 text-blue-800' 
                                : 'bg-slate-200 text-slate-700'
                            }`}>
                              {log.phase}
                            </span>
                            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                              {log.timestamp}
                            </span>
                          </div>
                          <div className="text-slate-700 text-xs leading-relaxed font-medium mb-2">
                            {log.action}
                          </div>
                          {log.displays.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap">
                              {log.displays.map(d => (
                                <span key={d} className="px-2 py-0.5 text-xs bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded font-bold border border-emerald-200">
                                  Display {d}
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