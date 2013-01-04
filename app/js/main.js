requirejs.config({
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
  }
});

require(['app'], function(App) {
  console.log('starting App');
})
