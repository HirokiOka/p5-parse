const esprima = require('esprima');
const fs = require('fs');

const program = fs.readFileSync('./sketch.js', 'utf-8');
const parsedData = esprima.parse(program);

fs.writeFileSync('./parsed.json', JSON.stringify(parsedData, null, 2));



function exploreJSON(jsonObj) {
  for (const key in jsonObj) {
    if (typeof jsonObj[key] === 'object') {
      exploreJSON(jsonObj[key]);
    } else {
      console.log(key + ": " + jsonObj[key]);
    }
  }
}

function getFunctions(jsonObj) {
  for (const key in jsonObj) {
    if (typeof jsonObj[key] === 'object') {
      exploreJSON(jsonObj[key]);
    } 
  }
}
