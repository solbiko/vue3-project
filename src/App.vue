<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <!-- <a class="navbar-brand" href="/">Karla karla</a> -->
    <router-link class="navbar-brand" to="/">Karla karla</router-link>
    <!---------------------------------------------------------
      a태그로 이동하면 새로고침하며 받았던 파일 새로 받아옴
      vue router 링크를 사용해서 이동하면 내부적으로는 a태그를 사용하지만 
      중간에 가로채서 url을 확인해서 작성한 라우터와 비교하여 컴포넌트를 넣어줌
    ---------------------------------------------------------->
      <ul class="navbar-nav me-auto mb-lg-0">
        <li class="nav-item active">
          <router-link class="nav-link active" to="/todos">Todos</router-link>
        </li>
      </ul>
    </div>
</nav>


  <router-view/>  

</template>

<script>
import { ref, computed, watchEffect, watch, reactive } from 'vue';

export default {
  
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
