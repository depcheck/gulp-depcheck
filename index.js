'use strict';

var depcheck  = require('depcheck');
var gutil     = require('gulp-util');
var PluginError = gutil.PluginError;
var Es6Promise = require('es6-promise').Promise;

module.exports = depCheck;

function depCheck(options) {
  return function(){
    return new Es6Promise(function(resolve, reject) {
      depcheck(__dirname, options, function(unused) {
        if (Object.keys(unused.invalidFiles).length) {
          reject(new Error(`Unable to parse some files: ${unused.invalidFiles.join(', ')}`));
          return;
        }
        if (unused.dependencies.length || unused.devDependencies.length) {
          var unusedDeps = unused.dependencies.concat(unused.devDependencies);

          var message = [
            gutil.colors.red(`You have some unused dependencies:  ${unusedDeps.join(', ')}'`),
            `Pass { ignoreMatches: ${JSON.stringify(unusedDeps).replace(/"/g, '\'')} } in plugin options to ignore this error`
          ].join('\n');

          return reject(new PluginError('depcheck', message, { showStack: false }));
        }
        resolve();
      });
    });
  };
}
