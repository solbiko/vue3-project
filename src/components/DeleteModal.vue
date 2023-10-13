<template>
    <Modal>
        <!-- v-slot: == # -->
        <template #title>
            Delete todo
        </template>

        <template v-slot:body>
            Are you sure you want to delete this todo?
        </template>

        <template v-slot:footer>
            <button 
                @click="onclose"
                type="button" 
                class="btn btn-secondary" 
            >Close</button>
            <button
                @click="onDelete"
                type="button" 
                class="btn btn-danger"
            >Delete</button>
        </template>
    </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue';

export default {

    components: {
        Modal,
    },

    setup(props, { emit }) {

       const onclose = () => {
            emit('close');
        };
        const onDelete = () => {
            emit('delete');
        };

        return {
            onclose,
            onDelete,
        }
    }  
}
</script>

<style>

</style>