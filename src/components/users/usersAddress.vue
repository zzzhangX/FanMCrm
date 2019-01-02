<template>
  <div class="app">
    <router-link to="/users" tag="button" class="back">返回</router-link>
    <div class="users-header">
      <div class="users-words">用户地址</div>
      <div class="users-query">根据用户名查询：<input type="text"  v-model="message" @keyup="change"/> </div>
      <button type="button" class="btn users-add" data-toggle="modal" data-target="#myModalAdd" @click="addUserAddressClick">添加</button>
    </div>
    <div class="users-content">
      <table>
        <thead>
        <tr>
          <th>用户ID</th>
          <th>姓名</th>
          <th>电话</th>
          <th>备用电话</th>
          <th>地址</th>
          <th>是否为默认地址</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="usersAddress in usersAddress">
          <td>{{usersAddress.userId}}</td>
          <td>{{usersAddress.name}}</td>
          <td>{{usersAddress.phone}}</td>
          <td>{{usersAddress.phone1}}</td>
          <td>{{usersAddress.province}}-{{usersAddress.city}}-{{usersAddress.district}}-{{usersAddress.province}}-{{usersAddress.address}}</td>
          <td>{{usersAddress.is_default}}</td>
          <td class="operate">
            <button class="users-edit btn" data-toggle="modal" data-target="#myModalUpdate" @click="updateAddressClick(usersAddress.id)">修改</button>
          </td>
          <td class="operate">
            <button class="users-delete" @click="deleteOneUserAddress(usersAddress.id)">删除</button>
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
            <h4 class="modal-title" id="myModalLabelAdd">添加收货地址</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form action="" id="addUserForm">
              姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
              <input type="text" name="username" id="username"/>
              <br>
              电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：
              <input type="text" name="phone" id="phone"/>
              <br>
              备用电话：
              <input type="text" name="bakphone" id="bakphone"/>
              <br>
              省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：
              <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区" name="province" id="province">
                <el-option v-for="item in province" :key="item.proId" :label="item.proName" :value="item.proId">
                </el-option>
              </el-select>
              <br>
              城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市：
              <el-select v-model="shi" @change="choseCity" placeholder="市级地区" name="city" id="city">
                <el-option v-for="item in city" :key="item.CityID" :label="item.CityName" :value="item.CityID">
                </el-option>
              </el-select>
              <br>
              县&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;城：
              <el-select v-model="qu" placeholder="区级地区"  name="district" id="district">
                <el-option v-for="item in district " :key="item.Id" :label="item.DisName" :value="item.Id">
                </el-option>
              </el-select>
              <br>
              街&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道：
              <input type="text" name="address" id="address"/>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addUserAddress">添加</button>
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
            <h4 class="modal-title" id="myModalLabelUpdate">修改收货地址</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div class="modal-body">
            <form action="" id="updateForm">
              编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
              <input type="text" name="id1" id="id1" disabled="disabled" />
              <br>
              姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
              <input type="text" name="username1" id="name1"/>
              <br>
              电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话：
              <input type="text" name="phone1" id="phone1"/>
              <br>
              备用电话：
              <input type="text" name="bakphone1" id="bakphone1"/>
              <br>
              省&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：
              <el-select v-model="sheng" @change="choseProvince" placeholder="省级地区" id="provinceSelect" name="province1">
                <el-option v-for="item in province" :key="item.proId" :label="item.proName" :value="item.proId">
                </el-option>
              </el-select>
              <br>
              城&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;市：
              <el-select v-model="shi" @change="choseCity" placeholder="市级地区" id="citySelect" name="city1">
                <el-option v-for="item in city" :key="item.CityID" :label="item.CityName" :value="item.CityID">
                </el-option>
              </el-select>
              <br>
              县&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;城：
              <el-select v-model="qu" placeholder="区级地区"  id="districtSelect" name="district1">
                <el-option v-for="item in district" :key="item.Id" :label="item.DisName" :value="item.Id">
                </el-option>
              </el-select>
              <br>
              街&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道：
              <input type="text" name="address" id="address1"/>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="updateUserAddress">保存</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      name: 'users-address',
        data(){
          return{
            usersAddress:[],
            message:"",
            pageCount:5,//一页多少条
            pageTotal:"",//总页数
            currentPage:1,//当前页
            province:[],
            city:[],
            district:[],
            sheng:"",
            shi:"",
            qu:"",
          }
        },
        methods:{
          change(){
            var that = this;
            var textinfo=this.message.replace(/\s/g,"");
            this.currentPage=1;
            this.$axios.get("/api/manage/getAllUserAddressCountByName.do",{params:{id:that.$route.query.id,name:textinfo,pageCount:this.pageCount}})
              .then(resp=>{
                that.pageTotal=resp.data;
              });
            showAllAddressByName(that);
          },
          toPre(){
            var that = this;
            this.currentPage--;
            if(this.currentPage<1){
              this.currentPage=1;
              alert("这是第一页");
            }
            showAllAddressByName(that);
          },
          toNext(){
            var that = this;
            this.currentPage++;
            if(this.currentPage>this.pageTotal){
              this.currentPage=this.pageTotal;
              alert("这是最后一页");
            }
            showAllAddressByName(that);
          },
          deleteOneUserAddress(obj){
            var that = this;
            var textinfo=this.message.replace(/\s/g,"");
            if(confirm("是否删除?")){
              this.$axios.get("/api/manage/deleteOneUserAddress.do?id="+obj)
                .then(resp=>{
                  if(resp.data.affectedRows>0){
                    that.$axios.get("/api/manage/getAllUserAddressCountByName.do",{params:{id:that.$route.query.id,name:textinfo,pageCount:that.pageCount}})
                      .then(resp=>{
                        that.pageTotal=resp.data;
                        if(that.pageTotal<that.currentPage){
                          that.currentPage=that.currentPage-1;
                        }
                        showAllAddressByName(that);
                      });

                    alert("删除成功！");
                  }else{
                    alert("删除失败！")
                  }
                });
            }
          },
          addUserAddressClick(){
            this.sheng="";
            this.shi="";
            this.qu="";
          },
          addUserAddress(){
            var data=$("#addUserForm").serialize();
            var that=this;
            if($("#username").val()==""||$("#phone").val()==""||$("#bakphone").val()==""||$("#province").val()==""||$("#city").val()==""||$("#district").val()==""||$("#address").val()==""){
              confirm("字段不能为空！");
            }else{
              $('#myModalAdd').modal('hide');
              this.$axios.get("/api/manage/addNewUserAddress.do?userId="+this.$route.query.id+"&"+data+"&is_default=0")
                .then(resp=>{
                  if(resp.data.affectedRows>0){
                    var textinfo=this.message.replace(/\s/g,"");
                    //  查询数据库中有几条数据，算出有多少页
                    that.$axios.get("/api/manage/getAllUserAddressCountByName.do",{params:{id:that.$route.query.id,name:textinfo,pageCount:that.pageCount}})
                      .then(resp=>{
                        that.pageTotal=resp.data;
                      });
                    showAllAddressByName(that);
                    confirm("添加成功！");
                    $("#addUserForm>input").val("");
                    that.sheng="";
                    that.shi="";
                    that.qu="";
                  }
                });
            }
          },
          updateAddressClick(obj){
              var that=this;
            this.$axios.get("/api/manage/selectOneUserAddress.do?id=" + obj)
              .then(resp => {
                var data=resp.data;
                $("#id1").val(data[0].id);
                $("#name1").val(data[0].name);
                $("#phone1").val(data[0].phone);
                $("#bakphone1").val(data[0].phone1);
                that.sheng=data[0].province;
                that.shi=data[0].city;
                that.qu=data[0].district;
                $("#address1").val(data[0].address);
              });
          },
          updateUserAddress(){
            var data=$("#updateForm").serialize();
            var that=this;
            if($("#username1").val()==""||$("#phone1").val()==""||$("#bakphone1").val()==""||$("#province1").val()==""||$("#city1").val()==""||$("#address1").val()==""){
              confirm("字段不能为空！");
            }else{
              $('#myModalUpdate').modal('hide');
              this.$axios.get("/api/manage/UpdateUserAddress.do?"+data+"&id="+$("#id1").val())
                .then(resp=>{
                  if(resp.data.affectedRows>0){
                      showAllAddressByName(that);
                    $("#updateForm>input").val("");
                    confirm("修改成功！");
                  }
                });
            }
          },
          choseProvince(){
            var sheng=this.sheng;
            var that=this;
//            选择的时候就清空省 城 区  地址
            that.shi="";
            that.qu="";
           $("#address").val("");
            $("#address1").val("");
            this.$axios.get("/api/manage/getAllCity.do?proId="+sheng)
              .then(resp=>{
                that.city=resp.data;
              });
          },
          choseCity(){
            var shi=this.shi;
            var that=this;
//            let obj = {};
//            obj = this.city.find((item)=>{
//              return item.CityID=== val;
//            });
//            let getName = '';
//            getName = obj.CityName;
//            $("#city1").val(getName);
            this.$axios.get("/api/manage/getAllDistrict.do?cityId="+shi)
              .then(resp=>{
                that.district=resp.data;
              });
          }
        },
      activated() {
        var that = this;
        var textinfo=this.message.replace(/\s/g,"");
        //  查询数据库中有几条数据，算出有多少页
        this.$axios.get("/api/manage/getAllUserAddressCountByName.do",{params:{id:that.$route.query.id,name:textinfo,pageCount:this.pageCount}})
          .then(resp=>{
            that.pageTotal=resp.data;
          });
        showAllAddressByName(that);

        this.$axios.get("/api/manage/getAllProvince.do")
          .then(resp=>{
            that.province=resp.data;
          });
        }

   }
   function showAllAddressByName(that) {
     var textinfo=that.message.replace(/\s/g,"");
     that.$axios.get('/api/manage/getOneUsersAddressByName.do',{params:{id:that.$route.query.id,name:textinfo,pageCount:that.pageCount,currentPage:that.currentPage}})
       .then(resp=>{
         that.usersAddress = resp.data;
         for (var i=0;i<that.usersAddress.length;i++){
           if (that.usersAddress[i].is_default=="1"){
             that.usersAddress[i].is_default="是";
           }
           if (that.usersAddress[i].is_default=="0"){
             that.usersAddress[i].is_default="不是";
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
  .back{
    margin-top: 0.5%;
    margin-left: 0.2%;
    width:6%;
    height: 30px;
    border-radius: 3px;
    border: none;
    background-color: #edc581;
    color: white;
  }
  .users-edit{
    background-color: #89b47c;
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
  #province1,#city1,#district1{
    border: none;
    margin: 0;
    padding:0;
    width: 18%;
  }
</style>



