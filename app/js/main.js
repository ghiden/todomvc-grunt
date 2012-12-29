requirejs.config({
  baseUrl: 'js',
  paths: {},
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
  }
});

require(['app'], function(App) {
  console.log('starting App');
})
