const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
    title:"Its Electron apps ",
    createNote: (data) => ipcRenderer.invoke('create-File',data)
    
})