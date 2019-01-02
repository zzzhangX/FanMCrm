<template>
    <div class="app">
      <div class="goods-header">
        <div class="goods-words">家具</div>
        <div class="goods-query">查询：<input type="text" v-model="queryInfo" @keyup="queryGoodsByInfo" placeholder="商品名"> </div>
        <div class="goods-add" data-toggle="modal" data-target="#goodsAdd" @click="queryTCWfInfo">添加</div>
        <div class="goods-editTotal" data-toggle="modal" data-target="#editGoodsTotal" @click="editGoodsTotalQuery">批量修改</div>
      </div>
      <div class="goods-content">
        <table>
          <thead>
            <tr>
              <th>规格编号</th>
              <th>商品类别</th>
              <th>商品名</th>
              <th>颜色</th>
              <th>材质</th>
              <th>尺寸</th>
              <th>价格</th>
              <th>库存</th>
              <th>周期</th>
             <!-- <th>产地</th>
              <th>重量</th>-->
              <th>图片</th>
              <!--<th>操作</th>-->
            </tr>
          </thead>
          <tbody>
            <tr v-for="goodsArray in goodsArray">
              <td>{{goodsArray.ps_id}}</td>
              <td>{{goodsArray.sc_name}}</td>
              <td>{{goodsArray.proName}}</td>
              <td>{{goodsArray.ci_color}}</td>
              <td>{{goodsArray.w_wood}}</td>
              <td>{{goodsArray.fv_name}}</td>
              <td>{{goodsArray.ps_price}}</td>
              <td>{{goodsArray.quantity}}</td>
              <td>{{goodsArray.Delivery}}</td>
              <!--<td>{{goodsArray.place}}</td>
              <td>{{goodsArray.weight}}</td>-->
              <td><img :src="'api'+goodsArray.imgaddress" alt=""></td>
              <td class="operate"><button class="goods-edit" @click="editGoodsQuery(goodsArray.ps_id)" data-toggle="modal" data-target="#goodsEdit">修改</button></td>
              <td class="operate"><button class="goods-delete" @click="deleteGoods(goodsArray.ps_id)">删除</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="goods-footer">
        <div v-if="totalPage>0" class="pages">
          <span>{{currentPage}}</span>
          <span>/</span>
          <span>{{totalPage}}</span>
        </div>
        <div v-if="totalPage>0">
          <button class="pre" @click="pre">上一页</button>
          <button class="next" @click="next">下一页</button>
        </div>
        <div v-if="totalPage==0" class="tips">没有该类商品</div>
        <div v-if="totalPage==-1" class="return">
          <button @click="returnGoods">返回</button>
        </div>
      </div>
      <!-- 商品添加 -->
      <form action="" method="post" enctype="multipart/form-data" @submit.prevent="addGoods">
      <div class="modal fade" tabindex="-1" role="dialog" id="goodsAdd">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">

              <h4 class="modal-title">商品添加</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <!--<label for="goodsName" class="control-label">登录名:</label>-->
                名称：<input type="text" id="goodsName" class="form-control" name="goodsName" v-model="goodsName" @blur="queryTypeByGoodsNameAdd">
              </div>
              <div class="form-group">
                价格：<input type="text" id="goodsPrice" class="form-control" name="goodsPrice" v-model="goodsPrice">
              </div>
              <div class="form-group">
                库存：<input type="text" id="goodsQuantity" class="form-control" name="goodsQuantity" v-model="goodsQuantity">
              </div>
              <div class="form-group">
                周期：<input type="text" id="goodsDelivery" class="form-control" name="goodsDelivery" v-model="goodsDelivery">
              </div >
              <div class="form-group">
                类别：<select id="goodsType" class="form-control" name="goodsType" v-model="goodsType">
                <option v-if="typeArray.length>1">---请选择---</option>
                <option v-for="typeArray in typeArray">
                  {{typeArray.sc_name}}
                </option>
              </select>
              </div>
              <div class="form-group">
                颜色：<select name="goodsColor" id="goodsColor" class="form-control" v-model="goodsColor">
                <option>---请选择---</option>
                <option>无</option>
                <option v-for="colorArray in colorArray">
                  {{colorArray.ci_color}}
                </option>
              </select>
              </div>
              <div class="form-group">
                材质：<select name="goodsWood" id="goodsWood" class="form-control" v-model="goodsWood">
                <option>---请选择---</option>
                <option>无</option>
                <option v-for="woodArray in woodArray">
                  {{woodArray.w_wood}}
                </option>
              </select>
              </div>
              <div class="form-group">
                尺寸：<select name="goodsFv" id="goodsFv" class="form-control" v-model="goodsFv">
                <option>---请选择---</option>
                <option>无</option>
                <option v-for="fvArray in fvArray">
                  {{fvArray.fv_name}}
                </option>
              </select>
              </div>
              <div class="form-group">
                图片：<input type="file" class="form-control" name="goodsImg" v-on:change="goodsImgF" accept="image/png, image/jpeg, image/gif, image/jpg">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary">添加</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
      </form>
      <!-- 商品修改 -->
      <form action="" method="post" enctype="multipart/form-data" @submit.prevent="editGoods">
        <div class="modal fade" tabindex="-1" role="dialog" id="goodsEdit">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">

                <h4 class="modal-title">商品修改</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  编号：<input type="text" id="goodsIdEdit" class="form-control" name="goodsIdEdit" v-model="goodsIdEdit" readonly>
                </div>
                <div class="form-group">
                  名称：<input type="text" id="goodsNameEdit" class="form-control" name="goodsNameEdit" v-model="goodsNameEdit" @blur="queryTypeByGoodsNameEdit">
                </div>
                <div class="form-group">
                  价格：<input type="text" id="goodsPriceEdit" class="form-control" name="goodsPriceEdit" v-model="goodsPriceEdit">
                </div>
                <div class="form-group">
                  库存：<input type="text" id="goodsQuantityEdit" class="form-control" name="goodsQuantityEdit" v-model="goodsQuantityEdit">
                </div>
                <div class="form-group">
                  周期：<input type="text" id="goodsDeliveryEdit" class="form-control" name="goodsDeliveryEdit" v-model="goodsDeliveryEdit">
                </div >
                <div class="form-group">
                  类别：<select id="goodsTypeEdit" class="form-control" name="goodsTypeEdit" v-model="goodsTypeEdit">
                  <option v-if="typeArray.length>1">---请选择---</option>
                  <option v-for="typeArray in typeArray">
                    {{typeArray.sc_name}}
                  </option>
                </select>
                </div>
                <div class="form-group">
                  颜色：<select name="goodsColorEdit" id="goodsColorEdit" class="form-control" v-model="goodsColorEdit">
                  <option>---请选择---</option>
                  <option>无</option>
                  <option v-for="colorArray in colorArray">
                    {{colorArray.ci_color}}
                  </option>
                </select>
                </div>
                <div class="form-group">
                  材质：<select name="goodsWoodEdit" id="goodsWoodEdit" class="form-control" v-model="goodsWoodEdit">
                  <option>---请选择---</option>
                  <option>无</option>
                  <option v-for="woodArray in woodArray">
                    {{woodArray.w_wood}}
                  </option>
                </select>
                </div>
                <div class="form-group">
                  尺寸：<select name="goodsFvEdit" id="goodsFvEdit" class="form-control" v-model="goodsFvEdit">
                  <option>---请选择---</option>
                  <option>无</option>
                  <option v-for="fvArray in fvArray">
                    {{fvArray.fv_name}}
                  </option>
                </select>
                </div>
                <div class="form-group">
                  图片：<br><img :src="goodsImgEditL" alt="">
                  <br><br><input type="file" class="form-control" name="goodsImg" id="goodsImgEdit" v-on:change="goodsImgEditF" accept="image/png, image/jpeg, image/gif, image/jpg">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary">修改</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
      </form>
      <!-- 商品批量修改 -->
      <form action="" method="post" enctype="multipart/form-data" @submit.prevent="editGoodsTotal">
        <div class="modal fade" tabindex="-1" role="dialog" id="editGoodsTotal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">

                <h4 class="modal-title">商品批量修改</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  名称：<select id="goodsNameEditTotal" class="form-control" name="goodsNameEditTotal" v-model="goodsNameEditTotal" @change="queryTypeByGoodsNameEditTotal">
                  <option>---请选择---</option>
                  <option v-for="allGoodsArray in allGoodsArray">
                    {{allGoodsArray.proName}}
                  </option>
                </select>
                </div>
                <div class="form-group">
                  类别：<select id="goodsTypeEditTotal" class="form-control" name="goodsTypeEditTotal" v-model="goodsTypeEditTotal">
                  <option>---请选择---</option>
                  <option v-for="typeArray in typeArray">
                    {{typeArray.sc_name}}
                  </option>
                </select>
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="submit" class="btn btn-primary">修改</button>
              </div>
            </div><!-- /.modal-content -->
          </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
      </form>
    </div>
</template>

<script>
    export default {
        name: 'goods',
        data: function () {
            return {
                goodsArray:[],

                totalPage:0,
                currentPage:1,
                countPage:7,

                queryInfo:"",

                typeArray:[],
                colorArray:[],
                woodArray:[],
                fvArray:[],
                goodsEditArray:[],
                allGoodsArray:[],

                goodsName:"",
                goodsPrice:"",
                goodsQuantity:"",
                goodsDelivery:"",
                goodsType:"---请选择---",
                goodsColor:"---请选择---",
                goodsWood:"---请选择---",
                goodsFv:"---请选择---",
                goodsImg:"",

                currentGoodsId:"",
                currentGoodsImg:"",
                goodsIdEdit:"",
                goodsNameEdit:"",
                goodsPriceEdit:"",
                goodsQuantityEdit:"",
                goodsDeliveryEdit:"",
                goodsTypeEdit:"---请选择---",
                goodsColorEdit:"---请选择---",
                goodsWoodEdit:"---请选择---",
                goodsFvEdit:"---请选择---",
                goodsImgEditL:"",
                goodsImgEditS:"",

                goodsNameEditTotal:"---请选择---",
                goodsTypeEditTotal:"---请选择---",


            }
        },
        methods: {
            pre:function () {
              if (this.currentPage<=1){
                alert("已经是第一页")
              }
              else {
                this.currentPage--;
                this.$axios.get('/api/manage-nextGoods.do?queryInfo='+this.queryInfo+'&countPage='+this.countPage+'&currentPage='+this.currentPage)
                  .then((res)=> {
                    this.goodsArray = res.data;
                    for(var i=0;i<this.goodsArray.length;i++){
                      if (this.goodsArray[i].ci_color==null){
                        this.goodsArray[i].ci_color="无";
                      }
                      if (this.goodsArray[i].fv_name==null){
                        this.goodsArray[i].fv_name="无";
                      }
                      if (this.goodsArray[i].w_wood==null){
                        this.goodsArray[i].w_wood="无";
                      }
                      if (this.goodsArray[i].imgaddress==null||this.goodsArray[i].imgaddress==""){
                        this.goodsArray[i].imgaddress="images/logo.png";
                      }
                    }
                  })
              }
            },
            next:function () {
              if (this.currentPage>=this.totalPage){
                  alert("已经是最后一页")
              }
              else {
                this.currentPage++;
                  this.$axios.get('/api/manage-nextGoods.do?queryInfo='+this.queryInfo+'&countPage='+this.countPage+'&currentPage='+this.currentPage)
                    .then((res)=> {
                      this.goodsArray = res.data;
                      for(var i=0;i<this.goodsArray.length;i++){
                        if (this.goodsArray[i].ci_color==null){
                          this.goodsArray[i].ci_color="无";
                        }
                        if (this.goodsArray[i].fv_name==null){
                          this.goodsArray[i].fv_name="无";
                        }
                        if (this.goodsArray[i].w_wood==null){
                          this.goodsArray[i].w_wood="无";
                        }
                        if (this.goodsArray[i].imgaddress==null||this.goodsArray[i].imgaddress==""){
                          this.goodsArray[i].imgaddress="images/logo.png";
                        }
                      }
                    })
              }
            },
            queryGoodsByInfo:function () {
                /*console.log(this.queryInfo);*/
                this.currentPage=1;
                this.$axios.get('/api/manage-queryGoodsByInfo.do?queryInfo='+this.queryInfo+'&countPage='+this.countPage+'&currentPage='+this.currentPage)
                  .then((res)=> {
                    this.totalPage=Math.ceil(res.data.goodsMountByInfo[0].goodsMountByInfo/this.countPage);
                    console.log(this.totalPage);
                    if (this.totalPage==0){
                        this.currentPage=0;
                    }
                    this.goodsArray = res.data.goodsByInfo;
                    for(var i=0;i<this.goodsArray.length;i++){
                      if (this.goodsArray[i].ci_color==null){
                        this.goodsArray[i].ci_color="无";
                      }
                      if (this.goodsArray[i].fv_name==null){
                        this.goodsArray[i].fv_name="无";
                      }
                      if (this.goodsArray[i].w_wood==null){
                        this.goodsArray[i].w_wood="无";
                      }
                      if (this.goodsArray[i].imgaddress==null||this.goodsArray[i].imgaddress==""){
                        this.goodsArray[i].imgaddress="images/logo.png";
                      }
                    }
                  })
            },
            queryTCWfInfo:function () {
                this.goodsName="";
                this.goodsPrice="";
                this.goodsQuantity="";
                this.goodsDelivery="";
                this.goodsType="---请选择---";
                this.goodsColor="---请选择---";
                this.goodsWood="---请选择---";
                this.goodsFv="---请选择---";
                this.goodsImg="";
              this.$axios.get('/api/manage-queryTCWfInfo.do')
                .then( (res)=> {
                  /*console.log(res.data);*/
                  this.typeArray=res.data.typeInfo;
                  this.colorArray=res.data.colorInfo;
                  this.woodArray=res.data.woodInfo;
                  this.fvArray=res.data.fvInfo;
                })
            },
            addGoods:function () {
                if(this.goodsName!=""&&this.goodsPrice!=""&&this.goodsQuantity!=""&&this.goodsDelivery!=""&&this.goodsType!="---请选择---"&&this.goodsColor!="---请选择---"&&this.goodsWood!="---请选择---"&&this.goodsFv!="---请选择---"&&this.goodsImg!=""){
                    var formData = new FormData();
                    formData.append("goodsName",this.goodsName);
                    formData.append("goodsPrice",this.goodsPrice);
                    formData.append("goodsQuantity",this.goodsQuantity);
                    formData.append("goodsDelivery",this.goodsDelivery);
                    formData.append("goodsType",this.goodsType);
                    formData.append("goodsColor",this.goodsColor);
                    formData.append("goodsWood",this.goodsWood);
                    formData.append("goodsFv",this.goodsFv);
                    formData.append("goodsImg",this.goodsImg);
                    /*console.log(this.goodsName);
                    console.log(formData);*/
                    this.$axios.get('/api/manage-goodsIsExist.do?goodsName='+this.goodsName+"&goodsColor="+this.goodsColor+"&goodsWood="+this.goodsWood+"&goodsFv="+this.goodsFv)
                      .then((res)=>{
                        if (res.data.length<=0){
                            /*console.log(res.data);*/
                          this.$axios.post('/api/manage-addGoods.do',formData)
                           .then( (res)=> {
                           this.goodsArray=res.data;
                           for(var i=0;i<this.goodsArray.length;i++){
                           if (this.goodsArray[i].ci_color==null){
                           this.goodsArray[i].ci_color="无";
                           }
                           if (this.goodsArray[i].fv_name==null){
                           this.goodsArray[i].fv_name="无";
                           }
                           if (this.goodsArray[i].w_wood==null){
                           this.goodsArray[i].w_wood="无";
                           }
                           if (this.goodsArray[i].imgaddress==null||this.goodsArray[i].imgaddress==""){
                           this.goodsArray[i].imgaddress="images/logo.png";
                           }
                           }
                           $("#goodsAdd").modal("hide");
                           this.totalPage=-1;
                           this.currentPage=1;
                           this.queryInfo="";
                           })
                        }
                        else {
                            alert("该类型商品已存在");
                        }
                      })
                }
                else {
                    alert("不能为空");
                }

            },
            goodsImgF:function () {
              this.goodsImg=event.target.files[0];
            },
            returnGoods:function () {
              var that = this;
              that.currentPage=1;
              this.$axios.get('/api/manage-queryGoods.do?countPage='+this.countPage+'&currentPage='+this.currentPage)
                .then(function (res) {

                  that.totalPage=Math.ceil(res.data.goodsMount[0].goodsMount/that.countPage);
                  that.goodsArray = res.data.allGoods;
                  /*that.currentPage=1;*/
                  if (that.totalPage==0){
                    that.currentPage=0;
                  }
                  for (var i=0;i<that.goodsArray.length;i++){
                    if (that.goodsArray[i].ci_color==null){
                      that.goodsArray[i].ci_color="无";
                    }
                    if (that.goodsArray[i].fv_name==null){
                      that.goodsArray[i].fv_name="无";
                    }
                    if (that.goodsArray[i].w_wood==null){
                      that.goodsArray[i].w_wood="无";
                    }
                    if (that.goodsArray[i].imgaddress==null||that.goodsArray[i].imgaddress==""){
                      that.goodsArray[i].imgaddress="images/logo.png";
                    }
                  }
                });
            },
            queryTypeByGoodsNameAdd:function () {
                /*console.log(this.goodsName);*/
              this.$axios.get('/api/manage-queryTypeByGoodsName.do?goodsName='+this.goodsName)
                .then((res)=>{
                  /*console.log(res.data);*/
                  if (res.data.length<=1){
                    this.typeArray=res.data;
                    this.goodsType=res.data[0].sc_name;
                  }
                  else {
                    this.typeArray=res.data;
                    this.goodsType="---请选择---";
                  }
                })
            },
            queryTypeByGoodsNameEdit:function () {

              this.$axios.get('/api/manage-queryTypeByGoodsName.do?goodsName='+this.goodsNameEdit)
                .then((res)=>{

                  if (res.data.length<=1){
                    this.typeArray=res.data;
                    this.goodsType=res.data[0].sc_name;
                  }
                  else {
                    this.typeArray=res.data;
                    this.goodsType="---请选择---";
                  }
                })
            },
            queryTypeByGoodsNameEditTotal:function () {

              this.$axios.get('/api/manage-queryTypeByGoodsName.do?goodsName='+this.goodsNameEditTotal)
                .then((res)=>{
                /* console.log(res.data);*/
                 this.goodsTypeEditTotal=res.data[0].sc_name
                })
            },
            editGoodsQuery:function (index) {
              /*console.log(index);*/
              $("#goodsImgEdit").val("");
              this.$axios.get('/api/manage-editGoodsQuery.do?goodsIdEdit='+index)
                .then((res)=>{

                  this.typeArray=res.data.typeInfo;
                  this.colorArray=res.data.colorInfo;
                  this.woodArray=res.data.woodInfo;
                  this.fvArray=res.data.fvInfo;
                  this.goodsEditArray=res.data.goodsInfoEdit;


                 /* console.log(this.goodsEditArray);*/
                  this.goodsIdEdit=this.goodsEditArray[0].ps_id;
                  this.goodsNameEdit=this.goodsEditArray[0].proName;
                  this.goodsPriceEdit=this.goodsEditArray[0].ps_price;
                  this.goodsQuantityEdit=this.goodsEditArray[0].quantity;
                  this.goodsDeliveryEdit=this.goodsEditArray[0].Delivery;
                  this.goodsTypeEdit=this.goodsEditArray[0].sc_name;
                  this.goodsColorEdit=this.goodsEditArray[0].ci_color;
                  this.goodsWoodEdit=this.goodsEditArray[0].w_wood;
                  this.goodsFvEdit=this.goodsEditArray[0].fv_name;
                  this.goodsImgEditL='/api/'+this.goodsEditArray[0].imgaddress;
                  this.goodsImgEditS=this.goodsEditArray[0].imgaddress;
                  this.currentGoodsImg=this.goodsEditArray[0].imgaddress;
                  if (this.goodsColorEdit==null){
                    this.goodsColorEdit="无"
                  }
                  if (this.goodsWoodEdit==null){
                    this.goodsWoodEdit="无"
                  }
                  if (this.goodsFvEdit==null){
                    this.goodsFvEdit="无"
                  }
                 /* console.log(res.data);*/
                })
            },
            goodsImgEditF:function () {

              var reads= new FileReader();
              var that = this;
              var f=event.target.files[0];
              reads.readAsDataURL(f);
              reads.onload=function (e) {
                that.goodsImgEditL=this.result;
              };

              this.goodsImgEditS=event.target.files[0];
              /*console.log(this.goodsImgEdit);*/
          },
            editGoods:function () {

              if(this.goodsNameEdit!=""&&this.goodsPriceEdit!=""&&this.goodsQuantityEdit!==""&&this.goodsDeliveryEdit!=""&&this.goodsTypeEdit!="---请选择---"&&this.goodsColorEdit!="---请选择---"&&this.goodsWoodEdit!="---请选择---"&&this.goodsFvEdit!="---请选择---"){
                var formData = new FormData();
                formData.append("goodsId",this.goodsIdEdit);
                formData.append("goodsName",this.goodsNameEdit);
                formData.append("goodsPrice",this.goodsPriceEdit);
                formData.append("goodsQuantity",this.goodsQuantityEdit);
                formData.append("goodsDelivery",this.goodsDeliveryEdit);
                formData.append("goodsType",this.goodsTypeEdit);
                formData.append("goodsColor",this.goodsColorEdit);
                formData.append("goodsWood",this.goodsWoodEdit);
                formData.append("goodsFv",this.goodsFvEdit);
                formData.append("goodsImg",this.goodsImgEditS);
                formData.append("currentGoodsImg",this.currentGoodsImg);
               /* console.log(this.goodsImgEditL);*/
                /*console.log(this.goodsImgEditS);*/

                this.$axios.get('/api/manage-goodsIsExist.do?goodsName='+this.goodsNameEdit+"&goodsColor="+this.goodsColorEdit+"&goodsWood="+this.goodsWoodEdit+"&goodsFv="+this.goodsFvEdit)
                  .then((res)=>{

                    if (res.data.length<=0||res.data[0].ps_id==this.goodsIdEdit){
                      this.$axios.post('/api/manage-editGoods.do',formData)
                        .then( (res)=> {
                          alert("修改成功");
                          this.goodsArray=res.data;
                          for(var i=0;i<this.goodsArray.length;i++){
                            if (this.goodsArray[i].ci_color==null){
                              this.goodsArray[i].ci_color="无";
                            }
                            if (this.goodsArray[i].fv_name==null){
                              this.goodsArray[i].fv_name="无";
                            }
                            if (this.goodsArray[i].w_wood==null){
                              this.goodsArray[i].w_wood="无";
                            }
                            if (this.goodsArray[i].imgaddress==null||this.goodsArray[i].imgaddress==""){
                              this.goodsArray[i].imgaddress="images/logo.png";
                            }
                          }
                          $("#goodsEdit").modal("hide");
                          this.queryInfo="";
                          this.totalPage=-1;
                        })
                    }
                    else {
                      alert("该类型商品已存在");
                    }
                  })
              }
              else {
                alert("不能为空");
              }
            },
            deleteGoods:function (index) {
                if (confirm("确定要删除吗？")){
                    var that= this;
                  this.$axios.get('/api/manage-deleteGoods.do?goodsIdDelete='+index+"&currentPage="+this.currentPage+"&countPage="+this.countPage)
                    .then(function(res){
                        if (typeof (res.data)=="string"){
                            alert(res.data);
                        }
                        else {
                          alert("删除成功");
                          that.totalPage=Math.ceil(res.data.goodsMount[0].goodsMount/that.countPage);
                          that.goodsArray = res.data.allGoods;
                          /*that.currentPage=1;*/
                          if (that.totalPage==0){
                            that.currentPage=0;
                          }
                          if (that.currentPage>=that.totalPage){
                            that.currentPage=that.totalPage;
                          }
                          for (var i=0;i<that.goodsArray.length;i++){
                            if (that.goodsArray[i].ci_color==null){
                              that.goodsArray[i].ci_color="无";
                            }
                            if (that.goodsArray[i].fv_name==null){
                              that.goodsArray[i].fv_name="无";
                            }
                            if (that.goodsArray[i].w_wood==null){
                              that.goodsArray[i].w_wood="无";
                            }
                            if (that.goodsArray[i].imgaddress==null||that.goodsArray[i].imgaddress==""){
                              that.goodsArray[i].imgaddress="images/logo.png";
                            }
                          }
                          this.queryInfo="";
                        }
                    })
                }

            },
            editGoodsTotalQuery:function () {
                this.goodsNameEditTotal="---请选择---";
                this.goodsTypeEditTotal="---请选择---";
              this.$axios.get('/api/manage-editGoodsTotalQuery.do')
                .then((res)=>{
                  this.allGoodsArray=res.data.allGoodsName;
                  this.typeArray=res.data.typeInfo;
                })
            },
            editGoodsTotal:function () {
              if (this.goodsNameEditTotal=="---请选择---"||this.goodsTypeEditTotal=="---请选择---"){
                  alert("不能为空");
              }
              else {
                  var that =this;
                  this.$axios.get('/api/manage-editGoodsTotal.do?goodsNameEditTotal='+this.goodsNameEditTotal+"&goodsTypeEditTotal="+this.goodsTypeEditTotal+"&countPage="+this.countPage+"&currentPage="+this.currentPage)
                    .then((res)=>{
                      alert("修改成功");
                      that.totalPage=Math.ceil(res.data.goodsMount[0].goodsMount/that.countPage);
                      that.goodsArray = res.data.allGoods;
                      /*that.currentPage=1;*/
                      if (that.totalPage==0){
                        that.currentPage=0;
                      }
                      for (var i=0;i<that.goodsArray.length;i++){
                        if (that.goodsArray[i].ci_color==null){
                          that.goodsArray[i].ci_color="无";
                        }
                        if (that.goodsArray[i].fv_name==null){
                          that.goodsArray[i].fv_name="无";
                        }
                        if (that.goodsArray[i].w_wood==null){
                          that.goodsArray[i].w_wood="无";
                        }
                        if (that.goodsArray[i].imgaddress==null||that.goodsArray[i].imgaddress==""){
                          that.goodsArray[i].imgaddress="images/logo.png";
                        }
                      }
                      $("#editGoodsTotal").modal("hide");
                      this.queryInfo="";
                    })


              }
            }
        },
        activated:function () {
          var that = this;
          this.$axios.get('/api/manage-queryGoods.do?countPage='+this.countPage+'&currentPage='+this.currentPage)
            .then(function (res) {
              that.totalPage=Math.ceil(res.data.goodsMount[0].goodsMount/that.countPage);
              that.goodsArray = res.data.allGoods;
              /*that.currentPage=1;*/
              if (that.totalPage==0){
                that.currentPage=0;
              }
              for (var i=0;i<that.goodsArray.length;i++){
                if (that.goodsArray[i].ci_color==null){
                    that.goodsArray[i].ci_color="无";
                }
                if (that.goodsArray[i].fv_name==null){
                  that.goodsArray[i].fv_name="无";
                }
                if (that.goodsArray[i].w_wood==null){
                  that.goodsArray[i].w_wood="无";
                }
                if (that.goodsArray[i].imgaddress==null||that.goodsArray[i].imgaddress==""){
                  that.goodsArray[i].imgaddress="logo.png";
                }
              }
            });
        }
    }
</script>

<style scoped>
  .modal-title{
    width: 100%;
    font-size: 14px;
  }
  .form-control{
    height: 25px;
    padding: 0;
  }
  .form-group{
    margin-bottom: 10px;
  }
  .app{
    margin-top: 4%;
    width: 100%;
    height: 500px;
    background-color: white;
    border-radius: 5px;
  }
  .goods-header{
    width: 100%;
    padding: 5% 2% 5% 2%;
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
  .goods-editTotal{
    width: 8%;
    float: right;
    border-radius: 5px;
    background-color: #72e273;
    height: 30px;
    line-height: 30px;
    color: white;
    text-align: center;
    margin-right: 1%;
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
    width: 100%;
    margin-top: 1%;
    text-align: center;
  }
  .goods-footer>div{
    float: left;
    width: 10%;
  }
  .goods-footer>.pages{
    margin-left: 35%;
  }
  .goods-footer>div:nth-child(1)>span{
    height: 25px;
    line-height: 25px;
  }
  .goods-footer button{
    border: none;
    outline: none;
    border-radius: 5px;
    color: white;
    height: 25px;
    font-size: 12px;
    /*width: 5%;*/
    padding: 2% 3%;
    background-color: #DDE276;
  }
  .goods-footer>.tips{
    margin-top: 10%;
    width: 100%;
    text-align: center;
  }
  .goods-footer>.return{
    margin-top: 5%;
    width: 100%;
   /* height: 40px;*/
    /*line-height: 10px;*/
    text-align: center;
  }
  .goods-footer>.return>button{
    padding: 0 2%;
  }
  #goodsEdit img{
    width: 30%;
    height: 70px;
  }
</style>
