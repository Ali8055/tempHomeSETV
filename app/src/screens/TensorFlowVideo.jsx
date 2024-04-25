// import React, { useState, useEffect, useRef } from 'react';
// import Webcam from 'react-webcam';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-webgl';
// import * as bodyPix from '@tensorflow-models/body-pix';

////////////////////////
// first, import all you need
import { useRef, useState, useEffect } from "react";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
// import styles from "../styles/Home.module.scss";
import * as bodyPix from "@tensorflow-models/body-pix";
import Webcam from "react-webcam";

function BackgroundChanger() {
  const canvasRef = useRef(null);
  const webcamRef = useRef();
  // Manage the state of bodypixnet with useState
  const [bodypixnet, setBodypixnet] = useState();

  // Run only when the page is first loaded
  useEffect(() => {
    bodyPix.load().then((net) => {
      setBodypixnet(net);
    });
  }, []);

  const drawimage = async (
    webcam,
    context,
    canvas
  ) => {
    // create tempCanvas
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = webcam.videoWidth;
    tempCanvas.height = webcam.videoHeight;
    const tempCtx = tempCanvas.getContext("2d");
    const segmentation = await bodypixnet.segmentPerson(webcam);
    const mask = bodyPix.toMask(segmentation);
    (async function drawMask() {
      requestAnimationFrame(drawMask);
      // draw mask on tempCanvas
      const segmentation = await bodypixnet.segmentPerson(webcam);
      const mask = bodyPix.toMask(segmentation);
      tempCtx.putImageData(mask, 0, 0);
      // draw original image
      context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
      // use destination-out, then only masked area will be removed
      context.save();
      context.globalCompositeOperation = "destination-out";
      context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
      context.restore();
    })();
  };

  const clickHandler = async () => {
    const webcam = webcamRef.current.video ;
    const canvas = canvasRef.current;
    webcam.width = canvas.width = webcam.videoWidth;
    webcam.height = canvas.height = webcam.videoHeight;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    // canvas.classList.add(className);
    if (bodypixnet) {
      drawimage(webcam, context, canvas);
    }
  };
  return (
    <div >
      <header  >
        <h1  >Title</h1>
      </header>
      <main  >
        <div  >
          <Webcam audio={false} ref={webcamRef} />
          <canvas ref={canvasRef}   />
        </div>
        <div  >
          {/* <h4  >{t.select}</h4> */}
          <div  >
            <button onClick={clickHandler}>
              Button
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default BackgroundChanger;