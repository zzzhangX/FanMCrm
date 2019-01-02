<template>
  <div class="app">
    <div class="goods-header">
      <div class="goods-words">管理员</div>
      <div class="goods-query">
        查询：<input type="text" v-model="searchText" @keyup="searchAdmin" placeholder="按照姓名查询"/>
      </div>
      <div class="goods-add" data-toggle="modal" data-target="#addAdmin" >添加</div>
    </div>
    <div class="goods-content">
      <table>
        <thead>
        <tr>
          <th>管理员ID</th>
          <th>姓名</th>
          <th>密码</th>
          <th>电话</th>
          <th>邮件</th>
          <th>管理等级</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="adminArray in adminArray">
          <td>{{adminArray.adminId}}</td>
          <td>{{adminArray.adminName}}</td>
          <td>{{adminArray.adminpwd}}</td>
          <td>{{adminArray.adminphone}}</td>
          <td>{{adminArray.adminemail}}</td>
          <td>{{adminArray.adminlevel}}</td>
          <td class="operate"><el-button class="goods-edit" type="button" data-toggle="modal" data-target="#editAdmin" @click="openAdmin(adminArray.adminId)">修改</el-button></td>
          <td class="operate"><el-button class="goods-delete" type="button" @click="delAdmin(adminArray.adminId)">删除</el-button></td>
          <!--<td class="operate"><button class="goods-delete" @click="delAdmin(adminArray.adminId)">删除</button></td>-->
        </tr>
        </tbody>
      </table>
    </div>
    <div class="goods-footer">
      <button class="pre" @click="toPre">上一页</button>
      <span class="page" >{{currentPage}}/{{pageTotal}}</span>
      <button class="next" @click="toNext">下一页</button>
    </div>
    <!--模态框-->
    <div role="dialog" class="modal fade" id="addAdmin" data-index="nowIndex">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>添加管理员</h4>
          </div>
          <div class="modal-body text-center">
            <form action="" id="addForm">
              姓名：<input type="text" class="myName"><br><span v-if="flag.name">姓名不能为空</span><br>
              密码：<input type="text" class="myPwd"><br><span v-if="flag.password">密码不能为空</span><br>
              电话：<input type="text" class="myTel"><br><span v-if="flag.tel">电话不能为空</span><br>
              邮件：<input type="text" class="myEmail"><br><span v-if="flag.email">邮件不能为空</span><br>
              等级：<select name="" id="addSelect">
                      <option value="一级">一级</option>
                      <option value="二级">二级</option>
                      <option value="三级">三级</option>
                    </select>
            </form>
          </div>
          <div class="modal-footer text-right">
            <button class="btn btn-primary btn-sm" name="button" data-dismiss="modal">取消</button>
            <button class="btn btn-danger btn-sm addAdmin" name="button"  data-dismiss="modal" @click="addAdmin()">确认</button>
          </div>
        </div>
      </div>
    </div>
    <!--修改-->
    <div role="dialog" class="modal fade" id="editAdmin" data-index="nowIndex">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>修改管理员</h4>
          </div>
          <div class="modal-body text-center">
            <form action="" id="editForm">
              姓名：<input type="text" class="myName"><br><br>
              密码：<input type="text" class="myPwd"><br><br>
              电话：<input type="text" class="myTel"><br><br>
              邮件：<input type="text" class="myEmail"><br><br>
              等级：<select name="" id="editSelect">
              <option value="一级">一级</option>
              <option value="二级">二级</option>
              <option value="三级">三级</option>
            </select>
            </form>
          </div>
          <div class="modal-footer text-right">
            <button class="btn btn-primary btn-sm" name="button" data-dismiss="modal">取消</button>
            <button class="btn btn-danger btn-sm" name="button"  data-dismiss="modal" @click="editAdmin()">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'admin',
    data: function () {
      return {
        adminArray:[],
        pageTotal:"",//总页数
        currentPage:1,//当前页
        searchText:"",
        searchEditArr:[],
        flag:{
            name:false,
            password:false,
            tel:false,
            email:false
        }
      }
    },
    activated:function () {
      var that=this;
      getPageTotal(that);
      getAdmin(that)
    },
    methods: {
      toPre(){
        var that = this;
        this.currentPage--;
        if(this.currentPage<1){
          this.currentPage=1;
          alert("这是第一页");
        }
        getAdmin(that);
      },
      toNext(){
        var that = this;
        this.currentPage++;
        if(this.currentPage>this.pageTotal){
          this.currentPage=this.pageTotal;
          alert("这是最后一页");
        }
        getAdmin(that);
      },
      addAdmin(){
        let myName=$(".myName").val();
        let myPwd=$(".myPwd").val();
        let myTel=$(".myTel").val();
        let myEmail=$(".myEmail").val();
        let myLevel=$("#addSelect").val();
        if($("#addForm>.myName").val()==""){
            this.flag.name=true;
          $(".addAdmin").attr("data-dismiss","");
        }else if($("#addForm>.myPwd").val()==""){
            this.flag.name=false;
            this.flag.password=true;
          $(".addAdmin").attr("data-dismiss","");
        }else if($("#addForm>.myTel").val()==""){
            this.flag.password=false;
            this.flag.tel=true;
          $(".addAdmin").attr("data-dismiss","");
        }else if($("#addForm>.myEmail").val()==""){
            this.flag.tel=false;
            this.flag.email=true;
          $(".addAdmin").attr("data-dismiss","");
        }else{
          $(".addAdmin").attr("data-dismiss","modal");
          this.$axios.get("/api/manage/insertAdmin.do?myName="+myName+"&&myPwd="+myPwd+"&&myTel="+myTel+"&&myEmail="+myEmail+"&&myLevel="+myLevel)
            .then(function (res) {

            });
          $("#addForm>input").val("");
          this.flag.email=false;
        }
        getPageTotal(this);
        getAdmin(this);
      },
      delAdmin(myId){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$axios.get("/api/manage/delAdmin.do?myId="+myId)
          .then(function (res) {

          });
        getPageTotal(this);
        getAdmin(this);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      openAdmin(myId){
          var that=this;
        this.$axios.get("/api/manage/openAdmin.do?myId="+myId)
          .then(function (res) {
            that.searchEditArr=res.data[0];
            $("#editForm>.myName").val(res.data[0].adminName);
            $("#editForm>.myPwd").val(res.data[0].adminpwd);
            $("#editForm>.myTel").val(res.data[0].adminphone);
            $("#editForm>.myEmail").val(res.data[0].adminemail);
            $("#editForm>#editSelect").val(res.data[0].adminlevel);
          });
      },
      editAdmin(){
        this.searchEditArr.adminName=$("#editForm>.myName").val();
        this.searchEditArr.adminpwd=$("#editForm>.myPwd").val();
        this.searchEditArr.adminphone=$("#editForm>.myTel").val();
        this.searchEditArr.adminemail=$("#editForm>.myEmail").val();
        this.searchEditArr.adminlevel=$("#editForm>#editSelect").val();
        this.$axios.get("/api/manage/editAdmin.do?myId="+this.searchEditArr.adminId+"&&adminName="
          +this.searchEditArr.adminName+"&&adminpwd="+this.searchEditArr.adminpwd+"&&adminphone="
          +this.searchEditArr.adminphone+"&&adminemail="+this.searchEditArr.adminemail+"&&adminlevel="
        +this.searchEditArr.adminlevel)
          .then(function (res){

          });

        getPageTotal(this);
        getAdmin(this);
      },
      searchAdmin(){
          console.log(this.searchText);
          var that=this;
        this.$axios.get("/api/manage/searchAdmin.do?adminName="+this.searchText+"&&currentPage="+this.currentPage)
          .then(function (resp) {
            that.adminArray = resp.data;
          });
      }
    }
  }
//  算出总页数
  function getPageTotal(that) {
    that.$axios.get("/api/manage/getPageTotal.do")
      .then(function (resp) {
        that.pageTotal=resp.data;
      });
  }
//  加载admin列表
  function getAdmin(that) {
    that.$axios.get("/api/manage/getAllAdmin.do?currentPage="+that.currentPage)
      .then(function (res) {
        that.adminArray = res.data;
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
  .goods-header{
    width: 100%;
    padding: 5% 8% 5% 2%;
    /* background-color: red;*/
    color: black;
    font-size: 14px;
  }
  .goods-words{
    float: left;
  }
  .goods-query{
    float: left;
    margin-left: 10%;
  }
  .goods-query>input{
    border: 1px solid gainsboro;
    outline: none;
    width: 150px;
    border-radius: 5px;
    height: 21px;
  }
  select{
    border: 1px solid gainsboro;
    outline: none;
    width: 180px;
  }
  .goods-add{
    width: 6%;
    float: right;
    border-radius: 5px;
    background-color: #72e273;
    height: 30px;
    line-height: 30px;
    color: white;
    text-align: center;
  }
  .goods-content{
    text-align: center;
    /* background-color: red;*/
  }
  table,thead,tbody,tr{
    width: 100%;
  }
  tr{
    /*padding: 5% 5%;*/
  }
  th{
    /*padding: 2%;*/
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
  .goods-edit{
    background-color: #89B47C;
  }
  .goods-delete{
    background-color: #DC7856;
  }
  /*.operate{
    text-align: left;
  }*/
  .goods-footer{
    margin-top: 1%;
    text-align: center;
  }
  .goods-footer>button{
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
  #addForm>span{
    color: red;
    font-size: 12px;
  }
</style>
