// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var helpers = require('../helpers/archive-helpers.js');
var fs = require('fs');

// process.on('uncaughtException', function (err) {
//     console.log(err);
//     fs.appendFile('logerrors.txt', new Date() + ': ' + err + '\n\n\n');
// });

// helpers.readListOfUrls(function(data) {
//   data.forEach(function(url) {
//     helpers.isURLArchived(url, function(isArchived) {
//       if (!isArchived) {
//         helpers.downloadUrls(url);
//       }
//     });
//   });
// });