<template>
  <div class="app">
    <div class="dept-header">
      <div class="dept-words">部门</div>
      <div class="dept-query">查询：<input type="text" v-model="message" @keyup="change"/> </div>
      <div class="dept-add btn" data-toggle="modal" data-target="#myModalAdd">添加</div>
    </div>
    <div class="dept-content">
      <table>
        <thead>
        <tr>
          <th>部门编号</th>
          <th>部门名称</th>
          <th>部门人数</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="deptArray in deptArray">
          <td>{{deptArray.id}}</td>
          <td>{{deptArray.dept_name}}</td>
          <td>{{deptArray.COUNT}}</td>
          <td class="operate">
            <button class="dept-edit"  @click="showUpdateDept(deptArray.id)"  data-toggle="modal" data-target="#myModalUpdate">修改</button>
            <button class="dept-delete" @click="deleteOneDept(deptArray.id,deptArray.COUNT)">删除</button>
          </td>
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
      <div class="modal-dialog modal-xs" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabelAdd">添加部门</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form action="" id="addDeptForm">
              部  门 &nbsp;名&nbsp;：
              <input type="text" name="deptName" id="deptName"/>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addDept">添加</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!--修改的模态框-->
    <div class="modal fade" id="myModalUpdate" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog modal-xs" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="myModalLabelUpdate">修改部门</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form action="" id="updateDeptForm">
              部  门 &nbsp;Id&nbsp;：
              <input type="text" name="deptId1" id="deptId1" disabled="disabled"/>
              <br>
              <br>
              部  门 &nbsp;名&nbsp;：
              <input type="text" name="deptName1" id="deptName1"/>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateDept">修改</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dept',
    data: function () {
      return {
        deptArray:[],
        message:"",
        pageCount:5,//一页多少条
        pageTotal:"",//总页数
        currentPage:1,//当前页
      }
    },
    methods: {
        change(){
          var that = this;
          this.currentPage=1;
          countALLAndShowALLDept(that)
        },
        toPre(){
          var that = this;
          this.currentPage--;
          if(this.currentPage<1){
            this.currentPage=1;
            alert("这是第一页");
          }
          showAllDept(that);
        },
        toNext(){
          var that = this;
          this.currentPage++;
          if(this.currentPage>this.pageTotal){
            this.currentPage=this.pageTotal;
            alert("这是最后一页");
          }
          showAllDept(that);
        },
        addDept(){
              var that=this;
              var data=$("#addDeptForm").serialize();
              this.$axios.get("/api/manage/addDept.do?"+data)
                .then(resp=>{
                  if(resp.data.affectedRows>0){
                    $('#myModalAdd').modal('hide');
                    $("#addDeptForm>input").val("");
                    confirm("添加成功！")
                    countALLAndShowALLDept(that);
                  }else{
                      confirm("添加失败！")
                  }
                });
          },
        deleteOneDept(obj,count){
            var that=this;
            var textinfo=that.message.replace(/\s/g,"");
            if(count>0){
                confirm("部门中还有人不能删除!");
            }else{
              if(confirm("是否删除?")){
                this.$axios.get("/api/manage/deleteOneDept.do?id="+obj)
                  .then(resp=>{
                    if(resp.data.affectedRows>0){
                      that.$axios.get("/api/manage/queryAllDeptCount.do?deptName="+textinfo+"&&pageCount="+that.pageCount)
                        .then(resp=>{
                          that.pageTotal=resp.data;
                          if(that.pageTotal<that.currentPage){
                            that.currentPage=that.currentPage-1;
                          }
                          showAllDept(that);
                        });

                      alert("删除成功！");
                    }else{
                      alert("删除失败！")
                    }
                  });
              }
            }

      },
        showUpdateDept(obj){
          this.$axios.get("/api/manage/selectOneDept.do?id=" + obj)
            .then(resp => {
              var data=resp.data;
              $("#deptId1").val(data[0].id);
              $("#deptName1").val(data[0].dept_name);
            });
        },
        updateDept(){
          var id= $("#deptId1").val();
          var name=$("#deptName1").val();
          var that=this;
          this.$axios.get("/api/manage/updateOneDept.do?id="+id+"&deptName="+name)
            .then(resp => {
              if(resp.data.affectedRows>0){
                confirm("修改成功");
                $('#myModalUpdate').modal('hide');
                showAllDept(that);
              }else{
                confirm("修改失败");
              }
            });
      }
    },
    activated:function () {
      var that = this;
      countALLAndShowALLDept(that)
    }
  }

  function countALLAndShowALLDept(that){
    var textinfo=that.message.replace(/\s/g,"");
    that.$axios.get("/api/manage/queryAllDeptCount.do?deptName="+textinfo+"&&pageCount="+that.pageCount)
      .then(resp=>{
        that.pageTotal=resp.data;
      });
    showAllDept(that)
  }
  function showAllDept(that) {
    var textinfo=that.message.replace(/\s/g,"");
    that.$axios.get('/api/manage/queryAllDept.do',{params:{deptName:textinfo,currentPage:that.currentPage,pageCount:that.pageCount}})
      .then(function (res) {
        that.deptArray = res.data;
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
    border-radius: 5px;
    background-color: #dde276;
    height: 30px;
    line-height: 30px;
    color: white;
    text-align: center;
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
    padding: 2% 6%;
    border-radius: 2px;
    /*margin-left: 5px;*/
  }
  .dept-edit{
    background-color: #89b47c;
  }
  .dept-delete{
    background-color: #dc7856;
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
  .btn{
    font-size: 12px;
    line-height: 19px;
    border-radius: 3px;
  }
</style>
