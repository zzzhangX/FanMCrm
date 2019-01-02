<template>
  <div class="app">
    <div class="users-header">
      <div class="users-words">用户</div>
      <div class="users-query">
        根据用户名查询：
        <input type="text" v-model="message" @keyup="change"/>
      </div>
      <button type="button" class="btn users-add" data-toggle="modal" data-target="#myModalAdd">添加</button>
    </div>
    <div class="users-content">
      <table>
        <thead>
        <tr>
          <th>用户ID</th>
          <th>用户姓名</th>
          <th>电话</th>
          <th>邮箱</th>
          <th>收货信息</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="usersArray in usersArray">
          <td>{{usersArray.userId}}</td>
          <td>{{usersArray.userName}}</td>
          <td>{{usersArray.phone}}</td>
          <td>{{usersArray.email}}</td>
          <td>
            <router-link :to="{path:'/usersAddress',query:{id:usersArray.userId}}" tag="td">
              <button class="users-more">详情</button>
            </router-link>
          </td>
          <td class="operate">
            <button class="users-edit btn" data-toggle="modal" data-target="#myModalUpdate" @click="updateClick(usersArray.userId)">修改</button>
          </td>
          <td class="operate">
            <button class="users-delete" @click="deleteOneUser(usersArray.userId)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="users-footer">
      <button class="pre" @click="toPre">上一页</button>
      <span class="page" >{{currentPage}}/{{pageTotal}}</span>
      <button class="next" @click="toNext">下一页</button>
    </div>

    <!--添加的模态框-->
    <div class="modal fade" id="myModalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabelAdd">添加用户</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form action="" id="addUserForm">
              用 户 &nbsp;名&nbsp;：
              <input type="text" name="username" id="username"/>
              <br>
              用户密码：
              <input type="password" name="pass" id="pass"/>
              <br>
              确认密码：
              <input type="password" name="pwd" id="pwd"/>
              <br>
              电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：
              <input type="text" name="phone" id="phone"/>
              <br>
              邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：
              <input type="email" name="email" id="email"/>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addUser">添加</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!--修改的模态框-->
    <div class="modal fade" id="myModalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabelUpdate">修改用户</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form action="" id="updateForm">
              用 户 &nbsp;Id&nbsp;：
              <input type="text" name="username" id="userId1" disabled="disabled"/>
              <br>
              用 户 &nbsp;名&nbsp;：
              <input type="text" name="username" id="username1"/>
              <br>
              用户密码：
              <input type="password" name="pass" id="pass1" disabled="disabled"/>
              <br>
              确认密码：
              <input type="password" name="pwd" id="pwd1"/>
              <br>
              电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：
              <input type="text" name="phone" id="phone1"/>
              <br>
              邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：
              <input type="email" name="email" id="email1"/>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateUser">保存</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'users',
    data: function () {
      return {
        usersArray:[],
        message:"",
        pageCount:7,//一页多少条
        pageTotal:"",//总页数
        currentPage:1,//当前页
        updateUsersArray:[]
      }
    },
    activated:function () {
      var that = this;
      var textinfo=this.message.replace(/\s/g,"");
      this.$axios.get("/api/manage/getAllUserCountByName.do?username="+textinfo+"&&pageCount="+this.pageCount)
        .then(resp=>{
          that.pageTotal=resp.data;
        });
      showUsersByName(that);
    },
    methods: {
      change(){
        var that = this;
        this.currentPage=1;
        var textinfo=this.message.replace(/\s/g,"");
        this.$axios.get("/api/manage/getAllUserCountByName.do?username="+textinfo+"&&pageCount="+this.pageCount)
          .then(resp=>{
            that.pageTotal=resp.data;
          });
        showUsersByName(that);
      },
      toPre(){
        var that = this;
        this.currentPage--;
          if(this.currentPage<1){
            this.currentPage=1;
              alert("这是第一页");
          }
          showUsersByName(that);
      },
      toNext(){
        var that = this;
        this.currentPage++;
        if(this.currentPage>this.pageTotal){
          this.currentPage=this.pageTotal;
          alert("这是最后一页");
        }
          showUsersByName(that);
      },
      deleteOneUser(obj){
        var that = this;
        var textinfo=this.message.replace(/\s/g,"");
        if(confirm("是否删除?")){
          this.$axios.get("/api/manage/deleteOneUser.do?userId="+obj)
            .then(resp=>{
              if(resp.data.affectedRows>0){
                alert("删除成功！");
                that.$axios.get("/api/manage/getAllUserCountByName.do?username="+textinfo+"&&pageCount="+that.pageCount)
                  .then(resp=>{
                    that.pageTotal=resp.data;
                    if(that.pageTotal<that.currentPage){
                      that.currentPage=that.currentPage-1;
                    }
                    showUsersByName(that);
                  });
              }else{
                alert("删除失败！")
              }
            });
        }
      },
      addUser(){
        var that=this;
        var data=$("#addUserForm").serialize();
        var textinfo=this.message.replace(/\s/g,"");
        if($("#username").val()==""||$("#pass").val()==""||$("#pwd").val()==""||$("#phone").val()==""||$("#email").val()==""){
            confirm("字段不能为空！");
        }else{
            if($("#pass").val()!=$("#pwd").val()){
                confirm("前后密码不一致请重新输入密码")
                $("#pass").val("");
                $("#pwd").val("");
            }else{
                if($("#email").val().match(/^[a-zA-Z 0-9]{1,10}@[a-zA-Z0-9]{1,}.[a-zA-Z0-9]{2,}$/)){
                  this.$axios.get("/api/manage/addNewUser.do?"+data)
                    .then(resp=>{
                      $('#myModalAdd').modal('hide');
                      if(resp.data.affectedRows>0){
                        confirm("添加成功！");
                        that.$axios.get("/api/manage/getAllUserCountByName.do?username="+textinfo+"&&pageCount="+that.pageCount)
                          .then(resp=>{
                            that.pageTotal=resp.data;
                          });
                        showUsersByName(that);
                        $("#addUserForm>input").val("");
                      }
                    });
                }else{
                    confirm("邮箱请用合格的格式！例如：239861112@qq.com");
                }
            }
        }
      },
      updateClick(obj){
        this.$axios.get("/api/manage/selectOneUser.do?userId=" + obj)
          .then(resp => {
            var data=resp.data;
            $("#userId1").val(data[0].userId);
            $("#username1").val(data[0].userName);
            $("#pass1").val(data[0].userPwd);
            $("#phone1").val(data[0].phone);
            $("#email1").val(data[0].email);
          });
      },
      updateUser(){
        var that=this;
        var data=$("#updateForm").serialize();
        var textinfo=this.message.replace(/\s/g,"");
        if($("#username1").val()==""||$("#pass1").val()==""||$("#pwd1").val()==""||$("#phone1").val()==""||$("#email1").val()==""){
          confirm("字段不能为空！");
        }else{
          if($("#pass1").val()!=$("#pwd1").val()){
            confirm("前后密码不一致请重新输入密码")
            $("#pass1").val("");
            $("#pwd1").val("");
          }else{
            if($("#email1").val().match(/^[a-zA-Z 0-9]{1,10}@[a-zA-Z0-9]{1,}.[a-zA-Z0-9]{2,}$/)){
              $('#myModalUpdate').modal('hide');
              this.$axios.get("/api/manage/updateUser.do?"+data+"&userId="+$("#userId1").val())
                .then(resp=>{
                  if(resp.data.affectedRows>0){
                    that.$axios.get("/api/manage/getAllUserCountByName.do?username="+textinfo+"&&pageCount="+this.pageCount)
                      .then(resp=>{
                        that.pageTotal=resp.data;
                      });
                    showUsersByName(that);
                    $("#pwd1").val("");
                    confirm("修改成功！");
                  }
                });
            }else{
              confirm("邮箱请用合格的格式！例如：239861112@qq.com");
            }
          }
        }
      }
    },
  }
  function showUsersByName(that) {
    var textinfo=that.message.replace(/\s/g,"");
    that.$axios.get("/api/manage/getOneUsersByName.do",{params:{username:textinfo,currentPage:that.currentPage,pageCount:that.pageCount}})
      .then(resp=>{
        that.usersArray = resp.data;
        for (var i=0;i<that.usersArray.length;i++){
          if (that.usersArray[i].phone==null){
            that.usersArray[i].phone="无";
          }
          if (that.usersArray[i].email==null){
            that.usersArray[i].email="无";
          }
        }
      });
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
  .users-header{
    width: 100%;
    padding: 5% 8% 5% 2%;
    /* background-color: red;*/
    color: black;
    font-size: 14px;
  }
  .users-words{
    float: left;
  }
  .users-query{
    float: left;
    margin-left: 10%;
  }
  .users-query>input{
    border: 1px solid gainsboro;
    outline: none;
    width: 150px;
    border-radius: 5px;
    height: 21px;
  }
  .users-add{
    width: 6%;
    float: right;
    border-radius: 3px;
    background-color: #dde276;
    height: 30px;
    color: white;
  }
  .btn{
    font-size: 12px;
  }
  .users-content{
    text-align: center;
  }
  table,thead,tbody,tr{
    width: 100%;
  }
  th{
    font-size: 13px;
    font-weight: normal;
  }
  td{
    font-size: 12px;
    width: 2%;
    height: 47px;
  }
  tbody tr:nth-child(odd){
    background-color: #E7E9BE;
  }
  td>img{
    /* width: 100%;*/
    height: 40px;
  }
  td>button{
    border: none;
    color: white;
    padding: 4% 12%;
    border-radius: 2px;
    margin-left: 5px;
  }
  .users-more{
    background-color: #edc581;
  }
  .users-edit{
    background-color: #89B47C;
  }
  .users-delete{
    background-color: #DC7856;
  }
  .users-footer{
    margin-top: 1%;
    text-align: center;
  }
  .users-footer>button{
    border: none;
    outline: none;
    border-radius: 5px;
    color: white;
    height: 25px;
    font-size: 12px;
    width: 5%;
    /*padding: 0 1%;*/
    background-color: #DDE276;
  }

  /*添加模态框*/
  .modal-body{
    margin-left: 10%;
  }
  #myModalAdd input,#myModalUpdate input{
    margin-top: 2%;
  }
</style>
