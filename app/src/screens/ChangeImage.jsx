import React, { useEffect, useRef } from 'react';

function ChangeImage({selectedDeviceId}) {
    console.log(selectedDeviceId,"SS");
  const canvasRef = useRef(null);
  const webcamVideoRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    const processFrame = () => {
      const video = webcamVideoRef.current;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        // if (g > r && g > b && g > 100) { // Assuming green pixels have higher green values
        //   pixels[i + 3] = 0; // Set alpha to 0 (transparent)
        // }
        if (g > r && g > b && g > 100) { // Assuming green pixels have higher green values
          // if (r>10 && r<100 && g>100 && g<255 && b < 150) { // Assuming green pixels have higher green values
          // Set alpha channel to a value that makes it appear yellow
               
          imageData.data[i + 3] = 0;          // You can adjust the values above to get the desired yellow shade
        }
      }
      ctx.putImageData(imageData, 0, 0);
      requestAnimationFrame(processFrame);
    }

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
      startCamera();
    processFrame();

      return () => {
        webcamVideoRef.current.srcObject?.getTracks().forEach(track => track.stop());
      };
  }, [selectedDeviceId])

  return (
    <div >
      <div>
      <video ref={webcamVideoRef} autoPlay muted style={{ display: 'none'  }} />

        {/* <video id="video" src="media/video.mp4" controls="true" /> */}
      </div>
      <div>
        <canvas className="bg-[url('/sunset.jpg')] w-20 h-40" id="c2" ref={canvasRef} ></canvas>
      </div>
    </div>
  );
}

export default ChangeImage;
