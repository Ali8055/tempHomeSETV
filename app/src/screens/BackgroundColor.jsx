import React, { useRef, useEffect, useState } from 'react';

const BackgroundColor = ({ selectedDeviceId }) => {
  console.log(selectedDeviceId, 'selectedCameraId ++');

  const GreenByUser = useRef(Number);
  const tolerance = useRef(Number);

  const [videoSrc, setVideoSrc] = useState(null);
  const webcamVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const settings = useRef({ height: Number, width: Number });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const processFrame = () => {
      // Draw the webcam video or uploaded video
      if (selectedDeviceId) {
        const video = videoSrc ? videoRef.current : webcamVideoRef.current;


        if (settings.current.width > 0) {
          canvas.width = settings.current.width;
          canvas.height = settings.current.height;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          ctx.putImageData(imageData, 0, 0);

          const pixels = imageData.data;
          
          let tooolll = parseInt(tolerance.current)
            console.log(typeof tooolll,"TYPE");
            console.log(typeof tolerance.current,"tol TYPE");
            
          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            
              if (g > r && g > b && g > GreenByUser.current) {
              // if (r > 70 && r < 160 && g>95  && g < 220 && b < 150) {
           
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
            deviceId: { exact: selectedDeviceId }, // Specify the deviceId of the camera you want to use
          },
        });
        const videoTrack = stream.getVideoTracks()[0];
        settings.current.width = videoTrack.getSettings().width;
        settings.current.height = videoTrack.getSettings().height;

        webcamVideoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();

    processFrame();

    return () => {
      webcamVideoRef.current.srcObject
        ?.getTracks()
        .forEach((track) => track.stop());
    };
  }, [videoSrc, selectedDeviceId]);

  return (
    <div>
      {/* Display the webcam video */}
      <video ref={webcamVideoRef} autoPlay muted style={{ display: 'none' }} />
      <canvas
        ref={canvasRef}
        height={100}
        width={100}
        className=" bg-[url('/sunset.jpg')]"
      />
      Green Intensity
      <input
        onChange={(e) => (GreenByUser.current = e.target.value)}
        type="number"
        min={0}
        max={255}
        className="border-2 bg-red-600"
      />
      Tolerance
      <input
        onChange={(e) => (tolerance.current = e.target.value)}
        type="number"
        min={0}
        max={255}
        className="border-2 bg-blue-600"
      />
    </div>
  );
};

export default BackgroundColor;
