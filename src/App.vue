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
    <div style="color:red">{{error}}</div>

    <div v-if="!filteredTodos.length">
      There is nothing to display.
    </div>
    <TodoList 
      :todolist="filteredTodos" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li 
          :class="currentPage !== 1 ? '': 'disabled'"
          class="page-item"
        >
          <a @click="getTodos(currentPage-1)" class="page-link" href="#">Previous</a>
        </li>

        <li 
          v-for="page in numberOfPages"
          :key="page"
          :class="currentPage === page ? 'active' : ''"
          class="page-item"
          >
            <a @click="getTodos(page)" class="page-link" href="#">{{page}}</a>
        </li>

        <li 
          :class="currentPage !== numberOfPages ? '': 'disabled'"
          class="page-item"
        >
          <a @click="getTodos(currentPage+1)" class="page-link" href="#">Next</a>
        </li>
      </ul>
  </nav>

  </div>

</template>

<script>
import { ref, computed } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';
import axios from 'axios';

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup(){
    const todos = ref([]);
    const error = ref('');
    
    // 페이지네이션
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit)
    });

    const todoStyle = {
      textDecoration : 'line-through',
      color : 'gray' 
    }

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_page=${page}&_limit=${limit}`
        );
        todos.value = res.data;
        numberOfTodos.value = res.headers['x-total-count'];
      } catch (err) {
        error.value = "Something went wrong.";
      }
    };
    getTodos();


    // todo 추가
    const addTodo = async (todo) => {
      error.value = '';
      try {
        const res = await axios.post('http://localhost:3000/todos', {
          subject : todo.subject,
          completed: todo.completed,
        });
        todos.value.push(res.data);
      } catch (err){
        error.value = "Something went wrong.";
      }

      // axios.post('http://localhost:3000/todos', {
      //   subject : todo.subject,
      //   completed: todo.completed,
      // }).then(res => {
      //   todos.value.push(res.data);
      // }).catch(err => {
      //   error.value = "Something went wrong.";
      // });
    };


    // todo 삭제
    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete('http://localhost:3000/todos/'+id);
        todos.value.splice(index, 1);
      } catch (err){
        error.value = "Something went wrong.";
      }
    };

    // todo 체크박스 체크
    const toggleTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('http://localhost:3000/todos/'+id, {
          completed : !todos.value[index].completed
        });
        todos.value[index].completed = !todos.value[index].completed
      } catch (err){
        error.value = "Something went wrong.";
      }
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
      error,
      todoStyle,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      filteredTodos,
      
      currentPage,
      numberOfPages,
      getTodos,
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
