exports.default = function* (taskr) {
	yield taskr.source('src/js/*.js').target('dist/js')
}
