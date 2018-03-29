var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var helpers = require('./http-helpers');
// require more modules/folders here!

var methods = {
  'GET': function(request, response) {
    var urlPath = url.parse(request.url).pathname;
    if (urlPath === '/'){ 
      urlPath = '/index.html'; 
    }
    helpers.serveAssets(response, urlPath, function() {
      if(urlPath[0] === '/'){
        urlPath = urlPath.slice(1);
      }
      archive.isUrlInList(urlPath, function(exists){
        if(exists){
          helpers.redirect(response, '/loading.html');
        } else {
          helpers.sendError404(response);
        }   
      })
    });
  },
  'POST': function(request, response) {
    helpers.getData(request, function(data) {
      var url = data.split('=')[1].replace('http://', '');
      // check sites.txt for web site
      archive.isUrlInList(url, function(found) {
        if (found) { 
          archive.isUrlArchived(url, function(exists) {
            if (exists) {
              helpers.redirect(response, '/' + url);
            } else {
              helpers.redirect(response, '/loading.html');
            }
          });
        } else {
          archive.addUrlToList(url, function() {

            helpers.redirect(response, '/loading.html');
          });
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) {
  var handler = methods[req.method];
  if (handler) {
    handler(req, res);
  } else {
    helpers.sendError404(res);
  }
};