<template>
  <div class="app">
    <div class="dept-header">
      <div class="dept-words">员工</div>
      <div class="dept-query">查询：<input type="text" v-model="message" @keyup="change"/> </div>
      <button class="dept-add btn" data-toggle="modal" data-target="#myModalAdd">添加</button>
    </div>
    <div class="dept-content">
      <table>
        <thead>
        <tr>
          <th>员工编号</th>
          <th>员工名字</th>
          <th>电话</th>
          <th>入职时间</th>
          <th>所属部门</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="employeeArray in employeeArray">
          <td>{{employeeArray.id}}</td>
          <td>{{employeeArray.employeeName}}</td>
          <td>{{employeeArray.phone}}</td>
          <td>{{employeeArray.hiredate}}</td>
          <td>{{employeeArray.dept}}</td>
          <td class="operate"><button class="dept-edit" @click="updateClick(employeeArray.id)" data-toggle="modal" data-target="#myModalUpdate">修改</button></td>
          <td class="operate"><button class="dept-delete" @click="deleteOneEmp(employeeArray.id)">删除</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="dept-footer">
      <button class="pre" @click="toPre">上一页</button>
      <span>{{currentPage}}/{{pageTotal}}</span>
      <button class="next" @click="toNext">下一页</button>
    </div>

    <!--添加的模态框-->
    <div class="modal fade" id="myModalAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabelAdd">添加员工</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form action="" id="addEmpForm">
              员 &nbsp;工 &nbsp;名&nbsp;：
              <el-input prop="input1" v-model="addEmpForm.input1" name="empname" id="empname" placeholder="员工名"></el-input>
              <br>
              电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：
              <el-input prop="input2" v-model="addEmpForm.input2" name="phone" id="phone" placeholder="电话"></el-input>
              <br>
              <br>
              入职时间：
              <el-date-picker prop="value1" v-model="addEmpForm.value1" type="date" placeholder="选择日期" name="dateValue"></el-date-picker>
              <br>
              <br>
              所属部门：
              <el-select prop="value" v-model="addEmpForm.value"  placeholder="请选择" name="deptName">
                <el-option v-for="item in deptArray" :key="item.id" :label="item.dept_name" :value="item.id"></el-option>
              </el-select>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addEmp('addEmpForm')">添加</button>
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
            <h4 class="modal-title" id="myModalLabelUpdate">修改员工</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form action="" id="updateForm">
              员 &nbsp;工 &nbsp;ID&nbsp;：
              <el-input v-model="input1" name="empid1" id="empid1" placeholder="员工ID"></el-input>
              <br>
              员 &nbsp;工 &nbsp;名&nbsp;：
              <el-input v-model="input2" name="empname1" id="empname1" placeholder="员工名"></el-input>
              <br>
              电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：
              <el-input v-model="input3" name="phone1" id="phone1"  placeholder="电话"></el-input>
              <br>
              <br>
              入职时间：
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" name="dateValue1" id="dateValue1"></el-date-picker>
              <br>
              <br>
              所属部门：
              <el-select v-model="value"  placeholder="请选择" name="deptName1" id="deptName1">
                <el-option v-for="item in deptArray" :key="item.id" :label="item.dept_name" :value="item.id"></el-option>
              </el-select>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateEmp">保存</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'employee',
    data: function () {
      return {
        deptArray:[],
        employeeArray:[],
        message:"",
        pageCount:5,//一页多少条
        pageTotal:"",//总页数
        currentPage:1,//当前页
        value:"" ,
        value1:"",
        input1:"",
        input2:"",
        input3:"",
        addEmpForm:{
          input1:"",
          input2:"",
          value:"" ,
          value1:""
        }
      }
    },
    methods: {
      change(){
        var that = this;
        var textinfo=that.message.replace(/\s/g,"");
        this.$axios.get("/api/manage/queryAllEmployeeCount.do?employeeName="+textinfo+"&&pageCount="+this.pageCount)
          .then(resp=>{
            that.pageTotal =resp.data;
            if( that.pageTotal!=""){
              this.currentPage=1;
            }else{
              this.currentPage=0;
            }
          });
        showAllEmployee(that)
      },
      toPre(){
        var that = this;
        this.currentPage--;
        if(this.currentPage<1){
          this.currentPage=1;
          alert("这是第一页");
        }
        showAllEmployee(that);
      },
      toNext(){
        var that = this;
        this.currentPage++;
        if(this.currentPage>this.pageTotal){
          this.currentPage=this.pageTotal;
          alert("这是最后一页");
        }
        showAllEmployee(that);
      },
      deleteOneEmp(obj){
        var that = this;
        var textinfo=this.message.replace(/\s/g,"");
        if(confirm("是否删除?")){
          this.$axios.get("/api/manage/deleteOneEmp.do?id="+obj)
            .then(resp=>{
              if(resp.data.affectedRows>0){
                alert("删除成功！");
                this.$axios.get("/api/manage/queryAllEmployeeCount.do?employeeName="+textinfo+"&&pageCount="+this.pageCount)
                  .then(resp=>{
                    that.pageTotal=resp.data;
                    if(that.pageTotal<that.currentPage){
                      that.currentPage=that.currentPage-1;
                    }
                    showAllEmployee(that);
                  });

              }else{
                alert("删除失败！")
              }
            });
        }
      },
      addEmp(addEmpForm){
        var data=$("#addEmpForm").serialize()
        var textinfo=this.message.replace(/\s/g,"");
        var that=this;
        this.$axios.get("/api/manage/addNewEmp.do?"+data)
          .then(resp=>{
            $('#myModalAdd').modal('hide');
            if(resp.data.affectedRows>0){
              confirm("添加成功！");
              that.addEmpForm.input1="";
              that.addEmpForm.input2="";
              that.addEmpForm.value="";
              that.addEmpForm.value1="";
              that.$axios.get("/api/manage/queryAllEmployeeCount.do?employeeName="+textinfo+"&&pageCount="+that.pageCount)
                .then(resp=>{
                  that.pageTotal=resp.data;
                });
              showAllEmployee(that);
            }else{
                confirm("添加失败!");
            }
          });
      },
      updateClick(obj){
        var that=this;
        this.$axios.get("/api/manage/selectOneEmp.do?id=" + obj)
          .then(resp => {
            var data=resp.data;
            that.input1=data[0].id;
            that.input2=data[0].employeeName;
            that.input3=data[0].phone;
            that.value1=new Date(data[0].hiredate);
            that.value=data[0].deptName;
          });
      },
      updateEmp(){
        var that = this;
        var data = $("#updateForm").serialize();
        var textinfo = this.message.replace(/\s/g, "");
        this.$axios.get("/api/manage/updateEmp.do?"+data)
          .then(resp=> {
              if(resp.data.affectedRows==1){
                $('#myModalUpdate').modal('hide');
                that.input1="";
                that.input2="";
                that.input3="";
                that.value1="";
                that.value="";
                confirm("修改成功!")
                that.$axios.get("/api/manage/queryAllEmployeeCount.do?employeeName="+textinfo+"&&pageCount="+that.pageCount)
                  .then(resp=>{
                    that.pageTotal=resp.data;
                  });
                showAllEmployee(that);
              }else{
                  confirm("修改失败！")
              }

          })
      }
    },
    activated:function () {
      var that = this;
      var textinfo=that.message.replace(/\s/g,"");
      this.$axios.get("/api/manage/queryAllEmployeeCount.do?employeeName="+textinfo+"&&pageCount="+this.pageCount)
        .then(resp=>{
          that.pageTotal=resp.data;
        });
      showAllEmployee(that);
      that.$axios.get('/api/manage/queryAllDeptInSelect.do')
        .then(function (resp) {
          that.deptArray = resp.data;
        });
    }
  }

  function showAllEmployee(that) {
    var textinfo=that.message.replace(/\s/g,"");
    that.$axios.get('/api/manage/queryAllEmployee.do?',{params:{employeeName:textinfo,currentPage:that.currentPage,pageCount:that.pageCount}})
      .then(function (resp) {
        that.employeeArray = resp.data;
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
  .dept-header{
    width: 100%;
    padding: 5% 8% 5% 2%;
    color: black;
    font-size: 14px;
  }
  .dept-words{
    float: left;
  }
  .dept-query{
    float: left;
    margin-left: 10%;
  }
  .dept-query>input{
    border: 1px solid gainsboro;
    outline: none;
    width: 150px;
    border-radius: 5px;
    height: 21px;
  }
  .dept-add{
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
  .dept-content{
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
    height: 40px;
  }
  td>button{
    border: none;
    color: white;
    padding: 4% 12%;
    border-radius: 2px;
    margin-left: 5px;
  }
  .dept-edit{
    background-color: #89b47c;
  }
  .dept-delete{
    background-color: #dc7856;
  }
  .employee-dept{
    background-color: #edc581;
  }
  .dept-footer{
    margin-top: 1%;
    text-align: center;
  }
  .dept-footer>button{
    border: none;
    outline: none;
    border-radius: 5px;
    color: white;
    height: 25px;
    font-size: 12px;
    width: 5%;
    background-color: #DDE276;
  }
</style>
