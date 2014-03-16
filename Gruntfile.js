/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      app: {
        files: {
          'assets/css/app.css': 'assets/sass/all.scss'
        }
      }
    },
    cssmin: {
      app: {
        files: {
          'assets/css/app.min.css': 'assets/css/app.css'
        }
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      app: {
        files: {
          'assets/js/app.js': ['assets/js/src/vendor/**/*.js', 'assets/js/src/app.js']
        }
      }
    },
    watch: {
      sass: { files: 'assets/sass/**/*.scss', tasks: ['sass', 'cssmin'] },
      js: { files: 'assets/js/src/**/*.js', tasks: ['uglify']}
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);
};
