<template>

     <div 
      v-for="(todo, index) in todolist" 
      :key="todo.id" 
      class="card mt-2"
    >
      <div 
        @click="moveToPage(todo.id)" 
        class="card-body p-2 d-flex align-items-center"
        style="cursor:pointer;"
      >
        <div class=" flex-grow-1">
            <input
              type="checkbox" 
              class="ml-2 mr-2"
              :checked="todo.completed"
              @change="toggleTodo(index, $event)"
              @click.stop
            > 
            <!--------------------------
             v-model="todo.completed"

             props는 부모-> 자녀 단방향이고, 
             v-model은 양방향 바인딩이므로 수정
            --------------------------->
            <span 
             class="form-check-label"
             :class="{todo_comp: todo.completed}"
            >
            <!---------------------------
            스타일 바인딩
            :style="todo.completed?  todoStyle : {}"
            ----------------------------->
              {{todo.subject}}
            </span>            
        </div>
        <div> 
          <button 
            @click.stop="deleteTodo(index)"
            class="btn btn-danger btn-sm"
          > 
          <!-- 
            @click.stop
            이벤트 버블링 :이 요소에 할당된 핸들러가 동작하고,
            이어서 부모 요소의 핸들러가 동작하고 최상단의 부모 요소를 만날 때까지 
            반복되면서 핸들러가 동작하는 현상

            event.stopPropagation() 을 사용
          -->
            Delete
          </button>
        </div>
      </div>

    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  // props: ['todolist']
  props: {
      todolist : {
          type: Array, // Array 타입으로만 받음
          // String, Number, Boolean, Array, Object, Function, Promise
          required: true
      }
  },
  emits: ['toggle-todo', 'delete-todo'], 

  // setup(props, context){
  setup(props, {emit}){ // context대신 {emit}으로 바로 사용

    const router = useRouter();
    const toggleTodo = (index, event) => {
        // context.emit('toggle-todo', index);
        console.log(event);
        emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = (index) => {
      // context.emit('delete-todo', index);
      emit('delete-todo', index);
    };

    const moveToPage = (todoId) => {
      // router.push('/todo/'+todoId);
      router.push({
        name : "Todo",
        params : {
          id : todoId,
        }
      });

    };
    return {
        toggleTodo,
        deleteTodo,
        moveToPage,
    }
  }

}
</script>

<style>

</style>