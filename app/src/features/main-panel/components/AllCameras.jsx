import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const AllCameras = ({setSelectedDeviceId}) => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        console.log(cameras,"CAMMMM");
        
        setCameras(cameras);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    fetchCameras();
  }, []);

  return (
    <div className='flex h-full bg-stone-950/[.30] overflow-x-auto rounded min-h-24 max-w-sm'>
      {cameras.map((camera, index) => (

            <div className='p-2 ' 
            onClick={(e)=>{ 
                e.preventDefault();
                console.log(camera.deviceId,"click",e);
                setSelectedDeviceId(camera?.deviceId)
            }}
            >
                <Webcam
                    audio={false}
                    videoConstraints={{ deviceId: camera.deviceId }}
                    // width={300}
                    style={{ height: '60px', }}
                />
                <p className='justify-center align-items-center'>Camera {index + 1}</p>
            </div>
      ))}
    </div>
  );
};

export default AllCameras;
