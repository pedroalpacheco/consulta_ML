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
  }
};

//consultaml('casa em brusque')
module.exports=consultaml;
