const readline = require('readline');
const path = require('path');
const fs = require('fs');

let beforeEmptyLine = true;
const stacks = [];
const instructions = [];

function evaluatePartOne (stacks, instructions) {
  const stacksCopy = JSON.parse(JSON.stringify(stacks));
  
  for (const instruction of instructions) {
    const [move, from, dest] = instruction;

    for (let i = 0; i < move; i++) {
      stacksCopy[dest - 1].unshift(stacksCopy[from - 1].shift());
    }
  }

  let answer = '';
  for (const s of stacksCopy) {
    answer += s[0];
  }

  return answer;
}

function evaluatePartTwo (stacks, instructions) {
  const stacksCopy = JSON.parse(JSON.stringify(stacks));

  for (const instruction of instructions) {
    const [move, from, dest] = instruction;

    debugger;
    stacksCopy[dest - 1].unshift(...stacksCopy[from - 1].splice(0, move));
  }

  let answer = '';
  for (const s of stacksCopy) {
    answer += s[0];
  }

  return answer;
}

const input = fs.createReadStream(path.join(__dirname, 'input.txt'), 'utf-8')
readline.createInterface(input)
  .on('line', (line) => {
    if (!line.length) {
      beforeEmptyLine = false;
      return;
    }

    if (beforeEmptyLine) {
      const symbols = [];

      for (const i in line) {
        if (i % 4 == 1 && isNaN(parseFloat(line[i]))) {
          symbols.push(line[i]);
        }
      }

      for (const i in symbols) {
        if (symbols[i] != ' ' && stacks[i] != null) {
          stacks[i].push(symbols[i]);
        } else if (symbols[i] != ' ') {
          stacks[i] = [symbols[i]];
        }
      }
    } else {
      instructions.push(line.split(' ').filter(e => !isNaN(parseFloat(e))));
    }
  })
  .on('close', () => {
    console.log(`The answer for part one is: ${evaluatePartOne(stacks, instructions)}`);
    console.log(`The answer for part one is: ${evaluatePartTwo(stacks, instructions)}`);
  });
