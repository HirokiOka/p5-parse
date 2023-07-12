const fs = require('fs');
const esprima = require('esprima'); const estraverse = require('estraverse');
const escodegen = require('escodegen');


const p5Methods = JSON.parse(fs.readFileSync('./p5_methods_splitted.json', 'utf-8'));
const program = fs.readFileSync('./data/sketch.js', 'utf-8');
const ast = esprima.parseScript(program);
/*
const replacedNode = {
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
*/

const replacedNode = {
      "type": "VariableDeclaration",
      "declarations": [
        {
          "type": "VariableDeclarator",
          "id": {
            "type": "Identifier",
            "name": "cnv"
          },
          "init": {
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
        }
      ],
      "kind": "let",
    };

estraverse.replace(ast, {
  enter: function(node) {
    if (node.type === 'CallExpression') {
      const functionName = node.callee.name;
      if (p5Methods.includes(functionName)) node.callee.name = 'p5.' + functionName;
      return node;
    } else if (node.type === 'ExpressionStatement' && node.expression.callee.name === 'createCanvas') {
      node.append(appendWidth);
      node.append(appendHeight);
      return replacedNode;
    }
  }
});

ast.body = ast.body[0].body.body;


const genCode = escodegen.generate(ast);
console.log(`INPUT:\n ${program}`);
console.log(`OUTPUT:\n ${genCode}`);
