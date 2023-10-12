<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li 
            :class="currentPage !== 1 ? '': 'disabled'"
            class="page-item"
            >
            <a @click="getTodos(currentPage-1)" class="page-link" href="#">Previous</a>
            </li>

            <li 
            v-for="page in numberOfPages"
            :key="page"
            :class="currentPage === page ? 'active' : ''"
            class="page-item"
            >
            <a @click="getTodos(page)" class="page-link" href="#">{{page}}</a>
            </li>

            <li 
            :class="currentPage !== numberOfPages ? '': 'disabled'"
            class="page-item"
            >
            <a @click="getTodos(currentPage+1)" class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { ref, computed, watchEffect, watch, reactive } from 'vue';

export default {
    props: ['numberOfTodos', 'limit', 'currentPage'],
    emits: ['get-todo'],

    setup(props, {emit}){

        // watchEffect(() => {
        // console.log(currentPage.value);
        // console.log(numberOfTodos.value);
        // console.log(numberOfPages.value);
        // });

        // watch([currentPage, numberOfTodos], (currentPage, prev) => {
        // console.log(currentPage, prev);
        // });  

        const numberOfPages = computed(() => {
        return Math.ceil(props.numberOfTodos/props.limit)
        });

        const getTodos = async (page) => {
        emit('get-todo', page);
        };

        return {
        numberOfPages,
        getTodos,
        }

    }

}
</script>

<style>

</style>