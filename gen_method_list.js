const fs = require('fs');

const methodList = fs.readFileSync('./p5_methods.txt', 'utf8');
const methodListSplitted = methodList.split('\n').map(v => v.split(',')[0]);
const jsonMethodList = JSON.stringify(methodListSplitted);
fs.writeFileSync('./p5_methods_splitted.json', jsonMethodList);
