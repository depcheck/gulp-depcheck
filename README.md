# gulp-depcheck

[depcheck](https://www.npmjs.com/package/depcheck) plugin for gulp.

[![Dependency Status](https://david-dm.org/mcasimir/gulp-depcheck.svg)](https://david-dm.org/mcasimir/gulp-depcheck)

[![Build Status](https://travis-ci.org/mcasimir/gulp-depcheck.svg?branch=master)](https://travis-ci.org/mcasimir/gulp-depcheck)

## Install

```
npm i --save-dev gulp-depcheck
```

## Usage

``` js
var depcheck = require('gulp-depcheck');

gulp.task('depcheck', depcheck({
  ignoreDirs: [ 'docs', 'build' ],
  ignoreMatches: ['glob']
}));
```

### Options

All [depcheck](https://www.npmjs.com/package/depcheck) options are supported, see their docs for more.

#### Plugin Options

##### depcheck

Use a different version of depcheck.

Default: `undefined`

##### ignoreDirsDefault

Prepend some default dirs to ignoreDirs. Set this to `false` or to an empty array to skip.

Default: `['node_modules', 'bower_components']`

##### dependencies

Fails and reports on unused dependencies.

Default: `true`

##### devDependencies

Fails and reports on unused devDependencies.

NB: setting this to `false` will still perform depcheck against `devDependencies` but
will ignore result, to completely skip the check use `withoutDev` option from depcheck.

Default: `true`

##### invalidFiles

Fails on file access and parsing errors

Default: `true`

##### invalidDirs

Fails on directory access errors

Default: `true`