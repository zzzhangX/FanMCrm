<template>
  <div class="app">
    <router-link to="/orderItem" tag="button" class="back">返回</router-link>
    <div class="orderDetails-header">
      <div class="orderDetails-words">订单详情表</div>
      <div class="orderDetails-query">根据商品名查询：<input type="text" v-model="message" v-on:input="change"/> </div>
    </div>
    <div class="orderDetails-content">
      <table>
        <thead>
        <tr>
          <th>商品ID</th>
          <th>用户ID</th>
          <th>商品名</th>
          <th>图片</th>
          <th>数量</th>
          <th>单价</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="orderDetailsArray in orderDetailsArray">
          <td>{{orderDetailsArray.orderId}}</td>
          <td>{{orderDetailsArray.userId}}</td>
          <td>{{orderDetailsArray.proName}}&nbsp;{{orderDetailsArray.w_wood}}&nbsp;{{orderDetailsArray.ci_color}}&nbsp;{{orderDetailsArray.fv_name}}</td>
          <td><img :src="'api'+orderDetailsArray.imgaddress" alt="" :title="+orderDetailsArray.proName"></td>
          <!--<td><span id="reduce" class="numspan" @click="reducenum(orderDetailsArray.od_num)">-</span><span>{{orderDetailsArray.od_num}}</span><span id="add_num" class="numspan" @click="addnum">+</span></td>-->
          <td>{{orderDetailsArray.od_num}}</td>
          <td>
            {{orderDetailsArray.ps_price}}
            <!--<router-link :to="{path:'/orderDetailsAddress',query:{id:orderDetailsArray.userId}}" tag="td">-->
            <!--<button class="orderDetails-more">详情</button>-->
            <!--</router-link>-->
          </td>
          <!--<td class="operate"><button class="orderDetails-edit" @click="editOrderDetails(orderDetailsArray.od_id)">修改</button></td>-->
          <td class="operate"><button class="orderDetails-delete" @click="delOrderDetails(orderDetailsArray.od_id)">删除</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="orderDetails-footer">
      <button class="pre" @click="toPre">上一页</button>
      <span class="page" >{{currentPage}}/{{pageTotal}}</span>
      <button class="next" @click="toNext">下一页</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "orderDetails",
      data:function () {
        return {
          orderDetailsArray:[],
          message:"",
          pageTotal:1,//总页数
          currentPage:1,//当前页
          currentGoodsNum:null
        }
      },
      activated:function () {
        var that = this;
        //  查询数据库中有几条数据，算出有多少页
        getAllorderDetails(that);
        getAllorderDetailsCount(that);
      },
      methods:{
        //查询框内容
        change(){
          var that = this;
          getAllorderDetailsCount(that);
          getAllorderDetails(that);
        },
        //上一页
        toPre(){
          var that = this;
          this.currentPage--;
          if(this.currentPage<1){
            this.currentPage=1;
            alert("这是第一页");
          }
          getAllorderDetails(that);
        },
        //下一页
        toNext(){
          var that = this;
          this.currentPage++;
          if(this.currentPage>this.pageTotal){
            this.currentPage=this.pageTotal;
            alert("这是最后一页");
          }else {
            getAllorderDetails(that);
          }
        },
        //修改订单详情信息
        editOrderDetails(index){
          console.log(index);
        },
        //删除订单信息
        delOrderDetails(index){
          this.$confirm('删除后无法恢复, 是否继续?', '提示', {
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

              });
            getAllorderDetailsCount(this);
            getAllorderDetails(this);

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },

        // var currentGoodsNum;
        // reducenum(num){
        //   console.log(this);
        //   this.currentGoodsNum=num-1;
        //   // this.$axios.get("/api/manage_reducenumorderDetails.do?num="+this.currentGoodsNum)
        //   //   .then(resp=>{
        //   //     // this.orderDetailsArray = resp.data;
        //   //   });
        // },
      },

    }
    // var currentGoodsNum;
    // $("#reduce").on("click",function () {
    //   console.log("点击我了");
    //   currentGoodsNum = parseInt($(this).next().html())-1;
    //   $(this).next().html(currentGoodsNum);
    //
    // });
    function getAllorderDetails(that){
      that.$axios.get("/api/manage_getAllorderDetails.do?",{params:{id:that.$route.query.id,proname:that.message,currentPage:that.currentPage}})
        .then(resp=>{
          that.orderDetailsArray = resp.data;
        });
    }
    function getAllorderDetailsCount(that) {
      that.$axios.get("/api/manage_getAllorderDetailsCount.do?",{params:{id:that.$route.query.id,proname:that.message}})
        .then(resp=>{
          that.pageTotal=resp.data;
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
  .orderDetails-header{
    width: 100%;
    padding: 5% 8% 5% 2%;
    /* background-color: red;*/
    color: black;
    font-size: 14px;
  }
  .orderDetails-words{
    float: left;
  }
  .orderDetails-query{
    float: left;
    margin-left: 10%;
  }
  .orderDetails-query>input{
    border: 1px solid gainsboro;
    outline: none;
    width: 150px;
    border-radius: 5px;
    height: 21px;
  }
  .orderDetails-content{
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
  .orderDetails-more{
    background-color: #edc581;
  }
  .orderDetails-edit{
    background-color: #89B47C;
  }
  .orderDetails-delete{
    background-color: #DC7856;
  }
  /*.operate{
    text-align: left;
  }*/
  .orderDetails-footer{
    margin-top: 1%;
    text-align: center;
  }
  .orderDetails-footer>button{
    border: none;
    outline: none;
    border-radius: 5px;
    color: white;
    height: 25px;
    font-size: 12px;
    width: 5%;
    background-color: #DDE276;
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
  .numspan{
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 18px;
    background-color: #dcdcdc;
    text-align: center;
    color: #9a9a9a;
    /*border: 1px solid rgba(0, 0, 0, 0.8);*/
    cursor: pointer;
  }
</style>
