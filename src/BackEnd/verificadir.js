const fs = require('fs');

const diretorio = 'RELATORIOS';

//console.log(diretorio);

if (!fs.existsSync(diretorio)){
    fs.mkdirSync(diretorio);
    
}