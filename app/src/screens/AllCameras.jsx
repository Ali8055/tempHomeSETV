import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';

const AllCameras = ({setSelectedDeviceId}) => {
  const [cameras, setCameras] = useState([]);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setCameras(cameras);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    };

    fetchCameras();
  }, []);

  return (
    <div className='flex'>
      {cameras.map((camera, index) => (

            <div className='p-4' 
            onClick={(e)=>{ 
                e.preventDefault();
                console.log(camera.deviceId,"click",e);
                setSelectedDeviceId(camera?.deviceId)
            }}
            >
                <Webcam
                    audio={false}
                    videoConstraints={{ deviceId: camera.deviceId }}
                    height={200}
                    width={300}
                />
                <p>Camera {index + 1}</p>
            </div>
      ))}
    </div>
  );
};

export default AllCameras;
