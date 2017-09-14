'use strict';

const assert = require('assertthat');

const depcheck = require('../../lib/gulpDepcheck');

suite('gulpDepcheck', () => {
  test('calls depcheck on the current working directory by default.', done => {
    depcheck({
      depcheck (path) {
        assert.that(path).is.equalTo(process.cwd());
        done();
      }
    })();
  });

  test('calls depcheck with the specified root directory.', done => {
    depcheck({
      depcheck (path) {
        assert.that(path).is.equalTo('/path/to/project');
        done();
      },
      rootDir: '/path/to/project'
    })();
  });

  test('does not pass the rootDir option to depcheck.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.rootDir).is.undefined();
        done();
      }
    })();
  });

  test('passes the given options to depcheck.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options).is.equalTo({
          fakeOpt: 1,
          ignoreDirs: [ 'node_modules', 'bower_components' ]
        });
        done();
      },
      fakeOpt: 1
    })();
  });

  test('does not pass the depcheck reference to depcheck.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.depcheck).is.undefined();
        done();
      }
    })();
  });

  test('does not pass the default ignored directories to depcheck.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.ignoreDirsDefault).is.undefined();
        done();
      }
    })();
  });

  test('prefixes the ignored directories with the default ignored directories.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.ignoreDirs).is.equalTo([ 'node_modules', 'bower_components' ]);
        done();
      }
    })();
  });

  test('does not concatenate the default ignored directories with the ignored directories if the default directories should be ignored.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.ignoreDirs).is.equalTo([]);
        done();
      },
      ignoreDirsDefault: false
    })();
  });

  test('removes duplicates from the ignored directories.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.ignoreDirs).is.equalTo([ 'node_modules', 'bower_components' ]);
        done();
      },
      ignoreDirs: [ 'node_modules' ]
    })();
  });

  test('concatenates the ignored directories and the default ignored directories.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.ignoreDirs).is.equalTo([ 'node_modules', 'bower_components', 'a', 'b', 'c' ]);
        done();
      },
      ignoreDirs: [ 'a', 'b', 'c' ]
    })();
  });

  test('does not prefix the ignored directories with the ignored directories if the default directories should be ignored.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.ignoreDirs).is.equalTo([ 'a', 'b', 'c' ]);
        done();
      },
      ignoreDirsDefault: false,
      ignoreDirs: [ 'a', 'b', 'c' ]
    })();
  });

  test('does not pass ignore missing to depcheck.', done => {
    depcheck({
      depcheck (path, options) {
        assert.that(options.ignoreMissing).is.undefined();
        done();
      }
    })();
  });

  test('fails on unused dependencies.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          dependencies: [ 'a', 'b' ]
        });
      }
    })().
      then(() => {
        // Should never happen.
      }).
      catch(err => {
        assert.that(err.message.includes('You have unused dependencies:\n\na,\nb')).is.true();
        done();
      });
  });

  test('fails on unused dev dependencies.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          devDependencies: [ 'a', 'b' ]
        });
      }
    })().
      then(() => {
        // Should never happen.
      }).
      catch(err => {
        assert.that(err.message.includes('You have unused dependencies:\n\na,\nb')).is.true();
        done();
      });
  });

  test('fails on missing dependencies.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          missing: { packageA: './a.js', packageB: './b.js' }
        });
      }
    })().
      then(() => {
        // Should never happen.
      }).
      catch(err => {
        assert.that(err.message.includes('You have missing dependencies:\n\npackageA,\npackageB')).is.true();
        done();
      });
  });

  test('fails on invalid files.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          invalidFiles: { 'a.js': new Error(), 'b.js': new Error() }
        });
      }
    })().
      then(() => {
        // Should never happen.
      }).
      catch(err => {
        assert.that(err.message.includes('Unable to parse some files: a.js, b.js')).is.true();
        done();
      });
  });

  test('fails on invalid directories.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          invalidDirs: { directoryA: new Error(), directoryB: new Error() }
        });
      }
    })().
      then(() => {
        // Should never happen.
      }).
      catch(err => {
        assert.that(err.message.includes('Unable to access some dirs: directoryA, directoryB')).is.true();
        done();
      });
  });

  test('does not fail on dependencies if dependencies should not be checked.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          dependencies: [ 'a', 'b' ]
        });
      },
      dependencies: false
    })().
      then(() => {
        done();
      }).
      catch(done);
  });

  test('does not fail on dev dependencies if dev dependencies should not be checked.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          devDependencies: [ 'a', 'b' ]
        });
      },
      devDependencies: false
    })().
      then(() => {
        done();
      }).
      catch(done);
  });

  test('does not fail on missing if missing should not be checked.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          missing: { packageA: './a.js', packageB: './b.js' }
        });
      },
      missing: false
    })().
      then(() => {
        done();
      }).
      catch(done);
  });

  test('does not report dependencies if dependencies should not be checked.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          dependencies: [ 'dep1', 'dep2' ],
          devDependencies: [ 'devDep1', 'devDep2' ]
        });
      },
      dependencies: false
    })().
      then(() => {
        done();
      }).
      catch(err => {
        assert.that(err.message.includes('dep1')).is.false();
        assert.that(err.message.includes('dep2')).is.false();
        assert.that(err.message.includes('devDep1')).is.true();
        assert.that(err.message.includes('devDep2')).is.true();
        done();
      });
  });

  test('does not report dev dependencies if dev dependencies should not be checked.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          dependencies: [ 'dep1', 'dep2' ],
          devDependencies: [ 'devDep1', 'devDep2' ]
        });
      },
      devDependencies: false
    })().
      then(() => {
        done();
      }).
      catch(err => {
        assert.that(err.message.includes('dep1')).is.true();
        assert.that(err.message.includes('dep2')).is.true();
        assert.that(err.message.includes('devDep1')).is.false();
        assert.that(err.message.includes('devDep2')).is.false();
        done();
      });
  });

  test('does not fail on invalid files if invalid files should not be checked.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          invalidFiles: { 'a.js': new Error(), 'b.js': new Error() }
        });
      },
      invalidFiles: false
    })().
      then(() => {
        done();
      }).
      catch(done);
  });

  test('does not fail on invalid directories if invalid directories should not be checked.', done => {
    depcheck({
      depcheck (path, options, callback) {
        callback({
          invalidDirs: { './a': new Error(), './b': new Error() }
        });
      },
      invalidDirs: false
    })().
      then(() => {
        done();
      }).
      catch(done);
  });

  test('does not throw if no options are given.', done => {
    assert.that(() => {
      depcheck()();
    }).is.not.throwing();
    done();
  });
});
