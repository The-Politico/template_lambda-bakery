const fs = require('fs');
const randomstring = require('randomstring');
const console = require('./console');

console.start('CREATING NEW STATIC HASH');

const hash = randomstring.generate(10);

console.log(`>>  ${hash}`);

fs.writeFileSync('./config/STATIC_HASH', hash);

console.end();
