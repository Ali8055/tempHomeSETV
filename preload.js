const { channel } = require('diagnostics_channel');
const {contextBridge, ipcRenderer} = require('electron');
const os =require('os');

// contextBridge.exposeInMainWorld('electron',{
// homedir:()=>os.homedir(),
// })
contextBridge.exposeInMainWorld('electron',{
    homedir:()=>os.homedir(),
    osver:()=>os.version(),
})

contextBridge.exposeInMainWorld('ipcRenderer',{
    send:(channel,data)=>ipcRenderer.send(channel,data),
    on:(channel,func)=>ipcRenderer.on(channel,(event,...args)=>func(...args)),

})