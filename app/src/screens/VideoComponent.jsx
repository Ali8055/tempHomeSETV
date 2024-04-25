import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

const VideoComponent = () => {
  const webcamRef = useRef(null);
  const [streaming, setStreaming] = useState(false);

  const [processedFrame, setProcessedFrame] = useState(null);

  useEffect(() => {
    if (streaming) {
      // const captureVideoFrame = async () => {
      //   const videoElement = webcamRef.current.video;

      //   if (videoElement && videoElement.readyState === 4) {
      //     const canvasElement = document.createElement('canvas');
      //     const context = canvasElement.getContext('2d');
      //     if (!context) return;

      //     canvasElement.width = videoElement.videoWidth;
      //     canvasElement.height = videoElement.videoHeight;
      //     context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      //     const frameData = context.getImageData(0, 0, canvasElement.width, canvasElement.height).data;

      //     // Send video frame to main process for background removal
      //     window.ipcRenderer.send('backgroundRemoval', frameData);
      //   } else {
      //     console.log("Video element not ready");
      //   }
      // };

      // const captureInterval = setInterval(captureVideoFrame, 1000 / 30);

      // Cleanup function to clear interval
      // return () => clearInterval(captureInterval);

      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          const video = document.createElement('video');
          video.srcObject = stream;
          video.play();

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          const sendFrame = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

            const frameData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpeg);base64,/, '');
            // console.log('Frame generated:', frameData);
          window.ipcRenderer.send('backgroundRemoval', frameData);
       
            // socket.emit('frame', frameData);
          };

          const interval = setInterval(sendFrame, 1000 / 30);

          return () => {
            clearInterval(interval);
            stream.getTracks().forEach((track) => track.stop());
          };
        })
        .catch((error) => {
          console.error('Error accessing webcam:', error);
        });
    }
  }, [streaming]);

  useEffect(() => {
    if (streaming) {
      // Listen for processed frame from main process
      const handleProcessedFrame = (event, processedFrame) => {
        // Update state with processed frame
        console.log(processedFrame," ::processedFrame ::-");
        setProcessedFrame(processedFrame);
      };

      window.ipcRenderer.on('backgroundRemoved', handleProcessedFrame);

      // Cleanup function to remove event listener
      // return () => {
      //   window.ipcRenderer.off('backgroundRemoved', handleProcessedFrame);
      // };
    }
  }, [streaming]);

  return (
    <>
      {' '}
      <button onClick={() => setStreaming(!streaming)}>
        {streaming ? 'Stop Streaming' : 'Start Streaming'}
      </button>
      {streaming ? <Webcam ref={webcamRef} /> : <div>WEB CAM OFF</div>}
      {/* {processedFrame && (
        <img src={`data:image/png;base64,${processedFrame}`} alt="Processed Frame" />
      )} */}
      {/* {processedFrame && ( */}
      <div>
        <h2>Processed Frame</h2>
          <p>heloo start {processedFrame} end hello</p>
              <video className="h-full w-full z-1" src={processedFrame} autoPlay loop muted />

        <h3>END</h3>
      </div>
      {/* )} */}
    </>
  );
};

export default VideoComponent;
