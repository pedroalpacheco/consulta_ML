/**
 * Categorias: https://api.mercadolibre.com/sites/MLB/categories#json
 * Doc api: https://developers.mercadolivre.com.br/pt_br/itens-e-buscas#Buscar-itens-por-categoria
 * Busca de produto: https://developers.mercadolivre.com.br/pt_br/categorias-e-atributos#Atributos-obrigat%C3%B3rios
 */

const axios = require('axios');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const {app, shell} = require('electron');

//const diretorioraiz = app.getPath('documents');
const diretorio = app.getPath('documents') +'/RELATORIOS-ML';
//Pega horario da pesquisa
const timestamp = new Date().getTime();

const consultaml = (produto)=>{
  let verproduto = (!!produto);
  if (verproduto === false) {
    console.log(`Não ha produto:${verproduto}`)
  }else{
    //console.log(`Este é o produto digitado:${verproduto}`)
    const consulta = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
    const nomeproduto = produto.replace(' ','');
    const salvacsv = async (dados)=>{
      const csv = new ObjectsToCsv(dados);
      let arquivo = `${diretorio}/Relatorio-${nomeproduto}-${timestamp}.csv`
         if (!fs.existsSync(diretorio)){
          fs.mkdirSync(diretorio);
          
      }
       
        await csv.toDisk(arquivo);
      setTimeout(function () {
      shell.openPath(diretorio)
  }, 3000);
      
    };
    //Detalhe MLB = Brasil / MLB1459 = Imoveis
    axios.get(consulta)
      .then(function (response) {
        let {results} = response.data;
        const itens = results.map((result,index)=>{
            return {
                id:result.id,
                titulo:result.title,
                preco:result.price,
                linkproduto:result.permalink,
                thumby:result.thumbnail
            }
        })
        let verificaitens = results.length
        if (verificaitens === 0) {
          console.log('Não ha resultado na consulta!')
        }else{

          console.log(verificaitens);//Debug
          salvacsv(itens);
          
        }
    
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
       //Continua
      });
  }
};

//consultaml('casa em brusque')
module.exports=consultaml;
