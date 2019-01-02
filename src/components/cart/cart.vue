<template>
  <div class="app">
    <div class="cart-header">
      <div class="cart-words">购物车</div>
      <div class="cart-query">根据商品名查询：<input type="text" v-model="message" v-on:input="change"/> </div>
    </div>
    <div class="cart-content">
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
        <tr v-for="cartArray in cartArray">
          <td>{{cartArray.ps_id}}</td>
          <td>{{cartArray.userId}}</td>
          <td>{{cartArray.proName}}&nbsp;{{cartArray.w_wood}}&nbsp;{{cartArray.ci_color}}&nbsp;{{cartArray.fv_name}}</td>
          <td><img :src="'api'+cartArray.imgaddress" alt="" :title="+cartArray.proName"></td>
          <td>{{cartArray.count}}</td>
          <td>
            {{cartArray.subtotal}}
            <!--<router-link :to="{path:'/cartAddress',query:{id:cartArray.userId}}" tag="td">-->
              <!--<button class="cart-more">详情</button>-->
            <!--</router-link>-->
          </td>
          <td class="operate"></td>
          <td class="operate"></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="cart-footer">
      <button class="pre" @click="toPre">上一页</button>
      <span class="page" >{{currentPage}}/{{pageTotal}}</span>
      <button class="next" @click="toNext">下一页</button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cart",
        data:function () {
          return {
            cartArray:[],
            message:"",
            pageTotal:1,//总页数
            currentPage:1,//当前页
          }
      },
      activated:function () {
        var that = this;
        //  查询数据库中有几条数据，算出有多少页
        getAllcart(that);
        getAllcartCount(that);
      },
      methods:{
        //查询框内容
        change(){
          var that = this;
          getAllcartCount(that);
          getAllcart(that);
        },
        //上一页
        toPre(){
          var that = this;
          this.currentPage--;
          if(this.currentPage<1){
            this.currentPage=1;
            alert("这是第一页");
          }
          getAllcart(that);
        },
        //下一页
        toNext(){
          var that = this;
          this.currentPage++;
          if(this.currentPage>this.pageTotal){
            this.currentPage=this.pageTotal;
            alert("这是最后一页");
          }else {
            getAllcart(that);
          }
        }
      },
      components:{
      },
    }
  function getAllcart(that){
    that.$axios.get("/api/manage_getAllcart.do?proname="+that.message+"&&currentPage="+that.currentPage)
      .then(resp=>{
        that.cartArray = resp.data;
      });
  }
  function getAllcartCount(that) {
    that.$axios.get("/api/manage_getAllcartCount.do?proname="+that.message)
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
.cart-header{
  width: 100%;
  padding: 5% 8% 5% 2%;
  /* background-color: red;*/
  color: black;
  font-size: 14px;
}
.cart-words{
  float: left;
}
.cart-query{
  float: left;
  margin-left: 10%;
}
.cart-query>input{
  border: 1px solid gainsboro;
  outline: none;
  width: 150px;
  border-radius: 5px;
  height: 21px;
}
.cart-content{
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
.cart-more{
  background-color: #edc581;
}
.cart-edit{
  background-color: #89B47C;
}
.cart-delete{
  background-color: #DC7856;
}
/*.operate{
  text-align: left;
}*/
.cart-footer{
  margin-top: 1%;
  text-align: center;
}
.cart-footer>button{
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
