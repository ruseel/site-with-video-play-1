import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Agent1Video = () => {
  const videoRef = useRef(null)
  const navigate = useNavigate()

  const handleVideoEnd = () => {
    navigate('/agent1/acting')
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        controls
        autoPlay
        onEnded={handleVideoEnd}
      >
        <source src="/CgCVZdcKcqY.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Agent1Video