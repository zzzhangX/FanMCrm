// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//引入elementui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import router from './router'
//引入axios
import axios from 'axios';
/*引入store*/
import store from './store/store';
/*引入jq*/
import $ from 'jquery';
/*引入bootstrap*/

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
/*引入echarts*/
import echarts from "echarts"

Vue.use(ElementUI);//使用elementUI组件

Vue.config.productionTip = false;

Vue.prototype.$session={name:"",password:""};

Vue.prototype.$axios=axios;
// Vue.prototype.$host="http://172.16.6.10:8888/";
// Vue.prototype.$host="http://172.16.6.47:8888/";

Vue.prototype.$echarts = echarts;

Vue.prototype.$host="http://localhost:8888/";

Vue.use(ElementUI);//使用elementUI组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
