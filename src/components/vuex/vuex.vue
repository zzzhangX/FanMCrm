<template>
  <div>
    <h1>vuex</h1>
    <h1>计数器：{{$store.state.count}}</h1>
    <button @click="add(5)">+</button>
    <button @click="incrementAsync(10)">异步+</button>
  </div>
</template>
<script>
  import {mapActions} from 'vuex';
  export default {
    name:"vuex",
    data () {
      return {}
    },
    methods :{
    /*  increment() {
        //===========直接操作mutations=========
        console.log(this.$store);
//        this.$store.commit("addnum")
//        this.$store.commit("addnum",10)
        //操作actions
        this.$store.dispatch('increment',10)

      },
      //===========通过actions 告诉mutations要做什么操作
      incrementAsync () {
        this.$store.dispatch("incrementAsync",5)
      },*/

      //使用mapActions之后可以简化代码,可以用对象也可以用数组
      /*用当前页面的函数名*/
      /*...mapActions([
        "increment",
        "incrementAsync"
        ]
      )*/
      ...mapActions({
        add:"increment",
        incrementAsync:"incrementAsync"
        }
       )
    }
  }
</script>
<style scoped></style>
