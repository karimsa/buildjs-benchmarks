const hopp = require('hopp')

exports.js =
  hopp('src/js/*.js')
    .dest('dist/js')

exports.css =
  hopp('src/css/*.css')
    .dest('dist/css')

exports.default = hopp.all([
  'js',
  'css'
])
