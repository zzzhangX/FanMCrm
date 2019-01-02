<template>
  <div class="app">
    <div class="orderItem-header">
      <div class="orderItem-words">订单管理</div>
      <div class="orderItem-query">根据订单号查询：<input type="text" v-model="message" v-on:input="change"/> </div>
      <button type="button" class="btn orderItem-add" data-toggle="modal" data-target="#myModalAdd">添加</button>
    </div>
    <div class="orderItem-content">
      <table>
        <thead>
        <tr>
          <th>订单号</th>
          <th>收货人</th>
          <th>下单日期
            <div class="divspan">
              <span class="topspan iconfont" @click="timeAsc">&#xe6db;</span>
              <span class="buttonspan iconfont" @click="timeDesc">&#xe6dc;</span>
            </div>
          </th>
          <th>收货地址</th>
          <th>收货人手机号</th>
          <th>金额
            <div class="divspan">
              <span class="topspan iconfont" @click="priceAsc">&#xe6db;</span>
              <span class="buttonspan iconfont" @click="priceDesc">&#xe6dc;</span>
            </div>
          </th>
          <th>状态</th>
          <!--<th></th>-->
          <!--<th></th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="orderItemArray in orderItemArray">
          <td>{{orderItemArray.orderNum}}</td>
          <td>{{orderItemArray.name}}</td>
          <td>{{orderItemArray.ordertime}}
          </td>
          <td>{{orderItemArray.province}}-{{orderItemArray.city}}-{{orderItemArray.district}}-{{orderItemArray.address}}</td>
          <td>{{orderItemArray.phone}}</td>
          <td>{{orderItemArray.total}}</td>
          <td>{{orderItemArray.state}}</td>
          <td>
            <router-link :to="{path:'/orderDetails',query:{id:orderItemArray.orderId}}" tag="td">
              <button class="orderItem-more">订单详情</button>
            </router-link>
          </td>
          <td class="operate">
            <button class="orderItem-edit btn" data-toggle="modal" @click="getOrderItemById(orderItemArray.orderId)" data-target="#orderItemEdit">修改</button>
          </td>
          <td class="operate">
            <button class="orderItem-delete btn" @click="delOrderItem(orderItemArray.orderId)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="orderItem-footer">
      <button class="pre" @click="toPre">上一页</button>
      <span class="page" >{{currentPage}}/{{pageTotal}}</span>
      <button class="next" @click="toNext">下一页</button>
    </div>
    <!-- 商品修改 -->
    <form action="" method="get" @submit.prevent="editOrderItem">
      <div class="modal fade" tabindex="-1" role="dialog" id="orderItemEdit">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">订单修改</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                订单号：<input type="text" id="orderItemIdEdit" class="onlyread form-control" name="orderItemIdEdit" v-model="orderItemId" readonly>
              </div>
              <div class="form-group">
                收货人：<input type="text" id="orderItemNameEdit" class="form-control" name="orderItemNameEdit" v-model="orderItemName">
              </div>
              <div class="form-group">
                下单日期：<input type="text" id="orderItemDateEdit" class="onlyread form-control" name="orderItemDateEdit" v-model="orderItemDate" readonly>
              </div>
              <div class="form-group">
                收货地址：
                <select class="form-control selectpro" :id="cmbProvince1" name="cmbProvince1" ></select>
                <select class="form-control selectpro" :id="cmbCity1" name="cmbCity1" ></select>
                <select class="form-control selectpro" :id="cmbArea1" name="cmbArea1" ></select>
                <input type="text" placeholder="详细地址"  id="orderItemAddressEdit" name="orderItemAddressEdit" v-model="orderItemAddress">
              </div>

              <div class="form-group">
                收货人手机号：<input type="text" id="orderItemPhoneEdit" class="form-control" name="orderItemPhoneEdit" v-model="orderItemPhone">
              </div >
              <div class="form-group">
                金额：<input type="text" id="orderItemPriceEdit" class="form-control" name="orderItemPriceEdit" v-model="orderItemPrice">
              </div>
              <div class="form-group">
                状态：<input type="text" id="orderItemStateEdit" class="form-control" name="orderItemStateEdit" v-model="orderItemState">
              </div >
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
              <button type="submit" class="btn btn-primary" @click="editOrderItem" v-model="orderItemonlyId">修改</button>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div><!-- /.modal -->
    </form>
  </div>
</template>

<script>
  import {addressInit} from '../../assets/addressInit';
    export default {
        name: "orderItem",
      data:function () {
        return {
          orderItemArray: [],
          message: "",
          // orderItemEdit:"orderItemEdit",
          pageTotal: 1,//总页数
          currentPage: 1,//当前页
          orderItemId:"",
          orderItemonlyId:"",
          orderItemName:"",
          orderItemDate:"",
          orderItemAddress:"",
          orderItemPhone:"",
          orderItemPrice:"",
          orderItemState:"",
          defaultProvince:"",
          defaultCity:"",
          defaultArea:"",
          cmbProvince1:"cmbProvince1",
          cmbCity1:"cmbCity1",
          cmbArea1:"cmbArea1",
          cityArr: [],
          districtArr: []
        }
      },
      activated:function () {
        var that = this;
        //  查询数据库中有几条数据，算出有多少页
        getAllorderItem(that);
        getAllorderItemCount(that);
      },
      methods:{
        //查询框内容
        change(){
          var that = this;
          getAllorderItem(that);
          getAllorderItemCount(that);
        },
        //上一页
        toPre(){
          var that = this;
          this.currentPage--;
          if(this.currentPage<1){
            this.currentPage=1;
            alert("这是第一页");
          }
          getAllorderItem(that);
        },
        //下一页
        toNext(){
          var that = this;
          this.currentPage++;
          if(this.currentPage>this.pageTotal){
            this.currentPage=this.pageTotal;
            alert("这是最后一页");
          }else {
            getAllorderItem(that);
          }
        },
        //按时间降序排列
        timeDesc(){
          var that = this;
          this.$axios.get("/api/manage_getAllorderItemtimeDesc.do?currentPage="+that.currentPage)
            .then(resp=>{
              that.orderItemArray = resp.data;
            });
        },
        //按时间升序排列
        timeAsc(){
          var that = this;
          this.$axios.get("/api/manage_getAllorderItemtimeAsc.do?currentPage="+that.currentPage)
            .then(resp=>{
              that.orderItemArray = resp.data;
            });
        },
        //按价格降序排列
        priceDesc(){
      var that = this;
      this.$axios.get("/api/manage_getAllorderItempriceDesc.do?currentPage="+that.currentPage)
        .then(resp=>{
          that.orderItemArray = resp.data;
        });
    },
    //按价格升序排列
        priceAsc(){
      var that = this;
      this.$axios.get("/api/manage_getAllorderItempriceAsc.do?currentPage="+that.currentPage)
        .then(resp=>{
          that.orderItemArray = resp.data;
        });
    },
        //修改订单信息
        getOrderItemById(index){
          this.$axios.get("/api/manage_getorderItemById.do?index="+index)
            .then(resp=>{
              this.orderItemonlyId=resp.data[0].orderId;
              this.orderItemId=resp.data[0].orderNum;
              this.orderItemName=resp.data[0].name;
              this.orderItemDate=resp.data[0].ordertime;
              this.defaultProvince=resp.data[0].province;
              this.defaultCity=resp.data[0].city;
              this.defaultArea=resp.data[0].district;
              addressInit(this.cmbProvince1, this.cmbCity1, this.cmbArea1,this.defaultProvince,this.defaultCity,this.defaultArea);
              this.orderItemAddress=resp.data[0].address;
              this.orderItemPhone=resp.data[0].phone;
              this.orderItemPrice=resp.data[0].total;
              this.orderItemState=resp.data[0].state;
            });
        },
        editOrderItem(){
            var that=this;
          this.$axios.get("/api/manage_editOrderItem.do?index="+this.orderItemonlyId+"&&orderItemName="+this.orderItemName+
            "&&defaultProvince="+this.defaultProvince+"&&defaultCity="+this.defaultCity+"&&defaultArea="+this.defaultArea+
            "&&orderItemAddress="+this.orderItemAddress+"&&orderItemPhone="+this.orderItemPhone+"&&orderItemPrice="+this.orderItemPrice+
            "&&orderItemState="+this.orderItemState)
            .then(resp=>{
              getAllorderItem(that);
              getAllorderItemCount(that);
            });
          $('#orderItemEdit').modal('hide');
        // this.orderItemEdit.modal.hidden;
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
        },
        //删除订单信息
        delOrderItem(index){
            var that=this;
          this.$confirm('此订单里还有数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.$axios.get("/api/manage_delorderItemById.do?orderId="+index)
              .then(function (res) {
                getAllorderItem(that);
                getAllorderItemCount(that);
              });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
      },
      components:{
      },
    }
    function getAllorderItem(that){
      that.$axios.get("/api/manage_getAllorderItem.do?proname="+that.message+"&&currentPage="+that.currentPage)
        .then(resp=>{
          that.orderItemArray = resp.data;
        });
    }
    function getAllorderItemCount(that) {
      that.$axios.get("/api/manage_getAllorderItemCount.do?proname="+that.message)
        .then(resp=>{
          that.pageTotal=resp.data;
        });
    }
</script>

<style scoped>

  @font-face {font-family: "iconfont";
    src: url('../../assets/font_edtgn2sh1ll/iconfont.eot'); /* IE9*/
    src: url('../../assets/font_edtgn2sh1ll/iconfont.eot#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../../assets/font_edtgn2sh1ll/iconfont.woff') format('woff'), /* chrome, firefox */
    url('../../assets/font_edtgn2sh1ll/iconfont.ttf') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('../../assets/font_edtgn2sh1ll/iconfont.svg#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:12px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color: #aedaaf;
  }
  .app{
    margin-top: 4%;
    width: 100%;
    height: 500px;
    background-color: white;
    border-radius: 5px;
  }
  .orderItem-header{
    width: 100%;
    padding: 5% 8% 5% 2%;
    /* background-color: red;*/
    color: black;
    font-size: 14px;
  }
  .orderItem-words{
    float: left;
  }
  .orderItem-query{
    float: left;
    margin-left: 10%;
  }
  .orderItem-query>input{
    border: 1px solid gainsboro;
    outline: none;
    width: 150px;
    border-radius: 5px;
    height: 21px;
  }
  .orderItem-add{
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
  .orderItem-content{
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
  .orderItem-more{
    cursor: pointer;
    background-color: #edc581;
  }
  .orderItem-edit{
    background-color: #89B47C;
  }
  .orderItem-delete{
    background-color: #DC7856;
  }
  .orderItem-footer{
    margin-top: 1%;
    text-align: center;
  }
  .orderItem-footer>button{
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    color: white;
    height: 25px;
    font-size: 12px;
    width: 5%;
    /*padding: 0 1%;*/
    background-color: #DDE276;
  }
  .divspan {
    display: inline-block;
    position: relative;
  }
  .topspan{
    position: absolute;
    top: -18px;
    cursor: pointer;
  }
  .buttonspan{
    position: absolute;
    top: -9px;
    cursor: pointer;
  }
  .onlyread{
    cursor: not-allowed;
  }
  #orderItemAddressEdit{
    border-left: none;
    border-top: none;
    border-right: none;
    width: 466px;
  }
  .selectpro{
    margin-bottom: 5px;
  }

</style>
