const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  windowControls: (action) => ipcRenderer.invoke('window-control', action),
  getWindowState: () => ipcRenderer.invoke('get-window-state'),
});
