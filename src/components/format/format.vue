<template>
    <div class="app">
        <div class="type">
          <span>种类</span>
          <div class="content">
            <table>
              <thead>
                <tr>
                  <th>编号</th>
                  <th class="name">名称</th>
                  <th><button class="add" data-toggle="modal" data-target="#typeAdd" @click="">添加</button></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="typeArray in typeArray">
                  <td>{{typeArray.sc_Id}}</td>
                  <td>{{typeArray.sc_name}}</td>
                  <td class="operate">
                    <button class="edit">修改</button>
                    <button class="delete">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="footer">
              <span>上一页</span>
              <span>下一页</span>
            </div>
          </div>

        </div>
        <div class="color">
          <span>颜色</span>
          <div class="content">
            <table>
              <thead>
              <tr>
                <th>编号</th>
                <th class="name">名称</th>
                <th><button class="add" data-toggle="modal" data-target="#colorAdd">添加</button></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="colorArray in colorArray">
                <td>{{colorArray.ci_id}}</td>
                <td>{{colorArray.ci_color}}</td>
                <td class="operate">
                  <button class="edit" @click="colorEditQuery(colorArray.ci_id)" data-toggle="modal" data-target="#colorEdit">修改</button>
                  <button class="delete" @click="deleteColor(colorArray.ci_id)">删除</button>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="footer">
              <span>上一页</span>
              <span>下一页</span>
            </div>
          </div>

        </div>
        <div class="wood">
          <span>木材</span>
          <div class="content">
            <table>
              <thead>
              <tr>
                <th>编号</th>
                <th class="name">名称</th>
                <th><button class="add">添加</button></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="woodArray in woodArray">
                <td>{{woodArray.w_id}}</td>
                <td>{{woodArray.w_wood}}</td>
                <td class="operate">
                  <button class="edit">修改</button>
                  <button class="delete">删除</button>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="footer">
              <span>上一页</span>
              <span>下一页</span>
            </div>
          </div>

        </div>
        <div class="size">
          <span>尺寸</span>
          <div class="content">
            <table>
              <thead>
              <tr>
                <th>编号</th>
                <th class="name">名称</th>
                <th><button class="add">添加</button></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="fvArray in fvArray">
                <td>{{fvArray.fv_id}}</td>
                <td>{{fvArray.fv_name}}</td>
                <td class="operate">
                  <button class="edit">修改</button>
                  <button class="delete">删除</button>
                </td>
              </tr>
              </tbody>
            </table>
            <div class="footer">
              <span>上一页</span>
              <span>下一页</span>
            </div>
          </div>

        </div>
      <!-- 种类添加 -->
      <form action="" method="" enctype="multipart/form-data" @submit.prevent="colorAdd">
        <div class="modal fade" tabindex="-1" role="dialog" id="colorAdd">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">

                <h4 class="modal-title">颜色添加</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <!--<label for="goodsName" class="control-label">登录名:</label>-->
                  名称：<input type="text" id="colorName" class="form-control" name="colorName" v-model="colorName" @blur="">
                </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary">添加</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
      </div>
      </form>
      <form action="" method="" enctype="multipart/form-data" @submit.prevent="colorEdit">
        <div class="modal fade" tabindex="-1" role="dialog" id="colorEdit">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">

                <h4 class="modal-title">颜色修改</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <!--<label for="goodsName" class="control-label">登录名:</label>-->
                  编号：<input type="text" id="colorIdEdit" class="form-control" name="colorIdEdit" v-model="colorIdEdit" @blur="" readonly>
                </div>
                <div class="form-group">
                  <!--<label for="goodsName" class="control-label">登录名:</label>-->
                  名称：<input type="text" id="colorNameEdit" class="form-control" name="colorNameEdit" v-model="colorNameEdit" @blur="">
                </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary">修改</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
      </div>
      </form>
    </div>
</template>

<script>
    export default {
        name: 'format',
        data: function () {
            return {
                typeArray:[],
                colorArray:[],
                woodArray:[],
                fvArray:[],
                typeName:"",
                colorName:"",
                woodName:"",
                fvName:"",
                colorNameEdit:"",
                colorIdEdit:"",
                currentColorName:""
            }
        },
        methods: {
          colorAdd:function () {

            this.$axios.get('/api/manage-addColor.do?colorName='+this.colorName)
              .then((res)=>{

                if (typeof (res.data)=='string'){
                    alert(res.data);
                }
                else {
                    this.colorArray=res.data;
                    $("#colorAdd").modal("hide");
                }
              })
          },
          deleteColor:function (index) {
              if (confirm("你确定要删除吗")){
                this.$axios.get('/api/manage-deleteColor.do?colorId='+index)
                  .then( (res)=> {
                    if (typeof (res.data)=='string'){
                      alert(res.data);
                    }
                    else {
                      this.colorArray=res.data;
                    }
                  })
              }

          },
          colorEditQuery:function (index) {
            this.$axios.get('/api/manage-colorEditQuery.do?colorId='+index)
              .then((res)=>{
                this.colorIdEdit=res.data[0].ci_id;
                this.colorNameEdit=res.data[0].ci_color;
                this.currentColorName=res.data[0].ci_color;
              });
          },
          colorEdit:function (index) {
              if (this.colorNameEdit==""){
                  alert("不能为空");
              }
              else {
                this.$axios.get('/api/manage-colorEdit.do?colorNameEdit='+this.colorNameEdit+"&colorIdEdit="+this.colorIdEdit)
                  .then((res)=>{
                    if (res.data.length>0&&res.data[0].ci_color!=this.currentColorName){
                        alert("该颜色已存在");
                    }
                    else {
                        this.$axios.get('/api/manage-colorEditTrue.do?colorNameEdit='+this.colorNameEdit+"&colorIdEdit="+this.colorIdEdit)
                          .then((res)=>{
                            this.colorArray=res.data;
                            $("#colorEdit").modal("hide");
                          })

                    }
                  })
              }
          }
        },
        activated:function () {
          this.$axios.get('/api/manage-queryTCWFInfoG.do')
            .then((res)=>{
              console.log(res.data);
              this.typeArray=res.data.typeInfo;
              this.colorArray=res.data.colorInfo;
              this.woodArray=res.data.woodInfo;
              this.fvArray=res.data.fvInfo;
            })
        }
    }
</script>

<style scoped>
  .modal-title{
    width: 100%;
    font-size: 14px;
  }
  .form-control{
    height: 35px;
    padding: 0;
  }
  .form-group{
    text-align: left;
    margin-bottom: 10px;
  }
  .app{
    margin-top: 4%;
    width: 100%;
    height: 500px;
    /*background-color: red;*/
    border-radius: 5px;
    text-align: center;
  }
  .app>div{
    width: 20%;
    height: 500px;
    float: left;
    margin-left: 4%;
    /*margin-top: 25px;*/
    /*background-color: gainsboro;*/
  }
  .app>div>span{
    display: inline-block;
    width: 100%;
    padding: 3% 0 ;
    text-align: center;
    /*background-color: gainsboro;*/
  }
  .app>div>.content{
    width: 100%;
    background-color: white;
    height: 400px;
    margin-top: 30px;
    padding: 10px 0 0 0;
  }
  table{

    width:100%;
  }
  tbody tr:nth-child(odd){
    background-color: #E7E9BE;
  }
  tr{
    font-size: 14px;
    height: 40px;
  }
  td>button{
    border: none;
    border-radius: 5px;
    font-size: 12px;
    padding: 2%;
    background-color: transparent;
    cursor: pointer;
  }
  .name{
    width: 80px;
  }
  .add{
    margin-left: 30px;
    background-color: #68B3C8;
    color: white;
    border: none;
    border-radius: 5px;
  }
  .operate{
    /*padding-left: 20px;*/
  }
  .footer{
    margin-top: 5px;
  }
  .footer>span{
    font-size: 12px;
    margin-left: 10px;
  }
</style>
