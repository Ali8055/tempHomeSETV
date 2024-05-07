import React, { useRef, useEffect } from 'react';

// MainCanvas component
const MainCanvas = ({ videoSrc, imageSrc, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let video = document.createElement('video');
    let image = new Image();

    const drawVideoAndImage = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);

      // Draw the video on the left side of the canvas
      ctx.drawImage(video, 0, 0, width / 2, height);

      // Draw the image on the right side of the canvas
      ctx.drawImage(image, width / 2, 0, width / 2, height);
    };

    video.addEventListener('loadedmetadata', () => {
      drawVideoAndImage();
    });

    video.addEventListener('error', (error) => {
      console.error('Error loading video:', error);
    });

    video.src = videoSrc;
    video.muted = true;
    video.play();

    image.onload = () => {
      drawVideoAndImage();
    };

    image.onerror = (error) => {
      console.error('Error loading image:', error);
    };

    image.src = imageSrc;

    return () => {
      video.pause();
      video.removeAttribute('src');
      video.load();
    };
  }, [videoSrc, imageSrc, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

// App component
const ChangeImage = () => {
  return (
    <div>
      <h1>Main Canvas with Video and Image</h1>
      <MainCanvas
        // videoSrc="./../greenscreen.mp4" // Update with the correct path to your video
        imageSrc="../../sunset.jpg" // Update with the correct path to your image
        width={640}
        height={360}
      />
    </div>
  );
};

export default ChangeImage;
