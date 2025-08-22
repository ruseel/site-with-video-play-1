const Display1Closing = () => {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
        Display 1
      </h1>
      <h2 style={{ fontSize: '2rem', color: '#666' }}>
        Closing
      </h2>
      <p style={{ fontSize: '1rem', color: '#999', marginTop: '2rem' }}>
        /display1/closing</p>
    </div>
  )
}

export default Display1Closing