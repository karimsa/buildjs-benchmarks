exports.paths = {
  public: 'dist',
  watched: ['src']
}

exports.files = {
  javascripts: {
    joinTo: {
      'js/bootstrap.js': /bootstrap/
    }
  }
}