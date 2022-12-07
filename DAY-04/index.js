const readline = require('readline');
const path = require('path');
const fs = require('fs');

function oneIntervalContainsTheOther(p) {
  if (Number(p[0][0]) >= Number(p[1][0]) && Number(p[0][1]) <= Number(p[1][1])) {
    return true;
  }
  if (Number(p[1][0]) >= Number(p[0][0]) && Number(p[1][1]) <= Number(p[0][1])) {
    return true;
  }

  return  false;
}

function intervalsOverlap(p) {
  if (Number(p[0][0]) <= Number(p[1][1]) && Number(p[0][1]) >= Number(p[1][0])) {
    return true;
  }
  if (Number(p[0][0]) <= Number(p[1][0]) && Number(p[0][1]) >= Number(p[1][1])) {
    return true;
  }

  return  false;
}

function processInput(line) {
  let pair = line.split(',');
  return pair = [pair[0].split('-'), pair[1].split('-')];
}

function countPartOne(pairs) {
  let result = 0;
  
  pairs.forEach((pair) => {
    result += Number(oneIntervalContainsTheOther(pair));
  });

  return result;
}

function countPartTwo(pairs) {
  let result = 0;
  
  pairs.forEach((pair) => {
    result += Number(intervalsOverlap(pair));
  });

  return result;
}

const pairs = [];

const input = fs.createReadStream(path.join(__dirname, 'input.txt'));
readline.createInterface(input)
  .on('line', (line) => {
    if (line.length) pairs.push(processInput(line));
  })
  .on('close', () => {
    console.log(countPartOne(pairs));
    console.log(countPartTwo(pairs));
  });
