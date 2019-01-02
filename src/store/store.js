import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


const state={
  myId:0,
  myName:"未登录",
};

const mutations={
  changgeId(state,myId){
    state.myId=myId;
  },
  changgeName(state,myName){
    state.myName=myName;
  }
};
const actions={

};
export default new Vuex.Store({
  state,
  mutations,
  actions
})

