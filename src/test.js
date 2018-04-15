const webpage = require('webpage');

const page = webpage.create();
const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36';

const caristixUrl = 'http://hl7-definition.caristix.com:9010/';
const googleUrl = 'https://www.google.fr/';
// page.settings.userAgent = userAgent;
page.open(googleUrl, status => {
  // if (status !== 'success') throw Error('Unable to access network');
  // selectOptions('cbxSegment', getSegment(process.argv));
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    console.log('Success Open website');
  }
  phantom.exit();
});
