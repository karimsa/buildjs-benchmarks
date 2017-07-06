const hopp = require('hopp')

exports.default =
  hopp('src/js/*.js')
    .dest('dist/js')
