<template>
    <div id="app">
      <div class="header">
        <div class="words"><span>长生于野</span>安于室</div>
        <!--<keep-alive>-->
          <div class="personal">
            <div class="personalName">
              <!--<img src="../../assets/logo.png" alt="">-->
              <span>{{$store.state.myName}}</span>
            </div>
            <div class="operation">
              <p data-toggle="modal" data-target="#detail" @click="openAdmin()">个人信息</p>
              <p data-toggle="modal" data-target="#modifyPwd">修改密码</p>
              <p @click="logout()">注销</p>
            </div>
          </div>
        <!--</keep-alive>-->
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <div class="footer">
        <span>地址：成都市高新区云华路333号</span>
        <span>电话：18080808880</span>
        <span>Copyright © 2017.Company name All rights reserved</span>
      </div>
      <!--个人信息-->
      <div role="dialog" class="modal fade" id="detail" data-index="nowIndex">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4>修改个人信息</h4>
            </div>
            <div class="modal-body text-center">
              <form action="" id="editForm">
                姓名：<input type="text" class="myName"><br><br>
                电话：<input type="text" class="myTel"><br><br>
                邮件：<input type="text" class="myEmail"><br><br>
              </form>
            </div>
            <div class="modal-footer text-right">
              <button class="btn btn-primary btn-sm" name="button" data-dismiss="modal">取消</button>
              <button class="btn btn-danger btn-sm" name="button"  data-dismiss="modal" @click="editAdmin()">确认</button>
            </div>
          </div>
        </div>
      </div>
      <!--修改密码-->
      <div role="dialog" class="modal fade" id="modifyPwd" data-index="nowIndex">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4>修改密码</h4>
            </div>
            <div class="modal-body text-center">
              <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="pass">
                  <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" >
                  <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off" class="myInput"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="modal-footer text-right">
              <button class="btn btn-primary btn-sm" name="button" data-dismiss="modal">取消</button>
              <button class="btn btn-danger btn-sm editPwd" name="button"  data-dismiss="modal" @click="editPwd('ruleForm2')">确认</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'maincontent',
        data: function () {
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return {
            personal:this.$store.state.myName,
            ruleForm2: {
              pass: '',
              checkPass: '',
              age: ''
            },
            rules2: {
              pass: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ],
            }
          };
        },
        methods: {
          openAdmin(){
            var that=this;
//            console.log(this)
//            console.log(this.personal.adminId)
            this.$axios.get("/api/manage/openAdmin.do?myId="+this.$store.state.myId)
              .then(function (res) {
                $("#editForm>.myName").val(res.data[0].adminName);
                $("#editForm>.myTel").val(res.data[0].adminphone);
                $("#editForm>.myEmail").val(res.data[0].adminemail);
              });
          },
          editAdmin(s){
//            this.personal.adminName=$("#editForm>.myName").val();
//            this.personal.adminphone=$("#editForm>.myTel").val();
//            this.personal.adminemail=$("#editForm>.myEmail").val();
//            console.log(this.personal.adminName)
//            console.log(this)
            this.$axios.get("/api/manage/personalEdit.do?myId="+this.$store.state.myId+"&&myName="+$("#editForm>.myName").val()+"&&myTel="+$("#editForm>.myTel").val()+"&&myEmail="+$("#editForm>.myEmail").val())
              .then(function (res){

              });
//            console.log($("#editForm>.myName").val())
            getPersonal(this);
          },
          editPwd(formName){
//            console.log( this.$store.state.myId)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  $(".editPwd").attr("data-dismiss","modal");
                  let newPwd=$(".myInput")[0].children[0].value;
                  this.$axios.get("/api/manage/editPwd.do?myId="+this.$store.state.myId+"&&newPwd="+newPwd)
                    .then(function (res) {
                    });
//            返回重新登录
                  this.$store.state.myId=0;
                  this.$router.push({path:'/'});
                  this.$emit("out")
                } else {
                  $(".editPwd").removeAttr("data-dismiss");
                  return false;
                }
              });
          },
          logout(){

            this.$store.state.myId=0;
            this.$router.push({path:'/'})
            this.$emit("out")

            $(".nav>ul>li>div").css({
              "background-color": "white",
            }).parent().css({
              "height":"50px"
            });
            $(".nav>ul>li>ul>li").css({
              "background":"white"
            })
          }
        },
      created:function () {
        var that=this;
//        getPersonal(that)
        console.log(this.personal)
      }
    }
    function getPersonal(that) {
      var myId=that.$store.state.myId;
      if(myId==0){
          that.personal={
            adminName:"未登录"
          }
      }else {
        that.$axios.get("/api/manage/personal.do?myId="+myId)
          .then(function (resp) {
            that.personal=resp.data[0];
//            console.log("11")
          });
        return false
      }
    }
</script>

<style scoped>
  /*router-view{
    width: 100px;
    height: 100px;
    background-color: green;
  }*/
  #app{
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    background-color: #F4F3EF;
    padding: 0 3% 1% 3%;
    /*background-color: red;*/
  }
  a{
    text-decoration: none;
    color: gray;
  }
  .header{
    margin-top: 2px;
    width: 100%;
    color: gray;
    height: 100px;
    padding-bottom: 1%;
    border-bottom: 1px solid gray;
  }
  .words{
    padding-top: 4%;
    text-align: center;
    vertical-align: middle;
  }
  .words>span::after{
    content: "\B7";
    display: inline-block;
    padding: 0 1%;
  }
  .personal{
    text-align: right;
    float: right;
  }
  .personalName>img{
    width: 50px;
    height: 50px;
  }
  .operation{
    margin-top: 15px;
    text-align: center;
    font-size: 13px;
    line-height: 10px;
    display: none;
  }
  .personal:hover .operation{
    cursor: pointer;
    display: block;
  }
  .footer{
    color: gray;
    margin-top: 2%;
    font-size: 12px;
  }
  .footer>span:nth-child(1)~span{
    margin-left: 21%;
  }
</style>
