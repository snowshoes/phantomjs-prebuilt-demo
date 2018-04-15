const webpage = require('webpage');
const waitFor = require('./waitfor');

const page = webpage.create();
const userAgent =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36';

const getSegment = argv => {
  if (!argv) throw Error('no argument provided');
  if (argv.length === 1) throw Error('no segment argument provided');
  if (argv.length === 2) {
    return argv[1];
  } else {
    throw Error('arguments format invalid');
  }
};

const getSelectedText = id => {
  var elem = document.getElementById(id);
  if (elem.selectedIndex == -1) return null;
  return elem.options[elem.selectedIndex].text;
};

const caristixUrl = 'http://hl7-definition.caristix.com:9010/';
page.settings.userAgent = userAgent;

const _arg = getSegment(process.argv);
const selector = 'cbxSegment';
// https://stackoverflow.com/questions/32771609/how-to-click-on-selectbox-options-using-phantomjs
const selectOptions = (selector, segmentArg) => {
  page.evaluate(
    function(selector, segmentArg) {
      // assign select option with segment value
      const sel = document.getElementById(selector);
      sel.value = segmentArg;
      // fire onChange event
      const event = new UIEvent('change', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      sel.dispatchEvent(event);
    },
    selector,
    _arg
  );
};
// page.open(caristixUrl, function(status) {
//   if (status == 'success') {
//     setTimeout(function() {
//       page.evaluate(function(_arg) {
//         document.getElementById('cbxSegment').value = _arg;
//       }, segmentArgs(process.argv));
//     }, 2000);
//   }
// });

page.open(caristixUrl, status => {
  // if (status !== 'success') throw Error('Unable to access network');
  // selectOptions('cbxSegment', getSegment(process.argv));
  if (status !== 'success') {
    console.log('Unable to access network');
  } else {
    // waitFor(
    //   function() {
    //     // Check in the page if a specific element is now visible
    //     return page.evaluate(function() {
    //       return $('#cbxSegment').is(':visible');
    //     });
    //   },
    //   function() {
    //     console.log('The segment option is now visible');
    //     phantom.exit();
    //   }
    // );
  }
  waitFor(
    () => {
      return page.evaluate(() => {
        return $('#cbxSegment').is(':visible');
      });
    },
    () => {
      console.log('The segment options is now visible');
      phantom.exit();
    }
  );
});
