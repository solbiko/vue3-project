<template>
  <h2>Home Page</h2>

  <form  @submit.prevent="onSubmit">
    <Input label="Email address" type="email" v-model="email" />
    <Input label="Password" type="password" v-model="password" />
    <!---------------------------------------------------------------
      여러 개를 바인딩 하는 경우 v-model:[name]=""
      한 개만 바인딩 하는 경우 v-model=""로 생략하고 컴포넌트 props moedelValue
    ---------------------------------------------------------------->
    <button 
      type="submit" 
      class="btn btn-primary"
      >Submit</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import Input from '@/components/Input.vue';

export default {
  components: {
    Input
  },

  setup() {
    const email = ref('');
    const password = ref('');

    const onSubmit = () => {
      console.log();
      console.log(email.value, password.value);
    };

    return {
      email,
      password,
      onSubmit
    }
  }


}
</script>

<style>

</style>