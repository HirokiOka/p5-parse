const fs = require('fs');
const diff = require('diff');

const sourceOne = fs.readFileSync('./data/sketch.js', 'utf-8');
const sourceTwo = fs.readFileSync('./data/line.js', 'utf-8');

const diffLines = diff.diffLines(sourceOne, sourceTwo);
console.log(diffLines);
