exports.js = function* () {
  yield this.source([ 'src/js/*.js' ])
            .target('dist/js')
}

exports.css = function* () {
  yield this.source([ 'src/css/*.css' ])
            .target('dist/css')
}

exports.default = function* () {
  yield this.parallel(['js', 'css'])
}