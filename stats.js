/**
 * @file stat.js
 * @license MIT
 * @copyright 2017 Karim Alibhai.
 */

'use strict'

const fs = require('fs')
const chalk = require('chalk')
const solver = require('solver')

const tools = process.env.TOOLS.split(',')
const results = {}
const colors = {
  gulp: 'magenta',
  grunt: 'yellow',
  fly: 'blue',
  brunch: 'green'
}

let max = [Infinity, [undefined]]

function bold(str, should) {
  if (should) {
    return chalk.underline(chalk.bold(str))
  }

  return str
}

tools
  .map(tool => {
    results[tool] = solver.data(
      fs.readFileSync(`${__dirname}/${tool}/bench.log`, 'utf8')
        .split(/\r?\n/g)
        .filter(n => !isNaN(+n))
        .map(n => +n)
    )

    return tool
  })
  .sort((a, b) => (+results[a].average() > +results[b].average()))
  .map(tool => {
    console.log('  ' + chalk[colors[tool]](tool) + ' ' + bold('average: %s ns', max[1].indexOf(tool) !== -1), results[tool].average())
    console.log('  ' + chalk[colors[tool]](tool) + ' ' + bold('deviation: %s%', max[1].indexOf(tool) !== -1), results[tool].deviation().relative * 100)
    console.log('')
  })