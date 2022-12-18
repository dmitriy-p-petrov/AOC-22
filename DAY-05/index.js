const readline = require('readline');
const path = require('path');
const fs = require('fs');

let beforeEmptyLine = true;
const stacks = [];
const instructions = [];

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
    for (instruction of instructions) {
      const [move, from, dest] = instruction;

      for (let i = 0; i < move; i++) {
        stacks[dest - 1].unshift(stacks[from - 1].shift());
      }
    }

    let answer = '';
    for (const s of stacks) {
      answer += s[0];
    }

    console.log(`The result is: ${answer}`);
  });
