var Funnel = require('broccoli-funnel')
var projectFiles = 'src'

module.exports = new Funnel(projectFiles, {
  srcDir: 'js'
})