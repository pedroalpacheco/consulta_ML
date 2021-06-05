// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
//Enviando do front para o backend
const {ipcRenderer, dialog} = require('electron');

const form = document.getElementById("formulario");
const campo = document.getElementById("consulta");
//const resultado = document.getElementById("result");

//Enviando dados para o backend
form.addEventListener("submit", function (e) {
  ipcRenderer.send('canal1',campo.value)
});
ipcRenderer.on('resultado',(event,item)=>{
  //console.log(item);
  //document.querySelector('#result').innerHTML = `${item}`
  //dialog.showMessageBox(item)
  const myNotification = new Notification('ALERTA!', {
    body: `${item}`
  })

});


