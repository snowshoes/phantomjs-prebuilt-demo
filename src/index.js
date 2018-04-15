const path = require('path');
// const spawn = require('child_process').spawn;
const childProcess = require('child_process');
const phantomjs = require('phantomjs-prebuilt');
const binPath = phantomjs.path;
// const process = require('./process_polyfill');

const childArgs = [path.join(__dirname, './segment.js'), 'acc'];
const program = phantomjs.exec(path.join(__dirname, './segment.js'), 'acc');

// process = spawn(binPath, childArgs);
program.stdout.setEncoding('utf8');
program.stdout.on('data', data => {
  console.log(data);
});
program.stderr.on('data', data => {
  console.log('stderr:' + data);
});

program.on('exit', code => {
  console.log('phantomjs-child process existed with code', code);
});
