
<template>
  <div class="app">
    <div id="myChart" :style="{width: '45%', height: '500px'}"></div>
    <div id="myChart1" :style="{width: '45%', height: '500px'}"></div>
  </div>

</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入饼图组件
  require('echarts/lib/chart/pie');
  require("echarts/lib/chart/bar");
  require("echarts/lib/chart/line");
  // 引入提示框和图例组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');
  import Schart from 'vue-schart';
  import mysChart_zhu from './sChart_zhu.vue';
    export default {
      name: 'mysChart_zhu',
      created () {
        if(this.$session.name==undefined||this.$session.password==undefined||this.$session.name==""||this.$session.password==""){
          this.$router.push({path:'/'});
        }
//        this.$axios.get('http://localhost:8888/manage_getTu')
//          .then((res)=>{
//              for(let i=0;i<res.data[0].length;i++){
//                this.myChart.xAxis.data.push(res.data[0][i])
//              }
////            console.log(this.myChart.xAxis.data);
//              for(let i=0;i<res.data[1].length;i++){
//                this.myChart.series[0].data.push(res.data[1][i])
//              }
////            console.log(this.myChart.series[0].data)
//              for(let i=0;i<res.data[0].length;i++){
//                this.myChart1.xAxis.data.push(res.data[0][i])
//              }
////            console.log(this.myChart1.xAxis.data);
//              console.log(this.$session);
//
//              for(let i=0;i<res.data[1].length;i++){
//                this.myChart1.series[0].data.push(res.data[1][i])
//              }
////            console.log(this.myChart1.series[0].data)
////            console.log(this.$session)
//              /*this.drawLine()*/
//            }
//          )
      },
      data () {
        return {
          msg: 'Welcome to Your Vue.js App',
          myChart:{
            title: { text: '家具月份销售数量' },
            tooltip: {},
            xAxis: {data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},
            yAxis: {type : 'value'},
            series: [{
              name: '销量',
              type: 'bar',
              data: [3000, 5000, 7000, 6500, 4089, 7480,5360,4500,4360,6690,7850,5560]
            }]
          },
          myChart1:{
            title: { text: '家具月份销售额' },
            tooltip: {},
            xAxis: {data: ["椅","桌","床","几","柜","沙发","一枚板","其他"]},
            yAxis: {type : 'value'},
            series: [{
              name: '销量',
              type: 'line',
              data: [5, 20, 36, 10, 10, 20,40,30,50]
            }]
          }
        }
      },
      mounted(){
        this.drawLine();
      },
      methods: {


        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'));
          let myChart1 = this.$echarts.init(document.getElementById('myChart1'));
          // 绘制图表
          myChart.setOption(this.myChart)
          myChart1.setOption(this.myChart1)
        },
      },

    }
</script>
<style scoped>
  .app{
    height: 500px;
    overflow: hidden;
  }
    #myChart{
      float: left;
    }
    #myChart1{
      float: left;
    }
</style>
