const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  doSomething: () => ipcRenderer.invoke('do-something')
});

// window.myAPI = {
//   desktop: true
// }