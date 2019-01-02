<template>
  <div class="app">
    <div class="lanmu-header">
      <div class="lanmu-words">栏目管理</div>
      <div class="lanmu-query">
        查询：<input type="text" v-model="searchHome" @keyup="searchHomes" placeholder="按照家名查询"/>
      </div>
      <div class="lanmu-add" data-toggle="modal" data-target="#addHome">添加</div>
    </div>
    <div class="lanmu-content">
      <table>
        <thead>
        <tr>
          <th>编号</th>
          <th>家名</th>
          <th>地址</th>
          <th>时间</th>
          <th>封面图</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="lanmu in lanmuArr">
          <td>{{lanmu.h_number}}</td>
          <td>{{lanmu.h_name}}</td>
          <td>{{lanmu.h_address}}</td>
          <td>{{lanmu.h_time}}</td>
          <td><img :src="'api'+lanmu.h_img" alt=""></td>
          <td class="operate">
            <el-button class="lanmu-edit" type="button" data-toggle="modal" data-target="#editHome" @click="openHome(lanmu.h_id)">
              修改
            </el-button>
          </td>
          <td class="operate">
            <el-button class="lanmu-delete" type="button" @click="delHome(lanmu.h_id)">
              删除
            </el-button>
          </td>
          <td class="operate">
            <router-link  :to="{path:'/homedetail',query:{id:lanmu.h_id}}" tag="td">
              <el-button class="lanmu-detail">
                详情页
              </el-button>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="lanmu-footer">
      <el-button class="pre" type="text" @click="toPre">上一页</el-button>
      <span class="pages" >{{currentPage}}/{{pageTotal}}</span>
      <el-button class="next" type="text" @click="toNext">下一页</el-button>
    </div>


    <!--添加模态框-->
    <div role="dialog" class="modal fade" id="addHome" data-index="nowIndex">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>添加家庭</h4>
          </div>
          <div class="modal-body text-center">
            <el-form :model="addlanmu" :rules="rules" ref="addlanmu" label-width="100px" class="demo-ruleForm">
              <el-form-item label="编号" prop="num">
                <el-input v-model="addlanmu.num"></el-input>
              </el-form-item>
              <el-form-item label="家名" prop="name">
                <el-input v-model="addlanmu.name"></el-input>
              </el-form-item>
              <el-form-item label="区域" prop="region">
                <el-select v-model="addlanmu.region" placeholder="请选择活动区域">
                  <el-option label="上海" value="上海"></el-option>
                  <el-option label="北京" value="北京"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addlanmu.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="封面" prop="img">
                <!--<el-input name="myfile" type="file" v-model="addlanmu.img"></el-input>-->
                <input type="file" class="form-control" name="addImg" v-on:change="chooseImg" value="请选择图片">
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer text-right">
            <el-button class="addHome" type="primary" data-dismiss="modal" @click="addHome('addlanmu')">立即创建</el-button>
            <el-button data-dismiss="modal" @click="resetAddForm('addlanmu')">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--修改-->
    <div role="dialog" class="modal fade" id="editHome" data-index="nowIndex">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>修改家庭</h4>
          </div>
          <div class="modal-body text-center">
            <el-form :model="addlanmu" :rules="rules" ref="addlanmu" label-width="100px" class="demo-ruleForm">
              <el-form-item label="编号" prop="num">
                <el-input v-model="addlanmu.num"></el-input>
              </el-form-item>
              <el-form-item label="家名" prop="name">
                <el-input v-model="addlanmu.name"></el-input>
              </el-form-item>
              <el-form-item label="区域" prop="region">
                <el-select v-model="addlanmu.region" placeholder="请选择活动区域">
                  <el-option label="上海" value="上海"></el-option>
                  <el-option label="北京" value="北京"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间" required>
                <el-col :span="20">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addlanmu.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="封面" prop="img">
                <el-col :span="11">
                  <input type="file" class="form-control" name="editImg" v-on:change="imgChange" value="请选择图片">
                </el-col>
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer text-right">
            <el-button class="addHome" type="primary" data-dismiss="modal" @click="editHome('addlanmu')">立即创建</el-button>
            <el-button data-dismiss="modal" @click="resetAddForm('addlanmu')">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'lanmu',
    data: function () {
      return {
        lanmuArr:[],
        pageTotal:"",//总页数
        currentPage:1,//当前页
        searchHome:"",
        addlanmu:{
          num:'',
          name:'',
          region:'',
          date1:'',
          img:''
        },
        imageUrl: '',
        rules:{
          num:[
            { required: true, message: '请输入编号', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入家名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择住址', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
//          img:[
//            { required: true, message: '请选择图片', trigger: 'change' }
//          ]
        },
        h_id:'',
        editImg:""
      }
    },
    methods:{
      toPre(){
        var that = this;
        this.currentPage--;
        if(this.currentPage<1){
          this.currentPage=1;
          this.$alert('已经是第一页啦', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
        }
        getAllLanMu(that);
      },
      toNext(){
        var that = this;
        this.currentPage++;
        if(this.currentPage>this.pageTotal){
          this.currentPage=this.pageTotal;
          this.$alert('已经是最后一页啦', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
        }
        getAllLanMu(that);
      },
      chooseImg() {
        this.imageUrl=event.target.files[0];
        console.log(this.imageUrl)
      },
      addHome(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that=this;
            function formatTen(num) {
              return num > 9 ? (num + "") : ("0" + num);
            }
            let file = this.imageUrl;
            let myYear=this.addlanmu.date1.getFullYear();
            let myMonth=this.addlanmu.date1.getMonth() + 1;
            let myDay=this.addlanmu.date1.getDate();
            let myDate=myYear+"-"+formatTen(myMonth)+"-"+formatTen(myDay);
            let param = new FormData(); //创建form对象
            param.append('file',file);//通过append向form对象添加数据
            param.append('num',this.addlanmu.num);//添加form表单中其他数据
            param.append('name',this.addlanmu.name);//添加form表单中其他数据
            param.append('region',this.addlanmu.region);//添加form表单中其他数据
            param.append('myDate',myDate);//添加form表单中其他数据
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };
            if(file==""){
              this.$message({
                showClose: true,
                message: '请选择图片',
                type: 'error'
              });
              $(".addHome").attr("data-dismiss","")
            }else {
              $(".addHome").attr("data-dismiss","modal");
              this.$axios.post("/api/manage/addHome.do",param,config)
                .then(function (resp) {
                });
              this.$refs[formName].resetFields();
              getPageTotal(that);
              getAllLanMu(that);
            }
          } else {
            $(".addHome").attr("data-dismiss","")
            console.log('error submit!!');
            return false;
          }
        })
      },
      resetAddForm(formName) {
        this.$refs[formName].resetFields();
      },
      delHome(h_id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$axios.get("/api/manage/delHome.do?h_id="+h_id)
            .then((resp)=>{});
          getPageTotal(this);
          getAllLanMu(this);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      openHome(h_id){
        var that=this;
        this.$axios.get("/api/manage/openHome.do?h_id="+h_id)
          .then((resp)=> {
              console.log(resp.data);
            this.addlanmu.num=resp.data[0].h_number;
            this.addlanmu.name=resp.data[0].h_name;
            this.addlanmu.region=resp.data[0].h_address;
            this.addlanmu.date1=new Date(resp.data[0].h_time);
            this.h_id=resp.data[0].h_id;
          });
      },
      imgChange(){
        this.editImg=event.target.files[0];
      },
      editHome(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that=this;
            function formatTen(num) {
              return num > 9 ? (num + "") : ("0" + num);
            }
            let file = this.editImg;
            let myYear=this.addlanmu.date1.getFullYear();
            let myMonth=this.addlanmu.date1.getMonth() + 1;
            let myDay=this.addlanmu.date1.getDate();
            let myDate=myYear+"-"+formatTen(myMonth)+"-"+formatTen(myDay);
            let param = new FormData(); //创建form对象
            param.append('file',file);//通过append向form对象添加数据
            param.append('num',this.addlanmu.num);//添加form表单中其他数据
            param.append('name',this.addlanmu.name);//添加form表单中其他数据
            param.append('region',this.addlanmu.region);//添加form表单中其他数据
            param.append('myDate',myDate);//添加form表单中其他数据
            param.append('myId',this.h_id);//添加form表单中其他数据
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };
            if(file==""){
              this.$message({
                showClose: true,
                message: '请选择图片',
                type: 'error'
              });
              $(".addHome").attr("data-dismiss","")
            }else {
              $(".addHome").attr("data-dismiss","modal");
              this.$axios.post("/api/manage/editHome.do",param,config)
                .then(function (resp) {
                });
              this.$refs[formName].resetFields();
              getPageTotal(that);
              getAllLanMu(that);
            }
          } else {
            $(".addHome").attr("data-dismiss","");
            console.log('error submit!!');
            return false;
          }
        });
      },
      searchHomes(){
        var that=this;
//        if(this.currentPage==1){
          this.$axios.get("/api/manage/searchHome.do?h_name="+that.searchHome+"&&currentPage="+this.currentPage)
            .then(function (resp) {
              that.lanmuArr = resp.data;
            });
//        }else {
//            this.currentPage=1;
//          this.$axios.get("/api/manage/searchHome.do?h_name="+that.searchHome+"&&currentPage="+this.currentPage)
//            .then(function (resp) {
//              that.lanmuArr = resp.data;
//            });
//        }
      }
    },
    activated:function () {
        var that=this;
      getPageTotal(that);
      getAllLanMu(that);
    }
  }
  //  算出总页数
  function getPageTotal(that) {
    that.$axios.get("/api/manage/getLanMuPageTotal.do")
      .then(function (resp) {
        that.pageTotal=resp.data;
      });
  }
  function getAllLanMu(that) {
    that.$axios.get('/api/manage/getAllLanMu.do?currentPage='+that.currentPage)
      .then(function (resp) {
        that.lanmuArr=resp.data;
      })
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
  .lanmu-header{
    width: 100%;
    padding: 5% 8% 5% 2%;
    /* background-color: red;*/
    color: black;
    font-size: 14px;
  }
  .lanmu-words{
    float: left;
  }
  .lanmu-query{
    float: left;
    margin-left: 10%;
  }
  .lanmu-query>input{
    border: 1px solid gainsboro;
    outline: none;
    width: 150px;
    border-radius: 5px;
    height: 21px;
  }
  .lanmu-add{
    width: 6%;
    float: right;
    border-radius: 5px;
    background-color: #72e273;
    height: 30px;
    line-height: 30px;
    color: white;
    text-align: center;
  }
  .lanmu-content{
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
  .lanmu-edit{
    background-color: #89B47C;
  }
  .lanmu-delete{
    background-color: #DC7856;
  }
  .lanmu-detail{
    background-color: #c1dc56;
  }
  /*.operate{
    text-align: left;
  }*/
  .lanmu-footer{
    margin-top: 1%;
    text-align: center;
  }
  .lanmu-footer>button{
    border: none;
    outline: none;
    border-radius: 5px;
    color: white;
    height: 25px;
    font-size: 12px;
    line-height: 2px;
    width: 5%;
    background-color: #DDE276;
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
