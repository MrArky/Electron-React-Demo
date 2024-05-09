const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  doSomething: () => {
    ipcRenderer.invoke('do-something').then(v=>console.log(v));
  }
});

// window.myAPI = {
//   desktop: true
// }