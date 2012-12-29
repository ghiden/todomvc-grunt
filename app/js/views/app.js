define(['collections/todos', 'views/todo', 'routers/router', 'config'],
  function(Todos, TodoView, Router, config) {

  var AppView = Backbone.View.extend({
    el: '#todoapp',

    statsTemplate: _.template($('#stats-template').html()),

    events: {
      'keypress #new-todo': 'createOnEnter',
      'click #clear-completed': 'clearCompleted',
      'click #toggle-all': 'toggleAllComplete'
    },

    initialize: function() {
      this.input = this.$('#new-todo');
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$footer = this.$('#footer');
      this.$main = this.$('#main');

      Todos.on('add', this.addOne, this);
      Todos.on('reset', this.addAll, this);
      Todos.on('change:completed', this.filterOne, this);
      Todos.on('filter', this.filterAll, this);

      Todos.on('all', this.render, this);

      Todos.fetch();
    },

    render: function() {
      var completed = Todos.completed().length;
      var remaining = Todos.remaining().length;

      if (Todos.length) {
        this.$main.show();
        this.$footer.show();

        this.$footer.html(this.statsTemplate({
          completed: completed,
          remaining: remaining
        }));

        this.$('#filters li a')
          .removeClass('selected')
          .filter('[href="/' + (Router.getFilter() || '') + '"]')
          .addClass('selected');

      } else {
        this.$main.hide();
        this.$footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    addOne: function(todo) {
      var view = new TodoView({ model: todo });
      $('#todo-list').append(view.render().el);
    },

    addAll: function() {
      this.$('#todo-list').html('');
      Todos.each(this.addOne, this);
    },

    filterOne: function(todo) {
      console.log('filterOne');
      todo.trigger('visible');
    },

    filterAll: function() {
      console.log('filterAll');
      Todos.each(this.filterOne, this);
    },

    newAttributes: function() {
      return {
        title: this.input.val().trim(),
        order: Todos.nextOrder(),
        completed: false
      };
    },

    createOnEnter: function(e) {
      if (e.which !== config.ENTER_KEY || !this.input.val().trim()) {
        return;
      }

      Todos.create(this.newAttributes());
      this.input.val('');
    },

    clearCompleted: function() {
      _.each(Todos.completed(), function(todo) {
        todo.destroy();
      });

      return false;
    },

    toggleAllComplete: function() {
      var completed = this.allCheckbox.checked;

      Todos.each(function(todo) {
        todo.save({'completed': completed});
      });
    }
  });
  return AppView;
});
