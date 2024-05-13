import React, { useState } from 'react';
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

const MainPanelComponent = () => {
  const [isFolded, setIsFolded] = useState(false);

  const toggleFold = () => {
    setIsFolded(!isFolded);
  };
  return (
    // <div className=" h-screen w-screen">
    //   <div className="absolute top-0  p-8 h-full w-full z-10 border-10">
    //     <div className="relative h-full w-full">
    //       <div id="top" className="absolute top-0 w-full"></div>
    //       <div id="bottom" className="absolute bottom-0 w-full">

    //       </div>
    //     </div>
    //   </div>

    <div class=" h-screen w-screen flex flex-col z-10 p-8">
      {/* <div className="flex h-1/2">
          <div className="flex  align-items-center w-full justify-between">
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
              <input
                onChange={(e) => {
                  console.log(e.target.value, 'color VAll');
                }}
                type="color"
                id="bg-color"
              />
            </div>
          </div>
        </div> */}
      {/* <div className={`flex justify-center items-center h-1/2`}>

          <div className="w-60 h-1/2">
        
            <div className="bg-red-700 h-[70%]">
              <AllCameras />
            </div>
          </div>

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
        </div> */}
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
      {/* <div className="h-1/2 w-full bg-green-400"></div> */}
      <div className="relative h-1/2 ">
        <div className="h-full w-full absolute p-8 flex flex-wrap justify-center content-center  ">
          <div className='h-1/3'>
          <AllCameras/>
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
            <Button component={GroupIcon} />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default MainPanelComponent;
