/**
 * Categorias: https://api.mercadolibre.com/sites/MLB/categories#json
 * Doc api: https://developers.mercadolivre.com.br/pt_br/itens-e-buscas#Buscar-itens-por-categoria
 * Busca de produto: https://developers.mercadolivre.com.br/pt_br/categorias-e-atributos#Atributos-obrigat%C3%B3rios
 */

const axios = require('axios');
const saveCsv = require('./saveCsv');

const consultaml = (produto)=>{
  let verproduto = (!!produto);
  if (verproduto === false) {
    console.log(`Não ha produto:${verproduto}`)
  }else{
    //console.log(`Este é o produto digitado:${verproduto}`)
    const consulta = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
    
 
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
          saveCsv(itens,produto);
          
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
