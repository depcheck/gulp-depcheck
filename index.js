'use strict';

var gutil       = require('gulp-util');
var PluginError = gutil.PluginError;
var Es6Promise  = require('es6-promise').Promise;
var _           = require('lodash');

module.exports = depCheck;

function depCheck(options) {
  options               = options || {};
  var depcheck          = options.depcheck || require('depcheck');
  var ignoreDirsDefault = options.ignoreDirsDefault === false ? 
                            [] : 
                              ['node_modules', 'bower_components'];
  
  var ignoreUnusedDependencies     = options.dependencies    === false; 
  var ignoreUnusedDevDependencies  = options.devDependencies === false;
  var ignoreInvalidFiles           = options.invalidFiles    === false;
  var ignoreInvalidDirs            = options.invalidDirs     === false;

  options.ignoreDirs    = _.uniq(ignoreDirsDefault.concat(options.ignoreDirs || []));
  options               = _.omit(options, 
    'depcheck',
    'ignoreDirsDefault',
    'dependencies',
    'devDependencies',
    'invalidFiles',
    'invalidDirs'
  );

  return function(){
    return new Es6Promise(function(resolve, reject) {
      depcheck(process.cwd(), options, function(unused) {
        var invalidDirs           = Object.keys(unused.invalidDirs || {});
        var invalidFiles          = Object.keys(unused.invalidFiles || {});
        var unusedDependencies    = unused.dependencies || [];
        var unusedDevDependencies = unused.devDependencies || [];

        if (!ignoreInvalidFiles && invalidFiles.length) {
          reject(
            pluginError(
              'Unable to parse some files: ' + invalidFiles.join(', ')
            )
          );
        } 
        else if (!ignoreInvalidDirs && invalidDirs.length) {
          reject(
            pluginError(
              'Unable to access some dirs: ' + invalidDirs.join(', ')
            )
          );
        }
        else if ((!ignoreUnusedDependencies && unusedDependencies.length) || 
          (!ignoreUnusedDevDependencies && unusedDevDependencies.length)) {
            var allUnusedDeps = unusedDependencies.concat(unusedDevDependencies);
            reject(
              pluginError(
                'You have unused dependencies:\n\n' + allUnusedDeps.join(',\n')
              )
            );
          } else {
            resolve();  
          }
      });
    });
  };
}

function pluginError(message) {
  message = gutil.colors.red('\n' + message + '\n');
  return new PluginError('depcheck', message, { showStack: false });
}