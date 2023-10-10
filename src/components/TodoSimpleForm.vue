<template>
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


</template>

<script>
import { ref } from 'vue';

export default{
  emits: ['add-todo'],
    setup(props, context) {
        const todo = ref("");
        const hasError = ref(false);

        const onSubmit = () => {
            if(todo.value ===''){
                hasError.value = true;
            }
            else {
                // 부모 컴포넌트로 emit
                context.emit('add-todo', {
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
            hasError,
            onSubmit
        };
    },
}
</script>

<style scoped>
</style>