module.exports = function(grunt) {
  grunt.initConfig({
    requirejs: {
      compile: {
        options: {
          appDir: 'app/',
          baseUrl: 'js',
          paths: {
            text: 'lib/text',
            jquery: 'lib/jquery.min',
            underscore: 'lib/underscore-min',
            backbone: 'lib/backbone-min',
            backboneLocalstorage: 'lib/backbone-localstorage'
          },
          shim: {
            jquery: {
              exports: '$'
            },
            underscore: {
              exports: '_'
            },
            backbone: {
              deps: ['underscore'],
              exports: 'Backbone'
            },
            backboneLocalstorage: ['backbone']
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
