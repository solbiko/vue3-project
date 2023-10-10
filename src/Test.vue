<template>
  <h3>{{count}}</h3>
  <h3>{{doubleCountComputed}}</h3>
  <h3>{{doubleCountComputed}}</h3>
  <h3>{{doubleCountMethod()}}</h3>
  <h3>{{doubleCountMethod()}}</h3>

  <button @click="count++"> add one </button>





  <div v-if="toggle">true</div> <!-- 런타임동안 자주 바뀌지 않을 때 사용, 토글 하는데 비용 큼 -->
  <div v-else>false</div>
   <div v-show="toggle">true</div> <!-- 토글 자주할 때 사용, 초기 랜더링 비용 큼 --> 
  <div v-show="!toggle">false</div>
  <button @click="onToggle"> Toggle </button>

  <div v-bind:class="nameClass"> {{ greet }} </div> <!-- class 데이터 바인딩 -->
  <div :class="nameClass"> name : {{ name }} </div> <!-- v-bind 생략 -->
  <div class="name"> obj.name : {{ obj.name }} </div> <!-- obj 데이터 바인딩 -->

  <div> 
    <input v-bind:type="type" v-bind:value="name"> <!-- type, value 바인딩 -->
    <button class="btn btn-primary" @click="updateName" > click </button> <!-- v-on: 생략, @로 대체 -->
  </div>


  <div> <!-- 양방향 바인딩 --> 
    <input type="text" :value="name" @input="updateInputName">
  </div>
    <div>
    <input type="text" v-model="name">
    <button class="btn btn-primary" @click="onSubmit" > click </button>
  </div>


</template>

<script>
import { ref, reactive, computed } from 'vue';
export default {
  setup(){

    // let name = "Karla";
    const name = ref("Karla");
    const type = ref("number");
    const nameClass = ref('name');
    
    const obj = reactive({
      id:1,
      name:"test"
    });

    const toggle = ref(false);


    const greeting = (name) =>{
      return 'Hello, ' + name.value;
    };

    const greet = greeting(name);

    const updateName = () => {
      name.value = "Solbi";
      type.value = "text";
      console.log(name.value);
    };

    const updateName2 = () => {
      obj.name = "Solbi";
      console.log(obj.name);

    };

    const updateInputName = (e) => {
      name.value = e.target.value
    }

    const onSubmit = () => {
      console.log(name.value)
    };

   const onToggle = () =>{
      toggle.value = !toggle.value;
    }


 const count = ref(1);
    const doubleCountComputed = computed(() =>{ 
      // 인자로 받아와서 연산 불가능, reactive state 변경될때만 값 변수 저장
      // 값을 캐싱함, 한번 하면 저장하고 있음
      console.log("computed")      
      return count.value*2;
    });

    const doubleCountMethod =() => {  // 인자로 받아와서 연산 가능
      console.log("method")      
      return count.value*2;
    };


    return {
      name,
      type,
      nameClass,
      obj,
      // greeting,
      greet,
      updateName,
      updateName2,
      onSubmit,
      updateInputName,
      toggle,
      onToggle,
      count,
      doubleCountComputed,
      doubleCountMethod,
    };


  }
}
</script>

<style>
.name {
  color : pink;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  margin-top: 60px;
  font-size: 30px;
}

</style>
