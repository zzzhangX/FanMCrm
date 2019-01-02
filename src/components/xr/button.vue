<template>
    <div class="button" @click="cccs">
        {{btntxt}}
    </div>
</template>

<script>
    export default {
        name: 'mybutton',
        data () {
            return {}
        },
        methods: {
            cccs(){
                console.log("123")
            }
        },
      props:["btntxt"],
    }
</script>
<style scoped>
    .button {
      width: 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #2aabd2;
      -webkit-box-shadow: 0.3em;
      -moz-box-shadow: 0.3em;
      box-shadow: 0 0 1px 2px #555555;
    }
</style>
