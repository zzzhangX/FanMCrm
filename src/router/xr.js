import login from '@/components/xr/login'

import myxiaoshou from '@/components/xr/xiaoshou'
import mysChart_zhe from '@/components/xr/sChart_zhe'

export default [
  {
    path: '/myxiaoshou',
    name: 'myxiaoshou',
    component: myxiaoshou
  },
  //
  // {
  //   path: '/mysChart_zhu',
  //   name: 'mysChart_zhu',
  //   component: mysChart_zhu
  // },
  {
    path: '/index',
    name: 'mysChart_zhe',
    component: mysChart_zhe
  },
]

