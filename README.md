# gulp-depcheck

[depcheck](https://www.npmjs.com/package/depcheck) plugin for gulp.

[![Dependency Status](https://david-dm.org/mcasimir/gulp-depcheck.svg)](https://david-dm.org/mcasimir/gulp-depcheck)


## Install

```
npm i --save-dev gulp-depcheck
```

## Usage

``` js
var depcheck = require('gulp-depcheck');

gulp.task('depcheck', depcheck({
  ignoreDirs: [
    'node_modules',
    'bower_components',
    'docs'
  ],
  ignoreMatches: ['glob']
}));
```
