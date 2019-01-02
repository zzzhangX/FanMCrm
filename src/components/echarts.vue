<template>
    <div class="app">


      <div>
        <div id="yearCanvas" style="width:400px; height:300px;"></div>
      </div>

      <div class="header">
        <select name="" id="choose" @change="yearImg" v-model="yearChoose">
          <option v-for="yearArray in yearArray">
            {{yearArray}}
          </option>
        </select>
      </div>

      <div>
        <div id="monthCanvas" style="width:800px; height:300px;"></div>
      </div>

      <div>
        <div id="seasonCanvas" style="width:600px; height:300px;"></div>
      </div>

      <div>
        <div id="vipCanvas" style="width:600px; height:300px;"></div>
      </div>





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
        name: 'echarts',
        data: function () {
            return {

              yearChoose:"2016",

              year:{
               title:{
               text:'2016-2018年度销售额'
               },
               tooltip:{},
               legend:{
               data:['用户来源']
               },
               xAxis:{
               data:[]
               },
               yAxis:{
               },
               series:[{
               name:'金额',
               type:'bar', //设置图表主题
               data:[],
               itemStyle: {
               normal: {
               color:["gray"],
               // 阴影的大小
               shadowBlur: 0,
               // 阴影水平方向上的偏移
               shadowOffsetX: 0,
               // 阴影垂直方向上的偏移
               shadowOffsetY: 0,
               // 阴影颜色
               shadowColor: 'rgba(0, 0, 0, 0.5)'
               }
               },
               }]
               },
              yearArray:[],
              yearSaleArray:[],
              yearTotalArray:[],

              month:{
                title:{
                  text:'月销售额'
                },
                tooltip:{},
                legend:{
                  data:['用户来源']
                },
                xAxis:{
                  data:[]
                },
                yAxis:{
                },
                series:[{
                  name:'金额',
                  type:'line', //设置图表主题
                  data:[],
                  itemStyle: {
                    normal: {
                      color:["black"],
                      // 阴影的大小
                      shadowBlur: 0,
                      // 阴影水平方向上的偏移
                      shadowOffsetX: 0,
                      // 阴影垂直方向上的偏移
                      shadowOffsetY: 0,
                      // 阴影颜色
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                }]
              },
              monthArray:[],
              monthSaleArray:[],
              monthTotalArray:[],

              season:{
                title:{
                  text:'季销售额'
                },
                tooltip:{},
                legend:{
                  data:['用户来源']
                },
                xAxis:{
                  data:[]
                },
                yAxis:{
                },
                series:[{
                  name:'金额',
                  type:'line', //设置图表主题
                  data:[],
                  itemStyle: {
                    normal: {
                      color:["black"],
                      // 阴影的大小
                      shadowBlur: 0,
                      // 阴影水平方向上的偏移
                      shadowOffsetX: 0,
                      // 阴影垂直方向上的偏移
                      shadowOffsetY: 0,
                      // 阴影颜色
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                }]
              },
              seasonArray:[],
              seasonSaleArray:[],
              seasonTotalArray:[],

              vip:{
                title:{
                  text:'会员占比'
                },
                tooltip:{
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend:{
                  orient: 'horizontal',
                  x: 'left',
                  y: 'bottom',
                  bottom:5,
                  itemGap:30,
                  itemWidth:5,
                  textStyle: {
                    fontSize: 12,
                    color: '#303030'
                  },
                  align:'left',
                  data: [
                    {
                      name:'普通会员',
                      icon:'circle',
                    },
                    {
                      name:'白银会员',
                      icon:'circle'
                    },
                    {
                      name:'黄金会员',
                      icon:'circle'
                    },
                    {
                      name:'砖石会员',
                      icon:'circle'
                    }
                    ],


                },
                series:[{
                  name:'金额',
                  type:'pie',
                  data:[],
                  label: {
                    normal: {
                      show: true,
                      formatter: '{b}:{c}' + '\n\r' + '({d}%)'
                    }
                  },
                  itemStyle: {
                    normal: {
                      // 阴影的大小
                      shadowBlur: 0,
                      // 阴影水平方向上的偏移
                      shadowOffsetX: 0,
                      // 阴影垂直方向上的偏移
                      shadowOffsetY: 0,
                      // 阴影颜色
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                }]
              },
              vipArray:[]
            }
        },
        methods: {
              yearImg:function () {

                this.yearArray=[];
                this.yearSaleArray=[];
                this.yearTotalArray=[];

                this.monthArray=[];
                this.monthSaleArray=[];
                this.monthTotalArray=[];

                this.seasonArray=[];
                this.seasonSaleArray=[];
                this.seasonTotalArray=[];


                this.$axios.get('/api/manage-querySaleData.do?year='+this.yearChoose)
                  .then( (res)=> {



                    this.yearTotalArray=res.data.yearTotal;
                    this.monthTotalArray=res.data.monthTotal;
                    this.seasonTotalArray=res.data.quarterTotal;
                    this.vipArray=res.data.vip;


                    for(var i=0;i<12;i++){
                      if (this.monthTotalArray[i].MONTH!=(i+1)){
                        var month = {
                          MONTH:i+1,
                          monthTotal:0
                        };
                        this.monthTotalArray.splice(i,0,month);
                      }
                    }

                    for(var i=0;i<4;i++){
                      if (this.seasonTotalArray[i].season!=(i+1)){
                        var season = {
                          season:i+1,
                          seasonTotal:0
                        };
                        this.seasonTotalArray.splice(i,0,season);
                      }
                    }


                    for (var i=0;i<this.yearTotalArray.length;i++){
                      this.yearArray.push(this.yearTotalArray[i].YEAR);
                      this.yearSaleArray.push(this.yearTotalArray[i].yearTotal);
                    }

                    for(var i=0;i<this.monthTotalArray.length;i++){
                      this.monthArray.push(this.monthTotalArray[i].MONTH);
                      this.monthSaleArray.push(this.monthTotalArray[i].monthTotal);
                    }

                    for(var i=0;i<this.seasonTotalArray.length;i++){
                      this.seasonArray.push(this.seasonTotalArray[i].season);
                      this.seasonSaleArray.push(this.seasonTotalArray[i].seasonTotal);
                    }


                    this.year.xAxis.data=this.yearArray;
                    this.year.series[0].data=this.yearSaleArray;

                    this.month.xAxis.data=this.monthArray;
                    this.month.series[0].data=this.monthSaleArray;

                    this.season.xAxis.data=this.seasonArray;
                    this.season.series[0].data=this.seasonSaleArray;

                    this.vip.series[0].data=this.vipArray;



                    var yearCanvas = echarts.init(document.getElementById('yearCanvas'));
                    yearCanvas.setOption(this.year);

                    var monthCanvas = echarts.init(document.getElementById('monthCanvas'));
                    monthCanvas.setOption(this.month);

                    var seasonCanvas = echarts.init(document.getElementById('seasonCanvas'));
                    seasonCanvas.setOption(this.season);

                    var vipCanvas = echarts.init(document.getElementById('vipCanvas'));
                    vipCanvas.setOption(this.vip);
                  });
              },

        },
        mounted() {

          this.yearImg();


      },
        activated:function () {

        }
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
  .header{
    padding-bottom: 2%;
  }
  #choose{
    width: 10%;
  }
</style>
