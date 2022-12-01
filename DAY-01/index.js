const readline = require("readline");
const path = require('path');
const fs = require('fs');

const entries = [], entry = [];

const input = fs.createReadStream(path.join(__dirname, 'input.txt'));
readline.createInterface(input)
  .on('line', (line) => {
    if (line.length) {
      entry.push(Number(line));
    } else {
      entries.push(entry.reduce((sum, x) => sum + x, 0));
      entry.length = 0;
    }
  })
  .on('close', () => {
    const sortedEntries = entries.slice().sort((a, b) => (b - a));
    const n1 = sortedEntries[0], n2 = sortedEntries[1], n3 = sortedEntries[2];

    process.stdout.write(
      'The top three elves carrying the most calories are: ' +
      '#' + entries.indexOf(n1) + ', ' + '#' + entries.indexOf(n2) + ', and ' + '#' + entries.indexOf(n3) +
      ' with ' + n1 + ', ' + n2 + ' and ' + n3 + ' calories, respectively. \n' +
      'These three elves carry a total of ' + (n1 + n2 + n3) + ' calories.'
    );
  });