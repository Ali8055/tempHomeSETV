import React, { useRef, useEffect, useState } from 'react';

const EnhancedBackgroundColor = ({ selectedDeviceId, GreenByUser }) => {
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
    // Define key color range (green in this case)
    const keyColorRange = {
        min: [0, 100, 0], // Min RGB values
        max: [190, 255, 190] // Max RGB values
    };
    // 175 180 178
    // Loop through each pixel
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        // Check if the pixel is within the key color range
        if (
            r >= keyColorRange.min[0] && r <= keyColorRange.max[0] &&
            g >= keyColorRange.min[1] && g <= keyColorRange.max[1] &&
            b >= keyColorRange.min[2] && b <= keyColorRange.max[2]
        ) {
            // alert("YESS")
            console.log(r,g,b,"YESS");                          
            // Apply spill suppression (in this simplified example, just reduce green value)
            pixels[i + 1] = Math.min(g, 200); // Reduce green value to suppress spill
        } else {
            // alert("NO")
            // console.log(r,g,b,"NO");                          
            // Set non-key pixels to opaque white
            pixels[i + 3] = 255; // Alpha channel (opacity)
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

export default EnhancedBackgroundColor;
