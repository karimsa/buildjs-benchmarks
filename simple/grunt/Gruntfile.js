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
      },

      css: {
        files: [
          {
            src: 'src/css/*.css',
            dest: 'dist/css'
          }
        ]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('default', ['copy:js', 'copy:css'])
}