<template>
  <div v-if="toggle">true</div> <!-- 런타임동안 자주 바뀌지 않을 때 사용, 토글 하는데 비용 큼 -->
  <div v-else>false</div>
   <div v-show="toggle">true</div> <!-- 토글 자주할 때 사용, 초기 랜더링 비용 큼 --> 
  <div v-show="!toggle">false</div>
  <button @click="onToggle"> Toggle </button>

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
            {{todo.subject}}      
      </div>
    </div>

  </div>

</template>

<script>
import { ref } from 'vue';
export default {
  setup(){
    const toggle = ref(false);
    const todo = ref("");
    const todos = ref([
      {id:1, subject: "휴대폰 사기"},
      {id:2, subject: "장보기"},
    ]);
    const hasError = ref(false);


    const onSubmit = () => {
      // e.preventDefault();
      if(todo.value ===''){
        hasError.value = true;
      }
      else {
        todos.value.push({
          id: Date.now(),
          subject : todo.value
        });
        todo.value = '';
        hasError.value = false;
      }
      
    };

    const onToggle = () =>{
      toggle.value = !toggle.value;
    }

    return {
      todo,
      todos,
      toggle,
      onSubmit,
      onToggle,
      hasError,
    };

  }
}
</script>

<style>
.center {
  text-align: center;
}
.title {
  color : pink;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  margin-top: 60px;
  font-size: 30px;
}

</style>
