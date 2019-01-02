<template>
  <div class="app">
    <div class="lanmu-header">
      <router-link  :to="{path:'/lanmu'}" tag="div">
        <el-button class="backLanmu">
          返回
        </el-button>
      </router-link>
      <div class="lanmu-words">{{homeName}}</div>
      <div class="lanmu-add" data-toggle="modal" data-target="#addPic">添加</div>
    </div>
    <div class="lanmu-content">
      <table>
        <thead>
        <tr>
          <th>图片</th>
          <th>文字介绍</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="detail in detailArr">
          <td><img :src="'api'+detail.p_src" alt=""></td>
          <td><div class="introContent">{{detail.p_intro}}</div></td>
          <td class="operate">
            <el-button class="lanmu-edit" type="button" data-toggle="modal" data-target="#editDetail" @click="openDetail(detail.p_id)">
              修改
            </el-button>
          </td>
          <td class="operate">
            <el-button class="lanmu-delete" type="button" @click="delDetail(detail.p_id)">
              删除
            </el-button>
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
<!--添加-->
    <div role="dialog" class="modal fade" id="addPic" data-index="nowIndex">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>添加</h4>
          </div>
          <div class="modal-body text-center">
            <form method="post" enctype="multipart/form-data">
              <input type="file" class="form-control" name="addImg" v-on:change="chooseImg" value="请选择图片">
              <br>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </form>
          </div>
          <div class="modal-footer text-right">
            <el-button class="addHome" type="primary" data-dismiss="modal" @click="addDetail">立即创建</el-button>
            <el-button data-dismiss="modal">取消</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--修改-->
    <div role="dialog" class="modal fade" id="editDetail" data-index="nowIndex">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4>修改</h4>
          </div>
          <div class="modal-body text-center">
            <form enctype="multipart/form-data">
              <td><img :src="'api'+editMessage.p_src" style="float: left;width: 300px;height:auto"></td>
              <input type="file" class="form-control" name="editImg" v-on:change="imgChange" value="请选择图片">
              <br>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>
            </form>
          </div>
          <div class="modal-footer text-right">
            <el-button :plain="true" class="editDe" type="primary" data-dismiss="modal" @click="editDetail">确认修改</el-button>
            <el-button data-dismiss="modal">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'homeDetail',
    data(){
      return{
        detailArr:[],
        pageTotal:"",//总页数
        currentPage:1,//当前页
        homeName:"",
        detailImg:"",
        textarea:"",
        homeDetail:[],
        homeId:"",
        editMessage:[],
        editImg:""
      }
    },
    methods:{
      toPre(){
        this.currentPage--;
        if(this.currentPage<1){
          this.currentPage=1;
          this.$alert('已经是第一页啦', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
        }
        let that=this;
        let h_id=this.$route.query.id;
        getPageTotal(that,h_id);
        getDetailById(that,h_id)
      },
      toNext(){
        this.currentPage++;
        if(this.currentPage>this.pageTotal){
          this.currentPage=this.pageTotal;
          this.$alert('已经是最后一页啦', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
          });
        }
        let that=this;
        let h_id=this.$route.query.id;
        getPageTotal(that,h_id);
        getDetailById(that,h_id)
      },
      chooseImg() {
        this.detailImg=event.target.files[0];
      },
      imgChange(){
        this.editImg=event.target.files[0];
      },
      addDetail(){
        let file = this.detailImg;
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
        param.append('intro',this.textarea);//添加form表单中其他数据
        param.append('picId',this.$route.query.id);//添加form表单中其他数据
//        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        if(file==""){
          this.$message({
            showClose: true,
            message: '请选择图片',
            type: 'error'
          });
          $(".addHome").attr("data-dismiss","")
        }else {
          $(".addHome").attr("data-dismiss","modal");
          this.$axios.post('/api/manage/uploadFile.do',param,config)
            .then(resp=>{});
          let that=this;
          let h_id=this.$route.query.id;
          getPageTotal(that,h_id);
          getDetailById(that,h_id);
        }
      },
      delDetail(p_id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$axios.get("/api/manage/delDetail.do?p_id="+p_id)
            .then((resp)=>{});
          let that=this;
          let h_id=this.$route.query.id;
          getPageTotal(that,h_id);
          getDetailById(that,h_id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      openDetail(p_id){
        this.$axios.get("/api/manage/openDetail.do?p_id="+p_id)
          .then((resp)=>{
            this.editMessage=resp.data[0];
            console.log(this.editMessage);
            this.textarea=resp.data[0].p_intro;
          });
      },
      editDetail(){
        let file = this.editImg;
        let param = new FormData(); //创建form对象
        param.append('file',file);//通过append向form对象添加数据
        param.append('intro',this.textarea);//添加form表单中其他数据
        param.append('picId',this.$route.query.id);//添加form表单中其他数据
//        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };  //添加请求头
        this.$axios.post('/api/manage/editUploadFile.do',param,config)
          .then(resp=>{
//            console.log(resp.data);
          });
        let that=this;
        let h_id=this.$route.query.id;
        getPageTotal(that,h_id);
        getDetailById(that,h_id);
      },
    },
    activated:function () {
      let that=this;
      let h_id=this.$route.query.id;
      getPageTotal(that,h_id);
      getDetailById(that,h_id);
      getHome(that,h_id)
    }
  }

  function getPageTotal(that,h_id) {
    that.$axios.get("/api/manage/getDetailByIdPageTotal.do?h_id="+h_id)
      .then(function (resp) {
        that.pageTotal=resp.data;
      });
  }
  function getDetailById(that,h_id) {
    that.$axios.get('/api/manage/getHomeById.do?h_id='+h_id+"&&currentPage="+that.currentPage)
      .then((resp)=> {
        that.detailArr=resp.data;
      })
  }
  function getHome(that,h_id) {
    that.$axios.get('/api/manage/getHomeName.do?h_id='+h_id)
      .then((resp)=> {
        that.homeName=resp.data[0].h_name;
        that.homeId=resp.data[0].h_id;
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
    padding: 2% 8% 5% 2%;
    /* background-color: red;*/
    color: black;
    font-size: 14px;
  }
  .backLanmu{
    background-color: #c1dc56;
    height: 18px;
    width: 60px;
    border-radius: 2px;
    color: white;
    padding-bottom: 20px;
  }
  .lanmu-words{
    float: left;
    font-size: 15px;
    font-weight: bold;
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
  .introContent{
    width: 600px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
</style>
