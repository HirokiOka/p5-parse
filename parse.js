const esprima = require('esprima');
const fs = require('fs');

const program = fs.readFileSync('./sketch.js', 'utf-8');

const ast = esprima.parseScript(program);
const jsonAst = JSON.stringify(ast, null, 2);
fs.writeFileSync('./ast.json', jsonAst);
