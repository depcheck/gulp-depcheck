/* global jasmine */

'use strict';

var depcheck      = require('..');
var _             = require('lodash');

describe('gulp-depcheck', function() {

  beforeEach(function() {
    this._fakeDepcheck = jasmine.createSpy('depcheck');
    this.fakeDepcheck = function(returns) {
      returns = _.merge({
        dependencies: [],
        devDependencies: [],
        invalidFiles: [],
        invalidDirs: []
      }, returns || {});

      this._fakeDepcheck.and.callFake(function(path, options, cb) {
        cb(returns);
      });

      return this._fakeDepcheck;
    };
    this.lastCall = function() {
      return this._fakeDepcheck.calls.mostRecent();
    };
  });

  it('Should call depcheck on cwd', function() {
    depcheck({
      depcheck: this.fakeDepcheck() 
    })();

    expect(this.lastCall().args[0]).toEqual(process.cwd());
  });

  it('Should call depcheck passing options', function() {
    depcheck({ 
      depcheck: this.fakeDepcheck(),
      fakeOpt: 1
    })();

    expect(this.lastCall().args[1].fakeOpt).toEqual(1);
  });

  it('Should not pass depcheck impl to depcheck', function() {
    depcheck({
      depcheck: this.fakeDepcheck() 
    })();

    expect(this.lastCall().args[1].depcheck).not.toBeDefined();
  });

  it('Should not pass ignoreDirsDefault to depcheck', function() {
    depcheck({
      depcheck: this.fakeDepcheck() 
    })();

    expect(this.lastCall().args[1].ignoreDirsDefault).not.toBeDefined();
  });

  it('Should concat default ignored dirs to depcheck ignoreDirs', function() {
    depcheck({
      depcheck: this.fakeDepcheck() 
    })();

    expect(this.lastCall().args[1].ignoreDirs).toEqual(['node_modules', 'bower_components']);
  });

 it('Should not concat default ignored dirs to depcheck ignoreDirs if ignoreDirsDefault is false', function() {
    depcheck({
      depcheck: this.fakeDepcheck(),
      ignoreDirsDefault: false
    })();

    expect(this.lastCall().args[1].ignoreDirs).toEqual([]);
  });

  it('Should not pass duplicate ignored dirs to depcheck', function() {
    depcheck({
      depcheck: this.fakeDepcheck(),
      ignoreDirs: [ 'node_modules' ]
    })();

    expect(this.lastCall().args[1].ignoreDirs).toEqual(['node_modules', 'bower_components']);
  });

  it('Should concat ignoreDirs option with ignoreDirsDefault', function() {
    depcheck({
      depcheck: this.fakeDepcheck(),
      ignoreDirs: [ 'a', 'b', 'c' ]
    })();

    expect(this.lastCall().args[1].ignoreDirs).toEqual(['node_modules', 'bower_components', 'a', 'b', 'c' ]);
  });  

  it('Should not concat ignoreDirs option with ignoreDirsDefault if ignoreDirsDefault is false', function() {
    depcheck({
      depcheck: this.fakeDepcheck(),
      ignoreDirsDefault: false,
      ignoreDirs: [ 'a', 'b', 'c' ]
    })();

    expect(this.lastCall().args[1].ignoreDirs).toEqual([ 'a', 'b', 'c' ]);
  });  

  it('Should fail on unused dependencies by default', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        dependencies: ['a', 'b']
      })
    })().then(done.fail).catch(done);
  });

  it('Should fail on unused devDependencies by default', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        devDependencies: ['a', 'b']
      })
    })().then(done.fail).catch(done);
  });

  it('Should fail on invalidFiles by default', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        invalidFiles: { a: new Error(), b: new Error() }
      })
    })().then(done.fail).catch(done);
  });

  it('Should fail on invalidDirs by default', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        invalidDirs: { a: new Error(), b: new Error() }
      })
    })().then(done.fail).catch(done);
  });

  it('Should ignore dependencies if dependencies is false', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        dependencies: ['a', 'b']
      }),
      dependencies: false
    })().then(done).catch(done.fail);
  });

  it('Should ignore devDependencies if devDependencies is false', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        devDependencies: ['a', 'b']
      }),
      devDependencies: false
    })().then(done).catch(done.fail);
  });

 it('Should not report dependencies if dependencies is false', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        dependencies: ['dep1', 'dep2'],
        devDependencies: ['devDep1', 'devDep2']
      }),
      dependencies: false
    })().then(done.fail).catch(function(err) {
      expect(err.message).not.toMatch(/(dep1|dep2)/);
      expect(err.message).toMatch(/(devDep1|devDep2)/);
      done();
    });
  });

  it('Should not report devDependencies if devDependencies is false', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        dependencies: ['dep1', 'dep2'],
        devDependencies: ['devDep1', 'devDep2']
      }),
      devDependencies: false
    })().then(done.fail).catch(function(err) {
      expect(err.message).toMatch(/(dep1|dep2)/);
      expect(err.message).not.toMatch(/(devDep1|devDep2)/);
      done();
    });
  });

  it('Should ignore invalidFiles if invalidFiles is false', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        invalidFiles: { a: new Error(), b: new Error() }
      }),
      invalidFiles: false
    })().then(done).catch(done.fail);
  });

  it('Should ignore invalidDirs if invalidDirs is false', function(done) {
    depcheck({
      depcheck: this.fakeDepcheck({
        invalidDirs: { a: new Error(), b: new Error() }
      }),
      invalidDirs: false
    })().then(done).catch(done.fail);
  });

  it('Should not throw with empty options', function() {
    expect(function() {
      depcheck()();
    }).not.toThrow();
  });

});