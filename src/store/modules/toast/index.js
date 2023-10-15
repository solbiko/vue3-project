export default {
    namespaced: true,
    state: {
        toasts: [],
        // showToast: false,
        // toastMessage: '',
        // toastType:  '',
    },

    mutations: {
        // UPDATE_TOAST_MESSAGE (state, payload) {
        //     state.toastMessage = payload;
        // },
        // UPDATE_TOAST_TYPE (state, payload) {
        //     state.toastType = payload;
        // },
        // UPDATE_TOAST_STATUS (state, payload) {
        //     state.showToast = payload;
        // },
        // UPDATE_TOAST_TIMEOUT (state, payload) {
        //     state.timeout = payload;
        // },
        ADD_TOAST (state, payload) {
            state.toasts.push(payload);
        },
        REMOVE_TOAST (state) {
            state.toasts.shift();
        }        

    },   
    actions: {
        triggerToast ({ commit }, payload) {
            // commit('UPDATE_TOAST_MESSAGE', message);
            // commit('UPDATE_TOAST_TYPE', type);
            // commit('UPDATE_TOAST_STATUS', true);
            commit ('ADD_TOAST', {
                id: Date.now(),
                message: payload.message, 
                type: payload.type
            });

            setTimeout(() => {
                // commit('UPDATE_TOAST_MESSAGE', '');
                // commit('UPDATE_TOAST_TYPE', '');
                // commit('UPDATE_TOAST_STATUS', false);
                commit('REMOVE_TOAST');
            }, 5000);
        }
    },
    getters: { // vuex 안에서 사용하는 computed
        toastMessageWithSmile (state) {
            return state.toastMessage + " :)";
        }
    }
}