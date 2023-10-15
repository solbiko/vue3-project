<template>
  <div class="d-flex justify-content-between mb-1"> 
  <h2 class="title"> To-Do List </h2>
  <button 
    @click="moveToCreatePage"
    class="btn btn-primary"
  >Create Todo</button>
  </div>

  <input 
    type="text" 
    placeholder="search"
    class="form-control"
    v-model="searchText"
    @keyup.enter="searchTodo"
  >
  <hr>

  <!-- <TodoSimpleForm @add-todo="addTodo" /> -->

  <div style="color:red">{{error}}</div>
  <div v-if="!todos.length"> There is nothing to display. </div>

  <TodoList
    :todolist="todos" 
    @toggle-todo="toggleTodo"
    @delete-todo="deleteTodo"
  />
  <hr>

  
  <pagenation
  :numberOfTodos="numberOfTodos"
  :limit="limit" 
  :currentPage="currentPage"
  @get-todo="getTodos"
  >
  </pagenation>


</template>

<script>
import { ref, computed, watchEffect, watch, reactive } from 'vue';
// import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import Pagenation from '@/components/Pagination.vue';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';

import axios from '@/axios';

export default {
  components: {
    // TodoSimpleForm,
    TodoList,
    Pagenation,
  },
  setup(){

    const router = useRouter();

    const todos = ref([]);
    const error = ref('');
    
    // 페이지네이션
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
 
    // 검색
    const searchText = ref('');

    // 토스트메시지
    const { toastMessage, toastType, showToast, triggerToast} = useToast();

   
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        todos.value = res.data;
        numberOfTodos.value = res.headers['x-total-count'];
      } catch (err) {
        // error.value = "Something went wrong.";
        triggerToast('Something went wrong.', 'danger');
      }
    };
    getTodos();


    // todo 추가
    const addTodo = async (todo) => {
      error.value = '';
      try {
        const res = await axios.post('todos', {
          subject : todo.subject,
          completed: todo.completed,
        });
        // todos.value.push(res.data);
        getTodos(1);
      } catch (err){
        // error.value = "Something went wrong.";
        triggerToast('Something went wrong.', 'danger');
      }
    };


    // todo 삭제
    const deleteTodo = async (id) => {
      // error.value = '';
      try {
        await axios.delete('todos/'+id);
        // todos.value.splice(index, 1);
        getTodos(1);
      } catch (err){
        // error.value = "Something went wrong.";
        triggerToast('Something went wrong.', 'danger');

      }
    };

    // todo 체크박스 체크
    const toggleTodo = async (index, checked) => {
      console.log(checked)
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch('todos/'+id, {
          completed : checked
        });
        todos.value[index].completed = checked;
      } catch (err){
        // error.value = "Something went wrong.";
        triggerToast('Something went wrong.', 'danger');

      }
    };

    // 검색
    // const filteredTodos = computed(() => {
    //   if(searchText.value){
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     })
    //   }

    //   return todos.value;
    // });

    let timeout = null;
    const searchTodo = () => { // enter 입력 시 바로 조회
      clearTimeout(timeout);
      getTodos(1);
    };
    watch(searchText, () =>{ 
      clearTimeout(timeout);  // 2초 되기전에 또 요청들어오면 앞요청 취소
      timeout = setTimeout(() => { // 문자열 바뀔때마다 검색하므로 2초 delay 줌
            getTodos(1); // 검색 1페이지 조회
      }, 2000);
    });

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',
      })
    }
      
    return {
      todos,
      error,
      deleteTodo,
      addTodo,
      toggleTodo,
      searchText,
      // filteredTodos,
      currentPage,
      numberOfTodos,
      limit,
      getTodos,
      searchTodo, 
      showToast,
      toastMessage,
      toastType,
      moveToCreatePage,
    };

  }
}
</script>

<style>
.title {
  color : pink;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.todo_comp {
  color : gray;
  text-decoration: line-through;
}
</style>