var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;

var childArgs = [path.join(__dirname, 'test.js'), 'acc'];

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  if (err) {
    console.log(err);
  }
});
