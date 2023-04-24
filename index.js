const esprima = require('esprima');
const escodegen = require('escodegen');
const walk = require('esprima-walk');
const fs = require('fs');


const p5Methods = JSON.parse(fs.readFileSync('./p5_methods_splitted.json', 'utf-8'));
const program = fs.readFileSync('./sketch.js', 'utf-8');
const ast = esprima.parseScript(program);
const usedFunctions = new Set();

walk(ast, (node) => {
  if (node.type === 'CallExpression') {
    const functionName = node.callee.name;
    if (p5Methods.includes(functionName)) {
      const p5FunctionName = 'p5.' + functionName;
      node.callee.name = p5FunctionName;
    }
  }
});

const genCode = escodegen.generate(ast);
console.log(`OUTPUT:\n ${genCode}`);
