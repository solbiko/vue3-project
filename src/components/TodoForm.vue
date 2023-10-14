<template>
   <div v-if="loading">
        Loading...
    </div>
    <form 
        v-else
        @submit.prevent="onSave"
    >
        <div class="row mb-2">
            <div :class="editing ? 'col-6' : 'col-12'">
                <Input 
                    label="Subject"
                    v-model:subject="todo.subject"
                    :error="subjectError"
                />
                <!--------------------------------------
                    :subject="todo.subject"
                    @update-subject="updateTodoSubject"
                    컴포넌트에 v-model 사용하면서 변경 
                --------------------------------------->

            </div>
            <div v-if="editing" class="col-6">
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
              <div class="col-12">
                <div class="form-group"> 
                    <label> Body </label>
                    <textarea v-model="todo.body" id="" row="30" class="form-control" />
                </div>
            </div>
        </div>
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="todoUpdated"
        >{{editing? 'Update' : 'Create'}}</button>
        <button
            @click="moveTodoListPage" 
            class="btn btn-outline-dark ml-2"
        >Cancel</button>
    </form>

    <transition name="fade">
    <Toast
        v-if="showToast" 
        :message="toastMessage"
        :type="toastType"
    />
    </transition>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import Input from '@/components/SubjectInput.vue';

export default {
    components: {
        Toast,
        Input
    },
    props: {
        editing: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();

        const todoId = route.params.id;
        const loading = ref(false);
        const todo = ref({
            subject: '',
            completed: false,
            body: ''
        });
        const subjectError = ref('');
        const originTodo = ref(null);

        // 토스트 메시지
        const { toastMessage, toastType, showToast, triggerToast} = useToast();
        
        // 컴포넌트에 v-model 사용하면서 삭제
        // const updateTodoSubject= (newValue) => {
        //     todo.value.subject = newValue;
        // }


        // 투두 정보 가져오기
        const getTodos = async () => {
            loading.value = true;
            try {
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                todo.value = {...res.data}; // 주소 복사X, 값 복사
                originTodo.value = {...res.data};
                loading.value = false;
            } catch (err) {
                loading.value = false;
                triggerToast('Something went wrong.', 'danger');
            }
        };

        if (props.editing){
            getTodos();
        }

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
            subjectError.value = '';
            if(!todo.value.subject){
                subjectError.value = "Subject is required";
                return;
            }

            try {
                let res;
                const data =  {
                    subject : todo.value.subject,
                    completed : todo.value.completed,
                    body : todo.value.body
                };
                if (props.editing){ // 수정
                    res = await axios.put(`http://localhost:3000/todos/${todoId}`, data);
                } else { //생성
                    res = await axios.post('http://localhost:3000/todos/', data);
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                originTodo.value = {...res.data}; 
                triggerToast('Successfully ' + (props.editing? 'Updated!':'Created!'));
            } catch (err){
                triggerToast('Something went wrong.', 'danger');
            }
        }

        return {
            todo,
            loading,
            toggleTodoStatus,
            moveTodoListPage,
            subjectError,
            onSave,
            todoUpdated,
            showToast,
            toastMessage,
            toastType,
        }

    }
}
</script>

<style scoped>
/* scoped 사용시 전역이 아닌 해당 컴포넌트에서만 적용됨 */


/* .fade-enter-active, 
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from, 
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
} */

.fade-enter-active, 
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from, 
.fade-leave-to {
    /* opacity: 0; */
    transform: translateX(30px);
}

.fade-enter-to,
.fade-leave-from {
    /* opacity: 1; */
    transform: translateX(0px);
}

</style>