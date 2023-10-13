<template>
  <List 
    :items="todolist"
  >
    <template #default="{item, index}">
      <div 
        @click="moveToPage(item.id)" 
        class="card-body p-2 d-flex align-items-center"
        style="cursor:pointer;"
      >
        <div class=" flex-grow-1">
            <input
              type="checkbox" 
              class="ml-2 mr-2"
              :checked="item.completed"
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
            :class="{todo_comp: item.completed}"
            >
            <!---------------------------
            스타일 바인딩
            :style="todo.completed?  todoStyle : {}"
            ----------------------------->
              {{item.subject}}
            </span>            
        </div>
        <div> 
          <button 
            @click.stop="openModal(item.id)"
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
    </template>
  </List>

    <teleport to="#modal"> 
      <Modal 
        v-if="showModal"
        @close="closeModal"
        @delete="deleteTodo"
      />
    </teleport>
    <!-----------------------------------
      teleport
      컴포넌트 템플릿의 일부를 
      해당 컴포넌트의 DOM 계층 외부의 DOM 노드로
      이동할 수 있게 해주는 빌트인 컴포넌트
     ----------------------------------->

</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import List from '@/components/List.vue';

export default {
 components: {
    Modal,
    List,
  },
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
  setup(props, { emit} ){ // context대신 {emit}으로 바로 사용

    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);

    // 투두 체크
    const toggleTodo = (index, event) => {
        // context.emit('toggle-todo', index);
        console.log(event);
        emit('toggle-todo', index, event.target.checked);
    };

    // 모달
    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

     const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    // 투두 삭제
    const deleteTodo = () => {
      // context.emit('delete-todo', index);
      emit('delete-todo', todoDeleteId.value);
      closeModal();

    };

    // 투두 상세 페이지 이동
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
        showModal,
        openModal,
        closeModal,
    }
  }

}
</script>

<style>

</style>