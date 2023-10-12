<template>
    <h1> Todo Page</h1>
     <div v-if="loading">
        Loading...
    </div>
    <form 
        v-else
        @submit.prevent="onSave"
    >
        <div class="row mb-2">
            <div class="col-6">
                <div class="form-group"> 
                    <label> Subject </label>
                    <input type="text" class="form-control" v-model="todo.subject">
                </div>
            </div>
            <div class="col-6">
                <div class="form-group"> 
                    <label> Status </label>
                    <div>
                        <button
                            @click="toggleTodoStatus"
                            class="btn"
                            :class="todo.completed? 'btn-success' : 'btn-danger'"
                            type="button"
                        > 
                            {{todo.completed? 'Completed': 'InCompleted'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="todoUpdated"
        >Save</button>
        <button
            @click="moveTodoListPage" 
            class="btn btn-outline-dark ml-2"
        >Cancel</button>
    </form>

    <Toast
        v-if="showToast" 
        :message="toastMessage"
        :type="toastType"
    />
    
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
    components: {
        Toast
    },
    setup() {
        const route = useRoute();
        const router = useRouter();

        const todoId = route.params.id;
        const loading = ref(true);
        const todo = ref(null);
        const originTodo = ref(null);

        // 토스트 메시지
        const { toastMessage, toastType, showToast, triggerToast} = useToast();
      
        // 투두 정보 가져오기
        const getTodos = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                todo.value = {...res.data}; // 주소 복사X, 값 복사
                originTodo.value = {...res.data};
                loading.value = false;
            } catch (err) {
                triggerToast('Something went wrong.', 'danger');
            }
        };
        getTodos();

        // 완료 상태 변경
        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        // 리스트 페이지로 이동
        const moveTodoListPage = () => {
            router.push("/todos")
        }

        // 수정 여부X
        const todoUpdated = computed(() => {
            return _.isEqual(originTodo.value, todo.value);
        });


        // 저장
        const onSave = async () => {
            try {
                await axios.put(`http://localhost:3000/todos/${todoId}`, {
                    subject : todo.value.subject,
                    completed : todo.value.completed
                });
                triggerToast('Successfully saved!');

            } catch (err){
                triggerToast('Something went wrong.', 'danger');
            }
        }


        return {
            todo,
            loading,
            toggleTodoStatus,
            moveTodoListPage,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastType,
        }

    }
}
</script>
<style>

</style>