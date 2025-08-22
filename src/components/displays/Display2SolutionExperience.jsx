import { useRef } from 'react'

const Display2SolutionExperience = () => {
  const videoRef = useRef(null)

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
      >
        <source src="/CgCVZdcKcqY.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Display2SolutionExperience