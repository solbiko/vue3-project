 import { ref, onUnmounted } from 'vue';

 export const useToast = () => {
    // 토스트
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastType = ref('');
    const timeout = ref(null);

    const triggerToast = (msg, tp='success') => {
        toastMessage.value = msg;
        toastType.value = tp;
        showToast.value = true;
        timeout.value = setTimeout(() => {
            showToast.value = false;
            toastMessage.value = '';
            toastType.value = '';
        }, 1500);
    };

    onUnmounted(() => {
        clearTimeout(timeout.value); 
        // 페이지 떠나면 토스트 메시지 띄울 필요X
    }); 
    
    return {
    toastMessage,
    toastType,
    showToast,
    triggerToast,
    }
 }
    