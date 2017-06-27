module.exports = {
	*js (taskr) {
		yield taskr.source('src/js/*.js').target('dist/js')
	},
	
	*css (taskr) {
		yield taskr.source('src/css/*.css').target('dist/css')
	},

	*default (taskr) {
		yield taskr.parallel(['js', 'css'])
	}
}
