import Vue from 'vue'
import Router from 'vue-router'
import goods from './goods'

import format from './format'

import xr from './xr'
import users from './users'
import admin from './admins'
import personalCenter from './personalCenter'
import cart from './cart'
import orderItem from './orderItem'
import employee from './employee'
import lanmu from './lanmu'

Vue.use(Router);
export default new Router({
  routes: [
    ...goods,
    ...format,
    ...xr,
    ...xr,
    ...cart,
    ...orderItem,
    ...users,
    ...employee,
    ...admin,
    ...personalCenter,
    ...lanmu,
  ]
})
