<template>
  <div class="container">
    <h2 class="title"> To-Do List </h2>

    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 mr-2">
          <input 
            type="text" 
            v-model="todo" 
            placeholder="type new todo"
            class="form-control"
          >
          </div>
        <div>
          <button class="btn btn-primary" type="sumbit"> Add </button>
        </div>
      </div>
      <div v-show="hasError" style="color:red;"> This field cannot be empty. </div>
    </form>

    <div v-for="todo in todos" :key="todo.id" class="card mt-2">
      <div class="card-body p-2">
        <div class="form-check">
            <input
              type="checkbox" 
              class="form-check-input"
              v-model="todo.completed"
            > 
            <label 
             class="form-check-label"
             :class="{todo_comp: todo.completed}"
            >
            <!---------------------------
            스타일 바인딩
            :style="todo.completed?  todoStyle : {}"
            ----------------------------->
              {{todo.subject}}
            </label>

            
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { ref } from 'vue';
export default {
  setup(){
    const todo = ref("");
    const todos = ref([]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration : 'line-through',
      color : 'gray' 
    }

    const onSubmit = () => {
      // e.preventDefault();
      if(todo.value ===''){
        hasError.value = true;
      }
      else {
        todos.value.push({
          id: Date.now(),
          subject : todo.value,
          completed: false,
        });
        todo.value = '';
        hasError.value = false;
      }
      
    };

    return {
      todo,
      todos,
      onSubmit,
      hasError,
      todoStyle,
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
