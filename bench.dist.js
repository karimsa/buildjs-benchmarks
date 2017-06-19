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
);var tools = process.env.TOOLS.split(' '

/**
 * Wraps up an async function into the
 * deferred-style used by benchmarkjs.
 */
);function defer(fn) {
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

  return new Promise(function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var suite, logs, _loop, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, tool;

      return regeneratorRuntime.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              mkdir(`${__dirname}/build/${test}`);

              suite = new Benchmkark.Suite();
              logs = {};


              console.log('%s:\n', test

              /**
               * Add test runner for each tool & use streams
               * for log management to decrease overhead.
               */
              );_loop = regeneratorRuntime.mark(function _loop(tool) {
                var blacklist;
                return regeneratorRuntime.wrap(function _loop$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        blacklist = [];
                        _context3.next = 3;
                        return exists(`${__dirname}/${test}/blacklist`);

                      case 3:
                        if (!_context3.sent) {
                          _context3.next = 7;
                          break;
                        }

                        _context3.next = 6;
                        return readFile(`${__dirname}/${test}/blacklist`, 'utf8');

                      case 6:
                        blacklist = _context3.sent.split(/\r?\n/g);

                      case 7:

                        if (blacklist.indexOf(tool) === -1) {
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
                        } else {
                          console.log('%s is not capable of this test', tool);
                        }

                      case 8:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _loop, _this);
              });
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context4.prev = 8;
              _iterator = tools[Symbol.iterator]();

            case 10:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context4.next = 16;
                break;
              }

              tool = _step.value;
              return _context4.delegateYield(_loop(tool), 't0', 13);

            case 13:
              _iteratorNormalCompletion = true;
              _context4.next = 10;
              break;

            case 16:
              _context4.next = 22;
              break;

            case 18:
              _context4.prev = 18;
              _context4.t1 = _context4['catch'](8);
              _didIteratorError = true;
              _iteratorError = _context4.t1;

            case 22:
              _context4.prev = 22;
              _context4.prev = 23;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 25:
              _context4.prev = 25;

              if (!_didIteratorError) {
                _context4.next = 28;
                break;
              }

              throw _iteratorError;

            case 28:
              return _context4.finish(25);

            case 29:
              return _context4.finish(22);

            case 30:

              /**
               * Run the benchmarks.
               */
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

            case 31:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee3, _this, [[8, 18, 22, 30], [23,, 25, 29]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
}

/**
 * Run test.
 */
run(process.env.TEST).then(function () {
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
