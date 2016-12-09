# gulp-depcheck

[depcheck](https://www.npmjs.com/package/depcheck) plugin for gulp.

[![Dependency Status](https://david-dm.org/mcasimir/gulp-depcheck.svg)](https://david-dm.org/mcasimir/gulp-depcheck)

[![Build Status](https://travis-ci.org/mcasimir/gulp-depcheck.svg?branch=master)](https://travis-ci.org/mcasimir/gulp-depcheck)

## Installation

```bash
$ npm install gulp-depcheck
```

## Quick start

``` js
const depcheck = require('gulp-depcheck');

gulp.task('depcheck', depcheck({
  ignoreDirs: [ 'docs', 'build' ],
  ignoreMatches: [ 'glob' ]
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

##### missing

Fails and reports on missing dependencies.

Default: `true`

## License

The MIT License (MIT)

Copyright (c) 2015 Maurizio Casimirri
Copyright (c) 2016 the native web

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
