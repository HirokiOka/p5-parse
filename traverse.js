const fs = require('fs');
const esprima = require('esprima');
const estraverse = require('estraverse');
const escodegen = require('escodegen');


const p5Methods = JSON.parse(fs.readFileSync('./p5_methods_splitted.json', 'utf-8'));
const program = fs.readFileSync('./sketch.js', 'utf-8');
const ast = esprima.parseScript(program);
const replace = {
        "type": "ExpressionStatement",
        "expression": {
          "type": "CallExpression",
          "callee": {
            "type": "MemberExpression",
            "computed": false,
            "object": {
              "type": "CallExpression",
              "callee": {
                "type": "Identifier",
                "name": "p5.createCanvas"
              },
              "arguments": [
                {
                  "type": "Literal",
                  "value": 100,
                  "raw": "100"
                },
                {
                  "type": "Literal",
                  "value": 100,
                  "raw": "100"
                }
              ]
            },
            "property": {
              "type": "Identifier",
              "name": "parent"
            }
          },
          "arguments": [
            {
              "type": "Identifier",
              "name": "canvasParentRef"
            }
          ]
        }
      };

estraverse.replace(ast, {
  enter: function(node) {
    if (node.type === 'CallExpression') {
      const functionName = node.callee.name;
      if (p5Methods.includes(functionName)) node.callee.name = 'p5.' + functionName;
      return node;
    }
    if (node.type === 'ExpressionStatement' && node.expression.callee.name === 'createCanvas') {
      return replace;
    }
  }
});

const genCode = escodegen.generate(ast);
console.log(`OUTPUT:\n ${genCode}`);
