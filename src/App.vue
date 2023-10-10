<template>
  <div class="container">
    <h2 class="title"> To-Do List </h2>
    <TodoSimpleForm @add-todo="addTodo" />
    <TodoList 
      :todolist="todos" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>

</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';


export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup(){
    const todos = ref([]);
    const todoStyle = {
      textDecoration : 'line-through',
      color : 'gray' 
    }

    const addTodo = (todo) => {
      todos.value.push(todo);
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed
    };

    return {
      todos,
      todoStyle,
      deleteTodo,
      addTodo,
      toggleTodo,
    };

  }
}
</script>

<style>
.title {
  color : pink;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 60px;
}

.todo_comp {
  color : gray;
  text-decoration: line-through;
}



</style>
