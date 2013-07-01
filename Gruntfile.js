
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    less: {
      assets: {
        options: {
          paths: [ 'assets/less', 'assets/lib' ],
          yuicompress: true
        },
        files: {
          'app.css': 'assets/sass/app.sass'
        }
      }
    },
    uglify: {
      assets: {
        files: {
          'application.js': [
            "assets/js/highlight.pack.js",
            "assets/js/jquery.pjax.js",
            "assets/js/application.js"
          ]
        }
      }
    },
    watch: {
      js: {
        files: [ 'assets/js/**/*.js' ],
        tasks: [ 'uglify' ]
      },
      less: {
        files: [ 'assets/less/**/*.less' ],
        tasks: [ 'less' ]
      }, 
      sass: {
        files: [ 'assets/sass/**/*.sass' ],
        tasks: [ 'sass' ]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
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
  grunt.registerTask('default', ['jshint', 'less', 'uglify']);
};
