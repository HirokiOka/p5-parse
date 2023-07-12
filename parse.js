const fs = require('fs');
const esprima = require('esprima');

const program = fs.readFileSync('./inside_sketch.js', 'utf-8');

const ast = esprima.parseScript(program);
const jsonAst = JSON.stringify(ast, null, 2);
fs.writeFileSync('./inside_ast.json', jsonAst);
