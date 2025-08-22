import { useRef } from 'react'

const Display2Opening = () => {
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
        <source src="/14067324_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default Display2Opening