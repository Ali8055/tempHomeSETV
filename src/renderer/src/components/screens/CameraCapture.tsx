import React, { useRef } from 'react'
import Webcam from 'react-webcam'

const CameraCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null)
  console.log(window.window.context);
  
  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full" />
    </>
  )
}

export default CameraCapture
// import React, { useEffect, useRef } from 'react'
// import Webcam from 'react-webcam'
// import removeBackground from './removeBackground'
// const CameraCapture: React.FC = () => {
//   const webcamRef = useRef<Webcam>(null)

//   useEffect(() => {
//     // Function to process webcam feed and perform background removal
//     const processWebcamFeed = async () => {
//       const webcam = webcamRef.current?.video
//       const canvas = document.createElement('canvas')
//       const context = canvas.getContext('2d')

//       if (webcam && context) {
//         // Set canvas dimensions to match video dimensions
//         canvas.width = webcam.videoWidth
//         canvas.height = webcam.videoHeight

//         // Continuously process webcam feed
//         const captureFrame = async () => {
//           // Draw current video frame onto canvas
//           context.drawImage(webcam, 0, 0, canvas.width, canvas.height)

//           // Perform background removal (implement this function)
//           await removeBackground(webcam, canvas)

//           // Request next frame
//           requestAnimationFrame(captureFrame)
//         }

//         // Start capturing frames
//         captureFrame()
//       }
//     }

//     processWebcamFeed()

//     // Clean up function (optional)
//     return () => {
//       // Stop background removal process or any other cleanup tasks
//     }
//   }, [])

//   return (
//     <div>
//       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full" />
//     </div>
//   )
// }

// export default CameraCapture
