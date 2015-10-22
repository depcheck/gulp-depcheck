# gulp-depcheck

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
