import React, { useRef, useEffect, useState } from 'react';

const BackgroundColor = ({ selectedDeviceId, GreenByUser }) => {
  const tolerance = useRef(0); // Initialize with numeric value
  const [videoSrc, setVideoSrc] = useState(null);
  const webcamVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const settings = useRef({ height: 0, width: 0 }); // Initialize with numeric values

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const processFrame = () => {
      if (selectedDeviceId) {
        const video = videoSrc ? videoRef.current : webcamVideoRef.current;

        if (settings.current.width > 0) {
          canvas.width = settings.current.width;
          canvas.height = settings.current.height;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          const pixels = imageData.data;

          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            if (g > r && g > b && g > GreenByUser.current) {
              imageData.data[i + 3] = 0; // Set alpha to 0 (transparent)
            }
          }

          ctx.putImageData(imageData, 0, 0);
          requestAnimationFrame(processFrame);
        }
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: selectedDeviceId },
          },
        });
        const videoTrack = stream.getVideoTracks()[0];
        settings.current.width = videoTrack.getSettings().width;
        settings.current.height = videoTrack.getSettings().height;
        if(webcamVideoRef.current){

          webcamVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    processFrame();
  }, [selectedDeviceId, GreenByUser.current]); // Depend on selectedDeviceId and GreenByUser.current

  useEffect(() => {
    if (webcamVideoRef.current) {
      console.log(webcamVideoRef.current, "webcamVideoRef.current");
    } else {
      console.log("webcamVideoRef.current is null");
    }
  }, [webcamVideoRef.current]); // Ensure this effect runs whenever webcamVideoRef.current changes

  return (
    <div>
      <video ref={webcamVideoRef} autoPlay muted style={{ display: 'none' }} />

      <canvas
        ref={canvasRef}
        height={100}
        width={100}
        className=" bg-[url('/sunset.jpg')]"
      />
    </div>
  );
};

export default BackgroundColor;
