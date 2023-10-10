<template>
  
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
import { ref,reactive } from 'vue';
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
