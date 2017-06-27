module.exports = {
	*js(fly) {
		yield fly.source('src/js/*.js').target('dist/js')
	},
	*css(fly) {
		yield fly.source('src/css/*.css').target('dist/css')
	},
	*default(fly) {
		yield fly.parallel(['js', 'css'])
	}
}
