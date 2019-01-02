<template>
  <div class="app">
    <div class="person-content">
      <img src="../../assets/logo.png" alt="">
      <p>尊敬的<span>{{personal.adminName}}</span>，你是<span>{{personal.adminlevel}}</span>管理员，
        <br>不同的管理员有不同的操作权限，具体如下：</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'personalCenter',
    data: function () {
      return {
          myId:19,
        personal:{}
      }
    },
    methods: {},
    activated:function () {
        var that=this
      this.$axios.get("/api/manage/personal.do?myId="+this.myId)
        .then(function (resp) {
//            console.log(resp.data[0])
          that.personal=resp.data[0];
          console.log(that.personal)
        });
    }
  }
</script>

<style scoped>
  .app{
    margin-top: 4%;
    width: 100%;
    height: 500px;
    background-color: white;
    border-radius: 5px;
  }
  .person-content{
    text-align: center;
    /* background-color: red;*/
  }
  .person-content>img{
    width: 100px;
    height: 100px;
  }

</style>
