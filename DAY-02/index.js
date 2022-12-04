const readline = require('readline');
const path = require('path');
const fs = require('fs');

function evaluateScore(strategy) {
  const points = { 'R': 1, 'P': 2, 'S': 3 };
  let totalScore = 0;
    
  strategy.forEach((round) => {
    switch (round) {
      case 'SR': case 'RP': case 'PS':
        totalScore += (points[round[1]] + 6); 
        break;
      case 'RR': case 'PP': case 'SS':
        totalScore += (points[round[1]] + 3); 
        break;
      case 'PR': case 'SP': case 'RS':
        totalScore += (points[round[1]] + 0); 
        break;
    }
  });

  return totalScore;
}

function processPartOne(line) {
  return line.split(' ').map((value) => {
    if (['A', 'X'].includes(value)) return 'R';
    if (['B', 'Y'].includes(value)) return 'P';
    if (['C', 'Z'].includes(value)) return 'S';
  }).join('')
}

function processPartTwo(line) {
  line = line.split(' ').join('');
  if (line[1] == 'Z') return line[0] == 'A' ? 'RP' : line[0] == 'B' ? 'PS' : 'SR';
  if (line[1] == 'Y') return line[0] == 'A' ? 'RR' : line[0] == 'B' ? 'PP' : 'SS';
  if (line[1] == 'X') return line[0] == 'A' ? 'RS' : line[0] == 'B' ? 'PR' : 'SP';
}

const partOne = [], partTwo = [];

const input = fs.createReadStream(path.join(__dirname, 'input.txt'));
readline.createInterface(input)
  .on('line', (line) => {
    if (line.length) {
      partOne.push(processPartOne(line));
      partTwo.push(processPartTwo(line));
    }
  })
  .on('close', () => {
    console.log(`The total score in part 1 is going to be: ${evaluateScore(partOne)}`);
    console.log(`The total score in part 2 is going to be: ${evaluateScore(partTwo)}`);
  });
