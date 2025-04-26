import { useState } from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-transparant'><p>Swing Vison</p>
        <script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose"></script>
        <video src="webcam"></video>
      </div>
    </>
  )
}

export default App
