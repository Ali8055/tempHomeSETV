const {app,BrowserWindow, protocol, ipcMain} = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title:'Todo Again',
        width:1000,
        height:600,
        webPreferences:{
            contextIsolation:true,
            nodeIntegration:true,
            // sandbox:false,
            preload:path.join(__dirname,'./preload.js')
        }
    });
    mainWindow.webContents.openDevTools();
    const startUrl = url.format({
        pathname : path.join(__dirname,'./app/build/index.html'),
        protocol:'file',
    })
    mainWindow.loadURL(startUrl)

    
}

app.whenReady().then(createMainWindow)


ipcMain.on('submit:todoForm',(event,args)=>{
    console.log(args,":HUraaaaahh");
})


// import cv from 'opencv.js'
const cv = require('opencv.js');

// Function to perform background removal
function performBackgroundRemoval(videoFrame) {
    try {
      if (!videoFrame) {
        throw new Error("Video frame is undefined or null");
      }
  
      // Convert the video frame to a Mat (OpenCV matrix)
      const frameMat = new cv.Mat(videoFrame.height, videoFrame.width, cv.CV_8UC4);
    //   frameMat.data.set(videoFrame);
      console.log(frameMat," ===frameMat frameMat===");
      // Create a background subtractor
    //   const bgSubtractor = new cv.bgsegm.createBackgroundSubtractorMOG2();
  
      // Apply background subtraction
    //   bgSubtractor.apply(frameMat, frameMat);
  
      // Convert the processed frame back to Uint8ClampedArray
    //   const processedFrameData = new Uint8ClampedArray(frameMat.data);
    //   const processedFrame = {
    //     data: processedFrameData,
    //     width: frameMat.cols,
    //     height: frameMat.rows
    //   };
  
      // Release memory
    //   frameMat.delete();
  
    //   return processedFrame;
    } catch (error) {
      console.error("Error in performBackgroundRemoval:", error);
      return null; // Return null or handle the error appropriately
    }
  }
  
// Define IPC handler for background removal
ipcMain.on('backgroundRemoval', (event, videoFrame) => {
  // Perform background removal

  const processedFrame = performBackgroundRemoval(videoFrame)

  // Send processed frame back to the renderer process
//   event.sender.send('backgroundRemoved', processedFrame)
})
