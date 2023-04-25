const esprima = require('esprima');
const escodegen = require('escodegen');
const walk = require('esprima-walk');
const fs = require('fs');
//const p5 = require('p5');


const p5Methods = JSON.parse(fs.readFileSync('./p5_methods_splitted.json', 'utf-8'));
const program = fs.readFileSync('./sketch.js', 'utf-8');
const ast = esprima.parseScript(program);

//const methodList = Object.getOwnPropertyNames(p5.prototype);
//console.log(methodList);

walk(ast, (node) => {
  //console.log(typeof(node));
  if (node.type === 'MemberExpression' && node.object.callee.name === 'createCanvas') {
    console.log(node.property);
  }
  if (node.type === 'CallExpression') {
    const functionName = node.callee.name;
    if (p5Methods.includes(functionName)) node.callee.name = 'p5.' + functionName;
  }
});

/*
const genCode = escodegen.generate(ast);
console.log(`OUTPUT:\n ${genCode}`);
*/
