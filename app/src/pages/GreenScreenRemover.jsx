import React, { useRef, useEffect, useState } from 'react';

const GreenScreenRemover = () => {
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
        if (g > r && g > b && g > 100) { // Assuming green pixels have higher green values
          pixels[i + 3] = 0; // Set alpha to 0 (transparent)
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

  return (
    <div>
      {/* Display the webcam video */}
      Initializing
      <video ref={webcamVideoRef} autoPlay muted style={{ display: videoSrc ? 'none' : 'block' }} />

      {/* Display the uploaded video if available */}
      {videoSrc && <video ref={videoRef} src={videoSrc} controls style={{ display: 'block' }} onLoadedMetadata={handleVideoLoadedMetadata} />}

      {/* Input for uploading video */}
      {/* {!videoSrc && ( */}
        <input type="file" accept="video/*" onChange={handleFileChange} />
      {/* )} */}
      {/* Canvas for green screen removal */}
      <canvas  ref={canvasRef}  />
      Finializing
    </div>
  );
};

export default GreenScreenRemover;
