exports.default = function* () {
  yield this.source([ 'src/js/*.js' ])
            .target('dist/js')
}