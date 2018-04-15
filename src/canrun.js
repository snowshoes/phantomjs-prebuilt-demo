const fs = require('fs');
const webpage = require('webpage');
const path = require('path');

var publicJsDir = [path.join(__dirname)].join(fs.separator),
  testNames = fs
    .list(publicJsDir)
    .map(function(file) {
      return (file.match(/^(.*)\.test\.js$/) || [])[1];
    })
    .filter(function(val) {
      return val;
    });

for (var i = testNames.length; i--; ) {
  (function(i, testName, page) {
    try {
      console.log(testName); //page.open(...
      if (!i) phantom.exit();
    } catch (xcep) {
      console.log(xcep);
      phantom.exit();
    }
  })(i, testNames[i], webpage.create());
}
