<template>
  <div class="app">
    <div class="bg">
      <div class="login">
        <form  @submit.prevent="submit">
          <div class="user">
            <span>账号:</span> <input type="text" placeholder="账号" v-model="inputtext.name" maxlength="20">
          </div>
          <div class="user password">
            <span>密码:</span> <input type="password" placeholder="密码" v-model="inputtext.password" maxlength="20">
          </div>
          <div class="user password code_input">
            <span>验证码:</span> <input type="text"  placeholder="验证码" v-model="inputtext.code" maxlength="25">
          </div>
          <div class="random user code_input" @click="code_click">{{code}}</div>
          <input type="submit" value="登录" class="submit">
        </form>
        <!--<a href="#">忘记密码</a>-->
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: 'login',
        data() {
            return{
              inputtext:{},
              code:0
            }
        },
      methods:{
        submit(){
          if(this.inputtext.name==undefined||this.inputtext.password==undefined||this.inputtext.name==""||this.inputtext.password==""){
              alert("请输入用户名和密码在登录");
            this.code_click()
          }else if(this.inputtext.code==undefined||this.inputtext.code==""){
            alert("请输入验证码再登录");
            code_click()
          }else if(this.inputtext.code!=this.code){
            alert("验证码错误")

          }else{
            this.$axios.get('/api/manage/admin_login',{params:{name:this.inputtext.name,password:this.inputtext.password,code:this.inputtext.code}})
              .then((res)=>{
                if(res.data==""){
                  alert("用户名或者密码错误");
                  code_click()
                }else{
                  alert("登录成功");
                  this.$store.commit("changgeId",res.data[0].adminId);
                  this.$store.commit("changgeName",res.data[0].adminName);
                  this.$emit('controller')
                  this.$router.push({path:'/index'});
                }
              })
              .catch((err)=>{
                console.log(err);
              });
          }
        },
        code_click(){
          let code="";
          let arr=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          for(let i=0;i<4;i++){
            let b=parseInt(Math.random()*61);
            code+=arr[b];
          }
          this.code=code;
        }
      },
      created(){
            let code="";
            let arr=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            for(let i=0;i<4;i++){
              let a=parseInt(Math.random()*61);
              code+=arr[a];
            }
        this.code=code;
      }
    }


</script>
<style scoped>
  .user.password.code_input input{
    width: 100%;
  }
  a{
    clear: both;
    display: block;
    float: right;
    /*margin-top: 20px;*/
  }
  .app{
    width: 100%;
    height: 1000px;
    background-image: url("../../images/134534.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    position: fixed;
  }
  .bg{
    width: 50%;
    height: 500px;
    position: relative;
    margin: 100px auto;
    background-image: url("../../images/login1.png");
    background-size: 100%;
    box-shadow:1px 1px 5px 5px #e1e1e1;
  }
  .login{
    width: 350px;
    padding: 0 15px 15px;
    height: 320px;
    position: absolute;
    right: 15px;
    bottom: 10px;
    border-radius: 15px;
  }
.user{
  width: 90%;
  height: 45px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow:1px 1px 2px 2px #e1e1e1 inset  ;
}
input:focus{
  outline: none;
}
.code_input.user{
  width: 60%;
  float: left;
  border-radius: 5px;
}
  .user input{
    height: 45px;
    line-height: 45px;
    width: calc(100% - 120px);
    background:none;
    border: none;
    padding-left: 15px;

  }
  .user span{
    width: 80px;
    line-height: 40px;
    text-align: center;
    display: none;
  }
  .submit{
    width: 90%;
    text-align: center;
    padding: 10px;
    border: none;
    clear: both;
    border-radius: 5px;
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 128, 0, 0.62);
  }
  .random.code_input.user{
    height: 45px;
    width: 70px;
    background-image: url("../../images/code_bg.jpg");
    background-size: 100%;
    margin: 0 auto;
    margin-left: 7px;
    text-align: center;
    line-height: 45px;
    font-size: 20px;
    color: rgba(0,0,0,0.3);
    border-left: none;
    border-radius:0!important;
    user-select: none;

  }
</style>
