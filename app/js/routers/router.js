define(['collections/todos'], function(Todos) {
  var router, Workspace = Backbone.Router.extend({
    routes: {
      '*filter': 'setFilter'
    },

    initialize: function() {
      this.filter = '';
    },

    setFilter: function(param) {
      this.filter = param.trim() || '';

      Todos.trigger('filter');
    },

    getFilter: function() {
      return this.filter;
    }
  });

  router  = new Workspace();
  Backbone.history.start();
  return router;
});
