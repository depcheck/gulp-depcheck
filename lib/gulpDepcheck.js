'use strict';

const _ = require('lodash'),
      gutil = require('gulp-util');

const PluginError = gutil.PluginError;

const pluginError = function (message) {
  message = gutil.colors.red(`\n${message}\n`);

  return new PluginError('depcheck', message, { showStack: false });
};

const gulpDepcheck = function (options) {
  options = options || {};

  /* eslint-disable global-require */
  const depcheck = options.depcheck || require('depcheck');
  /* eslint-enable global-require */

  const ignoreMissing = options.missing === false,
        ignoreUnusedDependencies = options.dependencies === false,
        ignoreUnusedDevDependencies = options.devDependencies === false;

  const ignoreDirsDefault = options.ignoreDirsDefault === false ? [] : [ 'node_modules', 'bower_components' ],
        ignoreInvalidDirs = options.invalidDirs === false,
        ignoreInvalidFiles = options.invalidFiles === false;

  options.ignoreDirs = _.uniq(ignoreDirsDefault.concat(options.ignoreDirs || []));
  options = _.omit(options,
    'depcheck',
    'ignoreDirsDefault',
    'dependencies',
    'devDependencies',
    'invalidFiles',
    'invalidDirs',
    'missing'
  );

  return function () {
    return new Promise((resolve, reject) => {
      depcheck(process.cwd(), options, unused => {
        const missing = ignoreMissing ? [] : Object.keys(unused.missing || {}),
              unusedDependencies = ignoreUnusedDependencies ? [] : unused.dependencies || [],
              unusedDevDependencies = ignoreUnusedDevDependencies ? [] : unused.devDependencies || [];

        const invalidDirs = ignoreInvalidDirs ? [] : Object.keys(unused.invalidDirs || {}),
              invalidFiles = ignoreInvalidFiles ? [] : Object.keys(unused.invalidFiles || {});

        if (invalidFiles.length > 0) {
          return reject(pluginError(`Unable to parse some files: ${invalidFiles.join(', ')}`));
        }

        if (invalidDirs.length > 0) {
          return reject(pluginError(`Unable to access some dirs: ${invalidDirs.join(', ')}`));
        }

        if (unusedDependencies.length > 0 || unusedDevDependencies.length > 0) {
          const allUnusedDeps = unusedDependencies.concat(unusedDevDependencies);

          return reject(pluginError(`You have unused dependencies:\n\n${allUnusedDeps.join(',\n')}`));
        }

        if (missing.length > 0) {
          return reject(pluginError(`You have missing dependencies:\n\n${missing.join(',\n')}`));
        }

        resolve();
      });
    });
  };
};

module.exports = gulpDepcheck;
