<template>
    
    <div class="form-group"> 
        <label class="col-4"> {{label}} </label>
        <input
            class="col-8"
            :type="type" 
            :value="modelValue"
            @input="onInput"
        >
    </div> 
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required : true
        },
        type: {
            type: String,
            required : true
        },
        modelValue: {
            type: String,
            required : true
        }

    },
    setup(porps, { emit }) {

        const onInput = (e) => {
            emit('update:modelValue', e.target.value);
        };

        return {
            onInput
        }
    }


}
</script>

<style scoped>
.text-red {
    color: red;
}

</style>