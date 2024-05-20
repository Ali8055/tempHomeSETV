import React, { useEffect, useRef, useState } from 'react';
import AllCameras from './components/AllCameras';
import EnhancedBackgroundColor from '../../pages/EnhancedBackgroundColor';
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
import { throttle, debounce } from 'lodash';

const MainPanelComponent = () => {
  const [isFolded, setIsFolded] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const webcamVideoRef = useRef(null);

  const [greenThreshold, setGreenThreshold] = useState(128);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [hue, setHue] = useState([0.25, 0.45]);
  const [saturation, setSaturation] = useState(0.4);
  const [lightness, setLightness] = useState(0.2);

  // Throttle input change handlers
  const throttledSetGreenThreshold = useRef(throttle((value) => setGreenThreshold(value), 100)).current;
  const throttledSetBrightness = useRef(throttle((value) => setBrightness(value), 100)).current;
  const throttledSetContrast = useRef(throttle((value) => setContrast(value), 100)).current;
  const throttledSetSaturation = useRef(throttle((value) => setSaturation(value), 100)).current;
  const throttledSetLightness = useRef(throttle((value) => setLightness(value), 100)).current;

  // Debounce processing of the video frame
  const debouncedProcessFrame = useRef(debounce(() => {
    // Your processing logic here
  }, 100)).current;

  const handleStream = async (deviceId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId },
      });
      webcamVideoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  useEffect(() => {
    if (selectedDeviceId) {
      const initializeStream = async () => {
        await handleStream(selectedDeviceId);
      };
      initializeStream();
    }
  }, [selectedDeviceId]);

  return (
    <>
      <div className="flex flex-wrap content-center justify-center absolute w-full h-full">
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

      <div className="h-screen w-screen flex flex-col z-10 p-8">
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
              <div className="items-center space-x-4">
              GreenThreshold
                <input
                  onChange={(e) => throttledSetGreenThreshold(parseInt(e.target.value))}
                  type="range"
                  min={0}
                  max={255}
                  className="h-4 appearance-none rounded-full w-64 bg-green-300"
                  value={greenThreshold}
                />
                Brightness
                <input
                  onChange={(e) => throttledSetBrightness(parseInt(e.target.value))}
                  type="range"
                  min={-255}
                  max={255}
                  className="h-4 appearance-none rounded-full w-64 bg-gray-300"
                  value={brightness}
                />
                Contrast
                <input
                  onChange={(e) => throttledSetContrast(parseInt(e.target.value))}
                  type="range"
                  min={-255}
                  max={255}
                  className="h-4 appearance-none rounded-full w-64 bg-gray-300"
                  value={contrast}
                />
                Saturation
                <input
                  onChange={(e) => throttledSetSaturation(parseFloat(e.target.value))}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  className="h-4 appearance-none rounded-full w-64 bg-gray-300"
                  value={saturation}
                />
                Lightness
                <input
                  onChange={(e) => throttledSetLightness(parseFloat(e.target.value))}
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  className="h-4 appearance-none rounded-full w-64 bg-gray-300"
                  value={lightness}
                />
                hueValues
                <input
                  onChange={(e) => {
                    const hueValues = e.target.value.split(',').map(parseFloat);
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
