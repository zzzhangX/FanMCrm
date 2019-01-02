<template>
    <div class="sChart">
      <schart :canvasId="canvasId"
              :type="type"
              :width="width"
              :height="height"
              :data="detail"
              :options="options"
      ></schart>
    </div>
</template>

<script>
  import Schart from 'vue-schart';
    export default {
        name: 'mysChart',
        data () {
            return {
              canvasId: 'myCanvas',
              type: 'bar',
              width: 500,
              height: 800,
              detail: [],
              options: {
                title: '柱形图'
              },
            }
            },
      created () {
        this.$axios.get('http://localhost:8888/manage_tu')
          .then((res)=>{
            for(let i=0;i<res.data.length;i++){
              this.detail.push(res.data[i])
            }
          })
      },
        methods: {},
      components:{
        Schart
      }
    }

</script>
<style scoped>
    .sChart {
      width: 900px;
    }
</style>
