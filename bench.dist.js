'use strict';

var getArgs = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(test, tool) {
    var key, argsFile;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            key = test + '-' + tool;

            if (!args.hasOwnProperty(key)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', args[key]);

          case 3:
            argsFile = `${__dirname}/${test}/${tool}/args`;
            _context.next = 6;
            return exists(argsFile);

          case 6:
            if (!_context.sent) {
              _context.next = 12;
              break;
            }

            _context.next = 9;
            return readFile(argsFile);

          case 9:
            _context.t0 = _context.sent;
            _context.next = 13;
            break;

          case 12:
            _context.t0 = '';

          case 13:
            return _context.abrupt('return', args[key] = _context.t0);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getArgs(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Runs single test.
 */


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('child_process'),
    _exec = _require.exec;

var _require2 = require('mz/fs'),
    exists = _require2.exists,
    readFile = _require2.readFile;

var _require3 = require('fs'),
    mkdir = _require3.mkdirSync,
    createWriteStream = _require3.createWriteStream,
    readFileSync = _require3.readFileSync;

var _require4 = require('rimraf'),
    rf = _require4.sync;

var asar = require('asar');
var Benchmkark = require('benchmark'

/**
 * Cleanup & create sandbox.
 */
);rf(`${__dirname}/build`);
mkdir(`${__dirname}/build`

/**
 * Easily configurable to add tools.
 */
);var tools = ['gulp', 'grunt', 'fly', 'brunch'];

/**
 * Wraps up an async function into the
 * deferred-style used by benchmarkjs.
 */
function defer(fn) {
  return function (prom) {
    fn().then(prom.resolve.bind(prom), function (err) {
      err = err || new Error('Something went wrong.');
      console.error(err.stack || err);
      process.exit(-1);
    });
  };
}

/**
 * async child_process.exec - different from the mz/
 * implementation. this one gives me stderr separate
 * from stdout.
 */
function exec(test, tool, args, logs) {
  return new Promise(function (resolve, reject) {
    var child = _exec(`node_modules/.bin/${tool} ${args}`, {
      cwd: `${__dirname}/${test}/${tool}`
    });
    var stderr = child.stderr,
        stdout = child.stdout;


    stderr.pipe(process.stderr);
    stdout.on('data', function (data) {
      return logs[tool].write(data);
    });

    child.on('err', reject);

    child.on('exit', function (code) {
      if (code !== 0) reject();else resolve();
    });
  });
}

/**
 * Cache and load args for build commands.
 */
var args = {};

function run(test) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    mkdir(`${__dirname}/build/${test}`);

    var suite = new Benchmkark.Suite();
    var logs = {};

    /**
     * Add test runner for each tool & use streams
     * for log management to decrease overhead.
     */

    var _loop = function _loop(tool) {
      logs[tool] = createWriteStream(`${__dirname}/build/${test}/build-${tool}.log`);

      suite.add(tool, defer(_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.t0 = exec;
                _context2.t1 = test;
                _context2.t2 = tool;
                _context2.next = 5;
                return getArgs(test, tool);

              case 5:
                _context2.t3 = _context2.sent;
                _context2.t4 = logs;
                _context2.next = 9;
                return (0, _context2.t0)(_context2.t1, _context2.t2, _context2.t3, _context2.t4);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }))), {
        defer: true
      });
    };

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = tools[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var tool = _step.value;

        _loop(tool);
      }

      /**
       * Run the benchmarks.
       */
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    console.log('%s:\n', test);

    suite.on('cycle', function (evt) {
      return console.log(String(evt.target));
    }).on('complete', function () {
      console.log('');
      console.log('Fastest is ' + this.filter('fastest').map('name')

      /**
       * Close all logs, since we're about to zip & end.
       */
      );for (var tool in logs) {
        if (logs.hasOwnProperty(tool)) {
          logs[tool].end();
        }
      }

      /**
       * Next test.
       */
      resolve();
    }).run({ 'async': true });
  });
}

/**
 * Run individual tests.
 */
;_asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
  var tests, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, test;

  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          tests = ['simple'];
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 4;
          _iterator2 = tests[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context3.next = 13;
            break;
          }

          test = _step2.value;
          _context3.next = 10;
          return run(test);

        case 10:
          _iteratorNormalCompletion2 = true;
          _context3.next = 6;
          break;

        case 13:
          _context3.next = 19;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3['catch'](4);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 19:
          _context3.prev = 19;
          _context3.prev = 20;

          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }

        case 22:
          _context3.prev = 22;

          if (!_didIteratorError2) {
            _context3.next = 25;
            break;
          }

          throw _iteratorError2;

        case 25:
          return _context3.finish(22);

        case 26:
          return _context3.finish(19);

        case 27:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, undefined, [[4, 15, 19, 27], [20,, 22, 26]]);
}))().then(function () {
  /**
   * Create log package for release.
   */
  asar.createPackage(`${__dirname}/build`, 'build.asar', function () {
    // do nothing - node should exit
  });
}).catch(function (err) {
  console.error(err.stack || err);
  process.exit(-1);
});
