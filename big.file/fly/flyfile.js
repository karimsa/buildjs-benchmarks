exports.default = function* (f) {
	yield f.source('src/js/*.js').target('dist/js')
}
