var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var helpers = require('../web/http-helpers.js');
var request = require ('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// Reads each url in our archived sites.txt and sends it with callback
exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, data){
    data = data.toString().split('\n');
    callback(data);
  })
};


// Check if there is any matching URL existed in our archieved sites.txt
exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(data){
    callback(_.contains(data, url));
  })
};


// Adding new URL to our list
exports.addUrlToList = function(url, callback){
  fs.appendFile(exports.paths.list,  url + '\n', function(err){
    if(err){
      throw err;
    }
    callback();
  });
};

// Check if the URL is already archieved
exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function(err, data){
    callback(_.contains(data, url));
  })
};

// Should download all pending urls in the list
exports.downloadUrls = function(urls) {
  _.each(urls, function(url){
    if(!url){
      return;
    } else {
      request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
    }
  });
};
