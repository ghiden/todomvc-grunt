module.exports = function(grunt) {
  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          appDir: 'app/',
          baseUrl: 'js',
          paths: {
            text: 'lib/text'
          },
          shim: {
            'lib/jquery.min': {
              exports: '$'
            },
            'lib/underscore-min': {
              exports: '_'
            },
            'lib/backbone-min': {
              deps: ['lib/underscore-min'],
              exports: 'Backbone'
            },
            'lib/backbone-localstorage': {
              deps: ['lib/backbone-min'],
              exports: 'Backbone.LocalStorage'
            },
            'app': {
              deps: ['lib/jquery.min', 'lib/underscore-min', 'lib/backbone-min','lib/backbone-localstorage']
            }
          },
          dir: 'build/',
          modules: [
            {name: 'main'}
          ],
          almond: true,
          removeCombined: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-requirejs');

  grunt.registerTask('copy-require', function() {
    grunt.file.mkdir('build/js/lib');
    grunt.file.copy('node_modules/requirejs/require.js', 'build/js/lib/require.js');
  });

  grunt.registerTask('default', 'requirejs copy-require');
};
