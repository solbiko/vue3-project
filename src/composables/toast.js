 import { ref, computed, onUnmounted } from 'vue';
 import { useStore } from 'vuex';

 export const useToast = () => {
    
    const store = useStore();
    const toasts = computed(() => store.state.toast.toasts);

    // const showToast = computed(() => store.state.toast.showToast);
    // const toastMessage = computed(() => store.getters['toast/toastMessageWithSmile']);
    // const toastType = computed(() => store.state.toast.toastType);

    const triggerToast = (msg, tp='success') => {
        store.dispatch('toast/triggerToast',msg, tp);
    };

    // onUnmounted(() => {
    //     clearTimeout(timeout.value); 
    //     // 페이지 떠나면 토스트 메시지 띄울 필요X
    // }); 
    
    return {
    // toastMessage,
    // toastType,
    // showToast,
    toasts,
    triggerToast,
    }
 }