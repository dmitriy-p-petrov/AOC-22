const readline = require('readline');
const path = require('path');
const fs = require('fs');

function evaluateSumOne(rucksacks, priorities) {
  let sum = 0;

  for (let r of rucksacks) {
    r = [r.slice(0, r.length / 2), r.slice(r.length / 2)];
    
    const compartmentOne = r[0].split('');
    const compartmentTwo = r[1].split('');

    for (type of Object.keys(priorities)) {
      if (compartmentOne.includes(type) && compartmentTwo.includes(type)) {
        sum += priorities[type];
      }
    }
  }

  return sum;;
}

function evaluateSumTwo(rucksacks, priorities) {
  let sum = 0;

  for (let i = 0; i < rucksacks.length; i += 3) {
    for (type of Object.keys(priorities)) {
      const group = [rucksacks[i], rucksacks[i + 1], rucksacks[i + 2]];
      if (group.every(r => r.includes(type))) {
        sum += priorities[type];
      }
    }
  }

  return sum;
}

const rucksacks = [];

const input = fs.createReadStream(path.join(__dirname, 'input.txt'));
readline.createInterface(input)
  .on('line', (line) => {
    if (line.length) rucksacks.push(line);
  })
  .on('close', () => {
    const priorities = {};

    {
      let index = 1;  
      for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); i++) {
        priorities[String.fromCharCode(i)] = index++;
      }
      for (let i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++) {
        priorities[String.fromCharCode(i)] = index++;
      }
    }

    console.log(`The sum from part one is ${evaluateSumOne(rucksacks, priorities)}`);
    console.log(`The sum from part two is ${evaluateSumTwo(rucksacks, priorities)}`);
  });
