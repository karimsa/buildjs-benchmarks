module.exports = {
	*js(f) {
		yield f.source('src/js/*.js').target('dist/js')
	},
	*css(f) {
		yield f.source('src/css/*.css').target('dist/css')
	},
	*default(f) {
		yield f.parallel(['js', 'css'])
	}
}
