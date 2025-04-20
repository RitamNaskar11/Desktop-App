const { app, BrowserWindow ,ipcMain} = require('electron')
const path = require('node:path')
const fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    title:'Js APP',
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

   
  ipcMain.handle('create-File', (req,data) => {
    if (!data || !data.title || !data.content)return false ;

    const filepath = path.join(__dirname,'notes', `${data.title}.txt`);
    fs.writeFileSync(filepath,data.content)

    return {success:true , filepath} 
    })
   
  
    win.loadFile('src/index.html')

}

// app.whenReady().then(() => {
// createWindow()

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow()
//     }
//   })
// })

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')  app.quit()
  })
