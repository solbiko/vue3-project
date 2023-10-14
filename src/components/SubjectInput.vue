<template>
    <div class="form-group"> 
        <label> Subject </label>
        <input 
            type="text" 
            class="form-control" 
            :value="subject"
            @input="onInput"
        >
        <div v-if="error" class="text-red">
            {{error}}
        </div> 
    </div> 
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required : true
        },
        error: {
            type: String,
            required : true
        },
        subject: {
            type: String,
            required : true
        }

    },
    setup(porps, { emit }) {

        const onInput = (e) => {
            /* 
                emit('update-subject', e.target.value);
                컴포넌트에 v-model 사용하면서 변경 
                :으로 변경
                update:[porps이름]
            */
            emit('update:subject', e.target.value);


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