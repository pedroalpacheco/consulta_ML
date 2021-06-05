/**
 * Categorias: https://api.mercadolibre.com/sites/MLB/categories#json
 * Doc api: https://developers.mercadolivre.com.br/pt_br/itens-e-buscas#Buscar-itens-por-categoria
 * Busca de produto: https://developers.mercadolivre.com.br/pt_br/categorias-e-atributos#Atributos-obrigat%C3%B3rios
 */

const axios = require('axios');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');

//const produto = 'iphone 13';
//const produto = 'casa alugar em blumenau';
//const nomeproduto = produto.replace(' ','');

const diretorio = 'RELATORIOS';



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
        //let arquivo = `${__dirname}/${diretorio}/consulta-${nomeproduto}.csv`;
        let arquivo = `${diretorio}/consulta-${nomeproduto}.csv`;
        if (!fs.existsSync(diretorio)){
          fs.mkdirSync(diretorio);
          
      }
        await csv.toDisk(arquivo);
        //await console.log(`Arquivo criado ==>${arquivo}`)
        return arquivo
      
    };
    //Detalhe MLB = Brasil / MLB1459 = Imoveis
    axios.get(consulta)
      .then(function (response) {
        let {results} = response.data;
        //console.log(`Resposta: ${results[1]}`)
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
