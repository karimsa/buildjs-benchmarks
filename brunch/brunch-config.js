exports.paths = {
  public: 'dist',
  watched: ['src']
}

exports.files = {
  javascripts: {
    joinTo: {
      'js/jquery.js': /jquery/,
      'js/bootstrap.js': /bootstrap/,
      'js/extra.js': /^(?!jquery|bootstrap)/
    }
  },
  
  stylesheets: {
    joinTo: {
      'css/bootstrap.css': /bootstrap/
    }
  }
}