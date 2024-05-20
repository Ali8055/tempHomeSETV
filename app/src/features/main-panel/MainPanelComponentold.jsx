import React, { useEffect, useRef, useState } from 'react';
import AllCameras from './components/AllCameras';
import BackgroundColor from '../../pages/BackgroundColor';
import Dropdown from '../../components/ui-components/DropDown';
import { Button } from '../../components/ui-components/Button';
import { MovieCameraIcon } from '../../assets/icons/MovieCameraIcon';
import { MonitorIcon } from '../../assets/icons/MonitorIcon';
import { FilmReelIcon } from '../../assets/icons/FilmReelIcon';
import { ProfileIcon } from '../../assets/icons/ProfileIcon';
import { GalleryIcon } from '../../assets/icons/GalleryIcon';
import { EnableMicIcon } from '../../assets/icons/EnableMicIcon';
import { ChatIcon } from '../../assets/icons/ChatIcon';
import { GroupIcon } from '../../assets/icons/GroupIcon';
import { SettingsIcon } from '../../assets/icons/SettingsIcon';
import EnhancedBackgroundColor from '../../pages/EnhancedBackgroundColor';

const MainPanelComponent = () => {
  const [isFolded, setIsFolded] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const webcamVideoRef = useRef(null);
  const GreenByUser = useRef(Number);

  const [greenThreshold, setGreenThreshold] = useState(128);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [hue, setHue] = useState([0.25, 0.45]);
  const [saturation, setSaturation] = useState(0.4);
  const [lightness, setLightness] = useState(0.2);

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

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

  useEffect(() => {
    if (selectedDeviceId) {
      console.log('Device Selected', selectedDeviceId);
      const initializeStreams = async () => {
        const stream = await handleStream(selectedDeviceId);

        // videoRefs.current = Array.from({ length: 4 }, () => ({ current: stream }));
        // // Set stream to video elements
        // videoRefs.current.forEach((ref, index) => {
        //        console.log(stream,"SSVV");
        //       ref.current.srcObject = stream;
        //       console.log(ref.current.srcObject.srcObject,"reff src Obj");
        //     });
      };

      initializeStreams();
    }
  }, [selectedDeviceId]);

  return (
    <>
      <div className="flex flex-wrap content-center justify-center absolute w-full h-full">
        {/* <BackgroundColor selectedDeviceId={selectedDeviceId} GreenByUser={GreenByUser}/> */}
        {/* <EnhancedBackgroundColor
          selectedDeviceId={selectedDeviceId}
          GreenByUser={GreenByUser}
        /> */}
             <EnhancedBackgroundColor
          selectedDeviceId={selectedDeviceId}
          greenThreshold={greenThreshold}
          brightness={brightness}
          contrast={contrast}
          hue={hue}
          saturation={saturation}
          lightness={lightness}
        />
      </div>

      <div class=" h-screen w-screen flex flex-col z-10 p-8">
        <div className="flex justify-between h-1/2 w-full ">
          <div id="left">
            <Dropdown />
          </div>
          <div id="middle" className="flex">
            <Button component={MovieCameraIcon} />
            <Button component={MonitorIcon} />
            <Button component={FilmReelIcon} />
            <Button component={ProfileIcon} />
          </div>
          <div id="right" className="">
            <Button component={GalleryIcon} />
            <Button component={EnableMicIcon} />
            <Button component={ChatIcon} />
            <Button component={GroupIcon} />
            <Button component={SettingsIcon} />
          </div>
        </div>
        <div className="relative h-1/2 ">
          <div className="h-full w-full absolute p-8 flex flex-wrap justify-center content-center  ">
            <div className="h-1/3">
              <AllCameras setSelectedDeviceId={setSelectedDeviceId} />
            </div>
          </div>
          <div className=" w-full absolute bottom-0 flex align-items-center justify-between">
            <div id="left">
              <Button component={GroupIcon} />
            </div>
            <div id="middle">
              <Button component={GroupIcon} />
            </div>
            <div id="right">
              {/* <Button component={GroupIcon} /> */}
              {/* <input
        onChange={(e) => (GreenByUser.current = e.target.value)}
        type="number"
        min={0}
        max={255}
        className="border-2 bg-red-600"
      /> */}
              <div className="flex items-center space-x-4">
                {/* <input
    onChange={(e) => (GreenByUser.current = e.target.value)}
    type="number"
    min={0}
    max={255}
    className="border-2 border-gray-300 bg-white rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
  /> */}
                {/* <input
                  onChange={(e) => (GreenByUser.current = e.target.value)}
                  type="range"
                  min={0}
                  max={255}
                  className="h-4 appearance-none rounded-full w-64 bg-green-300"
                /> */}

                <input
                  onChange={(e) => setGreenThreshold(parseInt(e.target.value))}
                  type="range"
                  min={0}
                  max={255}
                  className="h-4 appearance-none rounded-full w-64 bg-green-300"
                  value={greenThreshold}
                />
                <input
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  type="range"
                  min={-255}
                  max={255}
                  className="h-4 appearance-none rounded-full w-64 bg-gray-300"
                  value={brightness}
                />
                <input
                  onChange={(e) => setContrast(parseInt(e.target.value))}
                  type="range"
                  min={-255}
                  max={255}
                  className="h-4 appearance-none rounded-full w-64 bg-gray-300"
                  value={contrast}
                />
                <input
                  onChange={(e) => setSaturation(parseFloat(e.target.value))}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  className="h-4 appearance-none rounded-full w-64 bg-gray-300"
                  value={saturation}
                />
                <input
                  onChange={(e) => setLightness(parseFloat(e.target.value))}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  className="h-4 appearance-none rounded-full w-64 bg-gray-300"
                  value={lightness}
                />
                <input
                  onChange={(e) => {
                    const hueValues = e.target.value
                      .split(',')
                      .map((v) => parseFloat(v));
                    setHue(hueValues);
                  }}
                  type="text"
                  placeholder="Hue (e.g., 0.25,0.45)"
                  className="border-2 border-gray-300 bg-white rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPanelComponent;
