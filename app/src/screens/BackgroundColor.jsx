import React, { useRef, useEffect, useState } from 'react';

const BackgroundColor = (ManualBackgroundColor) => {
    // const [Red, setRed] = useState();
    // const [Green, setGreen] = useState();
    // const [Blue, setBlue] = useState();
  const Red = useRef(null);
  const Green = useRef(null);
  const Blue = useRef(null);

  const [videoSrc, setVideoSrc] = useState(null);
  const webcamVideoRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoSrc(URL.createObjectURL(file));
  };
  const handleVideoLoadedMetadata = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const processFrame = () => {
      // Draw the webcam video or uploaded video
      const video = videoSrc ? videoRef.current : webcamVideoRef.current;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      

      // Example: Replace green pixels with a transparent pixel
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        // if (g > r && g > b && g > 100) { // Assuming green pixels have higher green values
        //   pixels[i + 3] = 0; // Set alpha to 0 (transparent)
        // }
        if (g > r && g > b && g > 100) { // Assuming green pixels have higher green values
          // Set alpha channel to a value that makes it appear yellow
          imageData.data[i] = Red.current;
          imageData.data[i + 1] = Green.current;
          imageData.data[i + 2] = Blue.current;
          imageData.data[i + 3] = 255;          // You can adjust the values above to get the desired yellow shade
        }
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(processFrame);
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        webcamVideoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    if (!videoSrc) {
      startCamera();
    }

    processFrame();

    return () => {
      webcamVideoRef.current.srcObject?.getTracks().forEach(track => track.stop());
    };
  }, [videoSrc]);


  const colorVal = (e) => {
    console.log(e.target.value,"MY COLOR");
    const hexColor = e.target.value; 
        const hex = hexColor.replace('#', '');
        console.log(hex,"hex");
        // Parse hexadecimal values
        Red.current = parseInt(hex.substring(0, 2), 16);
        Green.current = parseInt(hex.substring(2, 4), 16);
        Blue.current = parseInt(hex.substring(4, 6), 16);

        console.log("red:", Red.current);
        console.log("Green:", Green.current);
        console.log("Blue:", Blue.current);
}
  return (
    <div>
      {/* Display the webcam video */}
      Initializing
      <video ref={webcamVideoRef} autoPlay muted style={{ display: 'none'  }} />

      {/* Display the uploaded video if available */}
      {/* {videoSrc && <video ref={videoRef} src={videoSrc} controls style={{ display: 'block' }} onLoadedMetadata={handleVideoLoadedMetadata} />} */}

      {/* Input for uploading video */}
      {/* {!videoSrc && ( */}
        <input type="file" accept="video/*" onChange={handleFileChange} />
      {/* )} */}
      {/* Canvas for green screen removal */}
      <canvas  ref={canvasRef} className='w-full h-full'  />
      Finializing
      <p>color</p>
      <input onChange={(e)=>colorVal(e)} className='absolute z-50' type="color" id="bg-color" />
      <p>color</p>
    </div>
  );
};

export default BackgroundColor;
