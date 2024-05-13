import { Route, Routes } from 'react-router-dom'

// Import your components
// import LoginScreen from '@renderer/components/screens/LoginScreen'
import LoginScreen from '../pages/LoginScreen'
import MainPanel from '../pages/MainPanel'
import Layout from '../components/Layout'
// import WebcamCapture from '@renderer/components/screens/MultiWebcam'
// Define your routes
const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Layout/>}></Route> */}
      <Route path="/" element={<LoginScreen />} ></Route>
      <Route path="MainPanel" element={<MainPanel />} />
      {/* <Route path="Webcam" element={<WebcamCapture />} /> */}
    </Routes>
  )
}

export default AppRoutes
