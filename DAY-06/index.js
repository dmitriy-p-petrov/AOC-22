const readline = require('readline');
const path = require('path');
const fs = require('fs');

function hasNumConsecutiveChars (string, n) {
  for (let i = n - 1; i < string.length; i++) {
    const s = new Set();
    
    for (const c of string.slice(i - n + 1, i + 1)) {
      s.add(c);
    }

    if (s.size == n) return i + 1;
  }
  return -1;
}

function fetchStartOfPacket (datastream) {
  return hasNumConsecutiveChars(datastream, 4);
}

function fetchStartOfMessage () {
  return hasNumConsecutiveChars(datastream, 14);
}

let datastream, packet, message;

const input = fs.createReadStream(path.join(__dirname, 'input.txt'), 'utf-8');
readline.createInterface(input)
  .on('line', (line) => {
    datastream = line;
  })
  .on('close', () => {
    message = fetchStartOfMessage(datastream);
    packet  =  fetchStartOfPacket(datastream);

    console.log(`start of packet:  ${packet }`);
    console.log(`start of message: ${message}`);
  });
