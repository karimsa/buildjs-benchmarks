exports.default = function* (fly) {
	yield fly.source('src/js/*.js').target('dist/js')
}
