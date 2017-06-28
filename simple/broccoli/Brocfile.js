var Funnel = require('broccoli-funnel')
var MergeTrees = require('broccoli-merge-trees')
var projectFiles = 'src'

module.exports = new MergeTrees([
  new Funnel(projectFiles, {
    srcDir: 'css'
  }),
  new Funnel(projectFiles, {
    srcDir: 'js'
  })
])