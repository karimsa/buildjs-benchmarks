const { exec: _exec } = require('child_process')
const { exists, readFile, writeFile } = require('mz/fs')
const { mkdirSync: mkdir, createWriteStream } = require('fs')
const { sync: rf } = require('rimraf')
const asar = require('asar')
const Benchmkark = require('benchmark')
const suite = new Benchmkark.Suite()

/**
 * Cleanup & create sandbox.
 */
rf(`${__dirname}/build`)
mkdir(`${__dirname}/build`)

/**
 * Easily configurable to add tools.
 */
const tools = [
  'gulp',
  'grunt',
  'fly',
  'brunch'
]

/**
 * Wraps up an async function into the
 * deferred-style used by benchmarkjs.
 */
function defer(fn) {
  return prom => {
    fn().then(
      prom.resolve.bind(prom),
      err => {
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
function exec(tool, args) {
  return new Promise((resolve, reject) => {
    const child = _exec(`node_modules/.bin/${tool} ${args}`, {
      cwd: `${__dirname}/${tool}`
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
 * Add test runner for each tool & use streams
 * for log management to decrease overhead.
 */
const logs = {}

for (let tool of tools) {
  logs[tool] = createWriteStream(`${__dirname}/build/build-${tool}.log`)

  suite.add(tool, defer(async () => {
    const argsFile = `${__dirname}/${tool}/args`
    const args = await exists(argsFile) ? await readFile(argsFile) : ''

    await exec(tool, args)
  }), {
    defer: true
  })
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
     * Create log package for release.
     */
    asar.createPackage(`${__dirname}/build`, 'build.asar', () => {
      // do nothing - node should exit
    })
  })
  .run({ 'async': true })