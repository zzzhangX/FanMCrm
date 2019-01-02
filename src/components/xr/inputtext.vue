<template>
    <div class="inputtext">
      账号: <input type="text" placeholder="请输入账号/邮箱"><span v-if="iserr">{{errtxt}}</span>
    </div>
</template>

<script>
    export default {
        name: 'myinputtext',
        data () {
            return {}
        },
        methods: {},
      props:["errtxt","iserr"]
    }
</script>
<style scoped>
  .inputtext{
    width: 300px;
    height: 60px;
    line-height: 60px;
    /*background-color: red;*/

    margin-top: 10px;

  }
  .inputtext input{
    height: 50px;
    line-height: 50px;
  }
</style>
