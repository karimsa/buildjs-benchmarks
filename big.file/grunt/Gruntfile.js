module.exports = grunt => {
  grunt.initConfig({
    pkg: grunt.file.readJSON(`${__dirname}/package.json`),

    copy: {
      js: {
        files: [
          {
            src: 'src/js/*.js',
            dest: 'dist/js'
          }
        ]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['copy:js'])
}