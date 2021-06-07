// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, shell, dialog} = require('electron');
const path = require('path');
const consultaml = require('./src/BackEnd/consultaml');
let mainWindow;


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
};

//Enviando dados para o backend
ipcMain.on('canal1',(e,args)=>{
  
  if(!args){
    console.log('Vazio!');
    const item = 'Favor adicionar item na PESQUISA!'
    mainWindow.webContents.send('resultado',item);
  }else{
    consultaml(args);
    setTimeout(function () {
      //shell.openPath(`${__dirname}/src/BackEnd/RELATORIOS`)
      shell.openPath(`${__dirname}/src/BackEnd/RELATORIOS`)
  }, 3000);
    
  }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
