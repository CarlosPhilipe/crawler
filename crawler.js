const axios = require('axios');
const Crawler = require("crawler");
const File = require('fs');

let domains = [];
const listDomains = ['https://www.google.com.br','https://www.meliuz.com.br','https://www.saraiva.com.br'];


function writeFile(text) {
  File.writeFile("\/home\/carlos\/Desktop\/crawler\/meuarquivo.txt", text, function(erro) {

      if(erro) {
          throw erro;
      }

      console.log("Arquivo salvo");
  });
}
// Make a request for a user with a given ID
function getContext(url) {
    axios.get(url)
    .then(function (response) {
      const obj = {
        body: response.data,
      };
      domains.push(obj);
      // handle success
      console.log(`${url} coletado.`);
      // console.log(response.data););
      writeFile(domains);
    })
    .catch(function (error) {
      const obj = {
        body: '',
      };
      domains.push(obj);
      // handle success
      console.log(`${url} error.`);
      // console.log(response.data);
      writeFile(JSON.parse(domains));
    });
}

function mapDomains(list) {
  list.map((domain)=> {
    getContext(domain);
  });
}

mapDomains(listDomains);
