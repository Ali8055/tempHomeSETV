import React, { useRef, useEffect, useState } from 'react';

const EnhancedBackgroundColor = ({ selectedDeviceId, greenThreshold, brightness, contrast, hue, saturation, lightness }) => {
  
  const videoSrc = useRef(null);
  const webcamVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const settings = useRef({ height: 0, width: 0 });

  const adjustBrightnessContrast = (pixels, brightness, contrast) => {
    const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = factor * (pixels[i] - 128) + 128 + brightness;
      pixels[i + 1] = factor * (pixels[i + 1] - 128) + 128 + brightness;
      pixels[i + 2] = factor * (pixels[i + 2] - 128) + 128 + brightness;
    }
    return pixels;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [h, s, l];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    console.log(selectedDeviceId,"selectedDeviceId--selectedDeviceId");
    const processFrame = () => {
      if (selectedDeviceId) {
        const video = videoSrc.current ? videoRef.current : webcamVideoRef.current;

        if (settings.current.width > 0) {
          canvas.width = settings.current.width;
          canvas.height = settings.current.height;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          let pixels = imageData.data;

          // Adjust brightness and contrast
          pixels = adjustBrightnessContrast(pixels, brightness, contrast);

          for (let i = 0; i < pixels.length; i += 4) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const [h, s, l] = rgbToHsl(r, g, b);

            // Check for green hue and saturation levels for more precision
            if (h >= hue[0] && h <= hue[1] && s >= saturation && l >= lightness && g > greenThreshold) {
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
        if (webcamVideoRef.current) {
          webcamVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startCamera();
    processFrame();
  }, [selectedDeviceId, greenThreshold, brightness, contrast, hue, saturation, lightness]);

  return (
    <div>
      <video ref={webcamVideoRef} autoPlay muted style={{ display: 'none' }} />
      <canvas ref={canvasRef} height={100} width={100} className="bg-[url('/sunset.jpg')]" />
    </div>
  );
};

export default EnhancedBackgroundColor;
