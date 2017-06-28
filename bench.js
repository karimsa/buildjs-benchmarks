const { exec: _exec } = require('child_process')
const { exists, readFile } = require('mz/fs')
const { mkdirSync: mkdir, createWriteStream, readFileSync } = require('fs')
const { sync: rf } = require('rimraf')
const asar = require('asar')
const Benchmkark = require('benchmark')

/**
 * Cleanup & create sandbox.
 */
rf(`${__dirname}/build`)
mkdir(`${__dirname}/build`)

/**
 * Easily configurable to add tools.
 */
const tools = process.env.TOOLS.split(' ')

/**
 * Wraps up an async function into the
 * deferred-style used by benchmarkjs.
 */
function defer(fn) {
  return prom => {
    fn().then(
      prom.resolve.bind(prom),
      err => {
        err = err || new Error('Something went wrong.')
        console.error(err.stack || err)
        process.exit(-1)
      }
    )
  }
}

/**
 * async child_process.exec - different from the mz/
 * implementation. this one gives me stderr separate
 * from stdout.
 */
function exec(test, tool, logs) {
  return new Promise((resolve, reject) => {
    const child = _exec(`npm start`, {
      cwd: `${__dirname}/${test}/${tool}`
    })
    const { stderr, stdout } = child

    stderr.pipe(process.stderr)
    stdout.on('data', data => logs[tool].write(data))
    
    child.on('err', reject)

    child.on('exit', code => {
      if (code !== 0) reject()
      else resolve()
    })
  })
}

/**
 * Runs single test.
 */
function run( test ) {
  return new Promise(async (resolve, reject) => {
    mkdir(`${__dirname}/build/${test}`)

    const suite = new Benchmkark.Suite()
    const logs = {}

    console.log('%s:\n', test)

    /**
     * Add test runner for each tool & use streams
     * for log management to decrease overhead.
     */
    for (let tool of tools) {
      let blacklist = []

      if (await exists(`${__dirname}/${test}/blacklist`)) {
        blacklist = (await readFile(`${__dirname}/${test}/blacklist`, 'utf8')).split(/\r?\n/g)
      }

      if (blacklist.indexOf(tool) === -1) {
        logs[tool] = createWriteStream(`${__dirname}/build/${test}/build-${tool}.log`)

        suite.add(tool, defer(async () => exec(test, tool, logs)), {
          defer: true
        })
      } else {
        console.log('%s is not capable of this test', tool)
      }
    }

    /**
     * Run the benchmarks.
     */
    suite
      .on('cycle', evt => console.log(String(evt.target)))
      .on('complete', function () {
        console.log('')
        console.log('Fastest is ' + this.filter('fastest').map('name'))

        /**
         * Close all logs, since we're about to zip & end.
         */
        for (let tool in logs) {
          if (logs.hasOwnProperty(tool)) {
            logs[tool].end()
          }
        }

        /**
         * Next test.
         */
        resolve()
      })
      .run({ 'async': true })
  })
}

/**
 * Run test.
 */
run(process.env.TEST).then(() => {
  /**
   * Create log package for release.
   */
  asar.createPackage(`${__dirname}/build`, 'build.asar', () => {
    // do nothing - node should exit
  })
}).catch(err => {
  console.error(err.stack || err)
  process.exit(-1)
})