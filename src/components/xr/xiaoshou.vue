<!--Created by xr on 2018/12/12.-->
<template>
    <div class="xiaoshou">
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
    export default {
        name: 'myxiaoshou',
      created () {
//          console.log(this.myChart)
//        console.log(this.$session);
        if(this.$session.name==undefined||this.$session.password==undefined||this.$session.name==""||this.$session.password==""){
          this.$router.push({path:'/'});
        }
//        this.$axios.get('http://localhost:8888/manage_xiaoshou')
//          .then((res)=>{
//              for(let i=0;i<res.data.length;i++){
//                this.myChart.xAxis.data.push(res.data[i].name)
//              }
////            console.log(this.myChart.xAxis.data);
//              for(let i=0;i<res.data.length;i++){
//                this.myChart.series[0].data.push(res.data[i].value)
//              }
////            console.log(this.myChart.series[0].data)
//              for(let i=0;i<res.data.length;i++){
//                this.myChart1.xAxis.data.push(res.data[i].name)
//              }
////            console.log(this.myChart1.xAxis.data);
//              console.log(this.$session);
//
//              for(let i=0;i<res.data.length;i++){
//                this.myChart1.series[0].data.push(res.data[i].value)
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
            title: { text: '家居销售数量' },
            tooltip: {},
            xAxis: {data: ["餐厨","家居","摆件","养护","园艺","数码","文具","配饰"]},
            yAxis: {type : 'value'},
            series: [{
              name: '销量',
              type: 'bar',
              data: [30, 20, 36, 47, 10, 20,40,90]
            }]
          },
          myChart1:{
            title: { text: '家居销售金额' },
            tooltip: {},
            xAxis: {data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},
            yAxis: {type : 'value'},
            series: [{
              name: '销量',
              type: 'line',
              data: [3500, 5000, 7000, 6500, 4089, 7480,5360,4500,4360,6690,7850,5560]
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
    .xiaoshou {
    }
    #myChart{
      float: left;
    }
    #myChart1 {
      float: left;
    }
</style>
