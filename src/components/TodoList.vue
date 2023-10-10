<template>

     <div 
      v-for="(todo, index) in todolist" 
      :key="todo.id" 
      class="card mt-2"
    >
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
            <input
              type="checkbox" 
              class="form-check-input"
              :checked="todo.completed"
              @change="toggleTodo(index)"
            > 
            <!--------------------------
             v-model="todo.completed"

             props는 부모-> 자녀 단방향이고, 
             v-model은 양방향 바인딩이므로 수정
            --------------------------->
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
        <div> 
          <button 
            @click="deleteTodo(index)"
            class="btn btn-danger btn-sm"
          > 
            Delete
          </button>
        </div>
      </div>

    </div>
</template>

<script>
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
    const toggleTodo = (index) => {
        // context.emit('toggle-todo', index);
        emit('toggle-todo', index);
    };

      const deleteTodo = (index) => {
        // context.emit('delete-todo', index);
        emit('delete-todo', index);
    };

    return {
        toggleTodo,
        deleteTodo,
    }
  }

}
</script>

<style>

</style>