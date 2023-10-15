<template>
    <div class="toast-box">
        <transition-group name="fade">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                class="alert" 
                :class="`alert-${toast.type}`"
                role="alert"
            >
                {{toast.message}}
            </div>
        </transition-group>
    </div>
</template>

<script>
import { useToast } from '@/composables/toast';

export default {
    // props: {
    //     message: {
    //         type: String,
    //         required : true
    //     },
    //     type: {
    //         type : String,
    //         default: 'success'
    //     }
    // }
    setup() {
        const { toasts } = useToast();

        return {
            toasts
        }
    }
    
}
</script>

<style scoped>
.toast-box{
    position: fixed;
    top: 10px;
    right: 25px;
}

/* scoped 사용시 전역이 아닌 해당 컴포넌트에서만 적용됨 */
.fade-enter-active, 
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
}

/* .fade-enter-active, 
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from, 
.fade-leave-to {
    transform: translateX(30px);
}

.fade-enter-to,
.fade-leave-from {
    transform: translateX(0px);
} */


</style>