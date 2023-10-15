<template>
  <Navbar />
  <div class="container">
    <router-view/>  
  </div>
   
  <Toast />

</template>

<script>
// import { ref, computed, watchEffect, watch, reactive } from 'vue';

import Toast from '@/components/Toast.vue';
import Navbar from './components/Navbar.vue';

export default {
  components:{
    Navbar,
    Toast,
  } ,
  setup(){

    // const a = reactive({
    //   b:1,
    //   c:3
    // })

    // watchEffect(() => {
      // console.log(a.b)
    // });
    // a.b=2

    // watch(() => [a.b, a.c], (current,prev)=>{
    //   console.log(current, prev)
    // });
    // a.b=3

    // const todoStyle = {
    //   textDecoration : 'line-through',
    //   color : 'gray' 
    // }

  }
}
</script>

<style>

</style>
