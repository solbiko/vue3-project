<template>


  <div class="container">
    <h2 class="title"> To-Do List </h2>

    <input 
      type="text" 
      placeholder="search"
      class="form-control"
      v-model="searchText"
    >
    <hr>

    <TodoSimpleForm @add-todo="addTodo" />
    <div v-if="!filteredTodos.length">
      There is nothing to display.
    </div>
    <TodoList 
      :todolist="filteredTodos" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>

</template>

<script>
import { ref, computed } from 'vue';
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


    const searchText = ref('');
    const filteredTodos = computed(() => {
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        })
      }

      return todos.value;
    });
   

    return {
      todos,
      todoStyle,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      filteredTodos,
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
