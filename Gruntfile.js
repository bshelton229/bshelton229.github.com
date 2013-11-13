/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    less: {
      assets: {
        options: {
          yuicompress: true
        },
        files: {
          'assets/css/app.css': '_assets/less/app.less'
        }
      }
    },
    uglify: {
      assets: {
        files: {
          'assets/js/app.js': [
            '_assets/js/bootstrap.js'
          ]
        }
      }
    },
    watch: {
      js: {
        files: [ '_assets/js/**/*.js' ],
        tasks: [ 'uglify' ]
      },
      less: {
        files: [ '_assets/less/**/*.less' ],
        tasks: [ 'less' ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', ['less', 'uglify']);
};
