import React, { useRef, useEffect, useState } from 'react';

const BackgroundColor = ({selectedDeviceId}) => {
  console.log(selectedDeviceId,"selectedCameraId ++");
    // const [Red, setRed] = useState();
    // const [Green, setGreen] = useState();
    // const [Blue, setBlue] = useState();
  const Red = useRef(null);
  const Green = useRef(null);
  const GreenByUser = useRef(null);
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
        // Get RGB values from the top-left corner
  const topLeftPixelIndex = 0; // Top-left corner pixel index
  const topLeftPixelR = imageData.data[topLeftPixelIndex * 4];
  const topLeftPixelG = imageData.data[topLeftPixelIndex * 4 + 1];
  const topLeftPixelB = imageData.data[topLeftPixelIndex * 4 + 2];

  // Alternatively, get RGB values from the top-right corner
  const topRightPixelIndex = canvas.width - 1; // Top-right corner pixel index
  const topRightPixelR = imageData.data[topRightPixelIndex * 4];
  const topRightPixelG = imageData.data[topRightPixelIndex * 4 + 1];
  const topRightPixelB = imageData.data[topRightPixelIndex * 4 + 2];

  // Use the RGB values for your desired logic
  console.log('Top-left pixel RGB:', topLeftPixelR, topLeftPixelG, topLeftPixelB);
  console.log('Top-right pixel RGB:', topRightPixelR, topRightPixelG, topRightPixelB);
  // Top-right pixel RGB: 57 159 123
  // Top-left pixel RGB: 68 182 137

      // Example: Replace green pixels with a transparent pixel
      const pixels = imageData.data;
      
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        // if (g > r && g > b && g > 100) { // Assuming green pixels have higher green values
        //   pixels[i + 3] = 0; // Set alpha to 0 (transparent)
        // }
        if (g > r && g > b && g > GreenByUser.current) { // Assuming green pixels have higher green values
          // if (r>10 && r<100 && g>100 && g<255 && b < 150) { // Assuming green pixels have higher green values
          // Set alpha channel to a value that makes it appear yellow
          // imageData.data[i] = Red.current;
          // imageData.data[i + 1] = Green.current;
          // imageData.data[i + 2] = Blue.current;          
          imageData.data[i + 3] = 0;          // You can adjust the values above to get the desired yellow shade
        }
      }

      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(processFrame);
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: {
            deviceId: { exact: selectedDeviceId } // Specify the deviceId of the camera you want to use
          },
        
        });
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
  }, [videoSrc,selectedDeviceId]);


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
      <canvas  ref={canvasRef} 
      
      
      className="size-auto bg-[url('/sunset.jpg')]" 
      
      
      />
      Finializing
      <p>color</p>
      <input onChange={(e)=>GreenByUser.current = e.target.value} type='number' min={0} max={255}/>
      <input onChange={(e)=>colorVal(e)} className=" absolute z-50 "  type="color" id="bg-color" />
      <p>color</p>
    </div>
  );
};

export default BackgroundColor;
