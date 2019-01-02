<template>
  <div id="app">
    <myNav v-if="ifShow"></myNav>
    <mainContent v-if="ifShow" @out="out"></mainContent>
    <myLogin v-if="ifLogin" @controller="controller"></myLogin>

  </div>
</template>

<script>
  import myNav from "./components/nav/nav.vue";
  import mainContent from "./components/maincontent/maincontent.vue";
  import myLogin from "./components/xr/login.vue";
  export default {
    name: 'App',
    components:{
      myNav:myNav,
      mainContent:mainContent,
      myLogin:myLogin
    },
    data(){
        return{
          ifShow:true,
          ifLogin:true
        }
    },
    methods:{
      controller() {
        this.ifLogin=false;
        this.ifShow=true
      },
      out(){
        this.ifLogin=true;
        this.ifShow=true
      }
    },

  }
</script>

<style>
  @import "assets/animate.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  *{
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration: none;
    color: gray;
  }
</style>
