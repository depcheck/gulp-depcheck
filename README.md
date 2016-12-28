# gulp-depcheck

gulp-depcheck adds [depcheck](https://www.npmjs.com/package/depcheck) support to Gulp.

## Installation

```bash
$ npm install gulp-depcheck
```

## Quick start

First you need to add gulp-depcheck to your project.

```javascript
const depcheck = require('gulp-depcheck');
```

Then, you can use the `depcheck` funtion to define Gulp tasks.

```javascript
gulp.task('depcheck', depcheck());
```

You may want to exclude some directories from being checked, e.g. the `test` directory. To exclude a directory, provide its name using the `ignoreDirs` property.

```javascript
gulp.task('depcheck', depcheck({
  ignoreDirs: [ 'test' ]
}));
```

Additionally, if you want to exclude packages from being checked, provide their names using the `ignoreMatches` property. Please note that you may use glob patterns here, e.g. to exclude all packages whose names start with `eslint-config-`.

```javascript
gulp.task('depcheck', depcheck({
  ignoreMatches: [ 'eslint-config-*' ]
}));
```

### Configuring the report

By default, gulp-depcheck fails on any issue it finds. From time to time you might want to adjust this, e.g. to allow unused packages in the `devDependencies` section of your `package.json` file, or to only report packages that are missing from your `package.json` file.

To do so, there are a few options you may hand over to the `depcheck` function to configure things.

- Set `dependencies` to `false` if you don't want to be notified on unused packages in the `dependencies` section.
- Set `devDependencies` to `false` if you don't want to be notified on unused packages in the `devDependencies` section.
- Set `missing` to `false` if you don't want to be notified on used packages that are missing from the `package.json` file.

Moreover, gulp-depcheck fails if it has problems to read files or directories. To adjust this, again there are a few options you may hand over to the `depcheck` function.

- Set `invalidFiles` to `false` if you don't want to be notified on files that can not be accessed or parsed.
- Set `invalidDirs` to `false` if you don't want to be notiied on directories that can not be accessed.

Moreover, gulp-depcheck supports all options of [depcheck](https://www.npmjs.com/package/depcheck). For more details, see its documentation.

### Configuring depcheck

If you want to configure the version of depcheck to use explicitly provide a reference to it using the `depcheck` property.

Additionally, you are allowed to set a default value for the directories to ignore. For that use the `ignoreDirsDefault` property and hand over the names of the directories to ignore as an array. The default value is `['node_modules', 'bower_components']`.

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```bash
$ bot
```

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
