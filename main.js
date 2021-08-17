// Modules to control application life and create native browser window
/**
 * Para compilar no Linux pacotes para windows é necessário
 * instalar o wine (apt-get install wine) - Pode ser usado o Docker também
 */
const {app, BrowserWindow, ipcMain} = require('electron');
const consultaml = require('./src/BackEnd/consultaml');
let mainWindow;


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 150,
    resizable:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
  mainWindow.removeMenu();

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
  }
});

app.on('ready', () => {
  createWindow()
})
