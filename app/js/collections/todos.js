define(['models/todo'], function(Todo) {
  var TodoList = Backbone.Collection.extend({
    model: Todo,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    completed: function() {
      return this.filter(function(todo) {
        return todo.get('completed');
      });
    },

    remaining: function() {
      return this.without.apply(this, this.completed());
    },

    nextOrder: function() {
      if (!this.length) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    comparator: function(todo) {
      console.log('order: ' + todo.get('order'));
      return todo.get('order');
    }
  });
  return new TodoList();
});

