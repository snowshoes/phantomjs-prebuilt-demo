const path = require('path');
const spawn = require('child_process').spawn;
const phantomjs = require('phantomjs-prebuilt');
const binPath = phantomjs.path;

const childArgs = [path.join(__dirname, 'test.js'), 'acc'];
console.log(JSON.stringify(childArgs, null, 2));

const child = spawn(binPath, childArgs);
child.stdout.setEncoding('utf8');
child.stdout.on('data', data => {
  console.log(data);
});
child.stderr.on('data', data => {
  console.log('stderr:' + data);
});

child.on('exit', code => {
  console.log('phantomjs-child process existed with code', code);
});
