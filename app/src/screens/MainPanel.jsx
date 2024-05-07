import { ChatIcon } from '../assets/icons/ChatIcon';
import { EnableMicIcon } from '../assets/icons/EnableMicIcon';
import { FilmReelIcon } from '../assets/icons/FilmReelIcon';
import { GalleryIcon } from '../assets/icons/GalleryIcon';
import { GroupIcon } from '../assets/icons/GroupIcon';
import { MonitorIcon } from '../assets/icons/MonitorIcon';
import { MovieCameraIcon } from '../assets/icons/MovieCameraIcon';
import { ProfileIcon } from '../assets/icons/ProfileIcon';
import { SettingsIcon } from '../assets/icons/SettingsIcon';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui-components/Button';
import Dropdown from '../components/ui-components/DropDown';
import VideoComponent from './VideoComponent';
import BackgroundChanger from './TensorFlowVideo';
import GreenScreenRemover from './GreenScreenRemover';
import BackgroundColor from './BackgroundColor';
import Webcam from 'react-webcam';
import AllCameras from './AllCameras';
import BackgroundImage from './BackgroundImage';
import ChangeImage from './ChangeImage';

const MainPanel = () => {
  const customColorRef = useRef();
  const webcamVideoRef = useRef(null);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  // const [listofCamsState, setListofCamsState] = useState(null);
  const videoRefs = useRef([]);
  const webcamVideoRefs = useRef([]);
  // const selectedCameraId = useRef();
  
  const listofCamsState = useRef([]);

  useEffect(() => {
    const fetchVideoDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === 'videoinput'
        );
        let listofCams = [];
        for (let index = 0; index < videoDevices.length; index++) {
          let deviceId = videoDevices[index].deviceId;
          console.log(deviceId, 'DDD');
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId },
          });
          listofCams.push(stream);
        }
        console.log(listofCams, 'array');
        listofCamsState.current = listofCams;

        console.log(videoDevices, 'videooo Dev');

        setVideoDevices(videoDevices);
      } catch (error) {
        console.error('Error enumerating video devices:', error);
      }
    };

    fetchVideoDevices();
  }, []);

  // const handleSelectDevice = (deviceId) => {
  //   setSelectedDeviceId(deviceId);
  // };
  const handleStream = async (deviceId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId },
      });
      console.log(stream, 'SSt');
      webcamVideoRef.current.srcObject = stream;
      return stream;
    } catch (error) {}
  };

  // useEffect(() => {
  //   if (selectedDeviceId) {
  //     console.log('Device Selected', selectedDeviceId);
  //     const initializeStreams = async () => {
  //       const stream = await handleStream(selectedDeviceId);

  //       // videoRefs.current = Array.from({ length: 4 }, () => ({ current: stream }));
  //       // // Set stream to video elements
  //       // videoRefs.current.forEach((ref, index) => {
  //       //        console.log(stream,"SSVV");
  //       //       ref.current.srcObject = stream;
  //       //       console.log(ref.current.srcObject.srcObject,"reff src Obj");
  //       //     });
  //     };

  //     initializeStreams();
  //   }
  // }, [selectedDeviceId]);

  return (
    <div className="relative h-screen w-screen">
      {/* <video className="h-full w-full z-1" src={videoBg} autoPlay loop muted /> */}
      {/* <div className="h-full w-full z-1"> */}
        {/* <BackgroundColor selectedDeviceId={selectedDeviceId}/>  */}
        <BackgroundColor selectedDeviceId={selectedDeviceId}/>
      {/* <ChangeImage /> */}
      
      {/* </div> */}
      {
        // <div className="absolute top-0  p-8 h-full w-full z-10 border-10">
        //   <div className="relative h-full w-full">
        //     <div id="top" className="absolute top-0 w-full">
        //       <div className="flex  align-items-center w-full justify-between">
        //         <div id="left">
        //           <Dropdown />
        //           {/* <Button component={MovieCameraIcon} /> */}
        //         </div>
        //         <div id="middle" className="flex">
        //           <Button component={MovieCameraIcon} />
        //           <Button component={MonitorIcon} />
        //           <Button component={FilmReelIcon} />
        //           <Button component={ProfileIcon} />
        //           {/* <MovieCameraIcon /> */}
        //           {/* <a href="./Webcam">ONE</a> */}
        //           {/* <Link to="">open cam</Link> */}
        //         </div>
        //         <div id="right" className="">
        //           <Button component={GalleryIcon} />
        //           <Button component={EnableMicIcon} />
        //           <Button component={ChatIcon} />
        //           <Button component={GroupIcon} />
        //           <Button component={SettingsIcon} />
        // <input onChange={(e)=>{console.log(e.target.value,"color VAll");}} type="color" id="bg-color" />
        //         </div>
        //       </div>
        //     </div>
        //     <div id="bottom" className="absolute bottom-0 w-full">
        //       <div className="flex  align-items-center w-full justify-between">
        //         <div id="left">
        //           <Button component={GroupIcon} />
        //         </div>
        //         <div id="middle">
        //           <Button component={GroupIcon} />
        //         </div>
        //         <div id="right">
        //           <Button component={GroupIcon} />
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      }

      <div className="relative h-screen w-screen">
        <div className="absolute top-0 p-8 h-full w-full z-10 border-10">
          {/* Dropdown to select camera */}
          {/* <select onChange={(e) => handleSelectDevice(e.target.value)}>
            <option value="">Select Camera</option>
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select> */}

          {/* Render video components based on selected camera */}
          <AllCameras setSelectedDeviceId={setSelectedDeviceId}/>
      
        </div>
      </div>
    </div>
  );
};
export default MainPanel;
