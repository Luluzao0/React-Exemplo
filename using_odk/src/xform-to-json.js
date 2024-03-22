const fs = require('fs'); // Adicione esta linha para importar o módulo fs

const xform2json = require('xform-to-json');

// Carregue o conteúdo do seu arquivo XForm
const xmlString = fs.readFileSync('odk.xml', 'utf-8');

// Converta o XForm para JSON
xform2json(xmlString, function (err, json) {
  if (err) {
    console.error(err);
    return;
  }

  fs.writeFileSync('odk.json', JSON.stringify(json, null, 2)); // O segundo argumento null são os filtros e o 2 representa a formatação de dois espaços

  console.log('Arquivo JSON gerado com sucesso.');
});
