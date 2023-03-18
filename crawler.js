const axios = require('axios');
const Crawler = require("crawler");
const fs = require('fs');

let domains = [];

function writeFile(text) {
  fs.appendFile("/Users/cbahia/my-projects/crawler/meuarquivo.json", text, function(erro) {
      if(erro) {
          throw erro;
      }

      // console.log("Arquivo salvo");
  });
}
// Make a request for a user with a given ID
function getContext(url) {
    axios.get(url)
    .then(function (response) {
      response.data.pageProps.tickers.forEach(ticker => {
        const obj = {
          ticker: ticker.symbol.toUpperCase(),
          company_name: ticker.company
        };
        domains.push(obj);
        console.log(`${ticker.symbol} adicionado.`);
      });
    })
    .catch(function (error) {
      const obj = {
        body: '',
      };
      // domains.push(obj);
      // handle success
      console.log(`${url} error.`);
      // console.log(response.data);
      writeFile(`${JSON.parse(obj)},`);
    });
}

function mapDomains(list) {
  list.map((domain)=> {
    getContext(domain);
  });
}


init() 

async function init() {
  for (var i = 1; i < 72; i++) {
    console.log(`page ${i}`);
    const listDomains = [`https://www.genialinvestimentos.com.br/_next/data/Rquxf79XYEjImsTyP-9zi/onde-investir/renda-variavel/acoes/listagem-de-acoes/page/${i}.json`];
    mapDomains(listDomains);
    await sleep(4000);
    // more statements
 }
 writeFile(JSON.stringify(domains));
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}