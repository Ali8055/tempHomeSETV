import { ChatIcon } from '../assets/icons/ChatIcon'
import { EnableMicIcon } from '../assets/icons/EnableMicIcon'
import { FilmReelIcon } from '../assets/icons/FilmReelIcon'
import { GalleryIcon } from '../assets/icons/GalleryIcon'
import { GroupIcon } from '../assets/icons/GroupIcon'
import { MonitorIcon } from '../assets/icons/MonitorIcon'
import { MovieCameraIcon } from '../assets/icons/MovieCameraIcon'
import { ProfileIcon } from '../assets/icons/ProfileIcon'
import { SettingsIcon } from '../assets/icons/SettingsIcon'
import { useRef } from 'react'
import { Button } from '../components/ui-components/Button'
import Dropdown from '../components/ui-components/DropDown'
import VideoComponent from './VideoComponent'
import BackgroundChanger from './TensorFlowVideo'
import GreenScreenRemover from './GreenScreenRemover'
import BackgroundColor from './BackgroundColor'
const MainPanel = () => {
  const customColorRef = useRef()

  return (
    <div className="relative h-screen w-screen">
      {/* <video className="h-full w-full z-1" src={videoBg} autoPlay loop muted /> */}
      <div className="h-full w-full z-1">
        {/* <CameraCapture /> */}
        {/* <VideoComponent /> */}
        {/* <video ref={videoRef} />
        <VideoComponent videoRef={videoRef} /> */}
        {/* <BackgroundChanger/> */}
        {/* <GreenScreenRemover/> */}
        <BackgroundColor ManualBackgroundColor={'#000000'  }/>
      </div>
      
      <div className="absolute top-0  p-8 h-full w-full z-10 border-10">
        <div className="relative h-full w-full">
          <div id="top" className="absolute top-0 w-full">
            <div className="flex  align-items-center w-full justify-between">
              <div id="left">
                <Dropdown />
                {/* <Button component={MovieCameraIcon} /> */}
              </div>
              <div id="middle" className="flex">
                <Button component={MovieCameraIcon} />
                <Button component={MonitorIcon} />
                <Button component={FilmReelIcon} />
                <Button component={ProfileIcon} />
                {/* <MovieCameraIcon /> */}
                {/* <a href="./Webcam">ONE</a> */}
                {/* <Link to="">open cam</Link> */}
              </div>
              <div id="right" className="">
                <Button component={GalleryIcon} />
                <Button component={EnableMicIcon} />
                <Button component={ChatIcon} />
                <Button component={GroupIcon} />
                <Button component={SettingsIcon} />
      <input onChange={(e)=>{console.log(e.target.value,"color VAll");}} type="color" id="bg-color" />

              </div>
            </div>
          </div>
          <div id="bottom" className="absolute bottom-0 w-full">
            <div className="flex  align-items-center w-full justify-between">
              <div id="left">
                <Button component={GroupIcon} />
              </div>
              <div id="middle">
                <Button component={GroupIcon} />
              </div>
              <div id="right">
                <Button component={GroupIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}
export default MainPanel
