<template>
  <div class="name"> {{ greet }} </div>
  <div class="name"> {{ name }} </div>
    <div class="name"> {{ obj.name }} </div>

  <button 
    class="btn btn-primary"
    v-on:click="updateName2"
  >
    click
  </button>

</template>

<script>
import { ref,reactive } from 'vue';
export default {
  setup(){

    // let name = "Karla";
    const name = ref("Karla");
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
      console.log(name);
    };

    const updateName2 = () => {
      obj.name = "Solbi";
      console.log(obj.name);

    };

    return {
      name,
      obj,
      // greeting,
      greet,
      updateName,
      updateName2
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
