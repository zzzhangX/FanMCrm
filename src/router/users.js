/**
 * Created by xml on 2018/12/2.
 */
import users from '@/components/users/users'
import usersAddress from '@/components/users/usersAddress'
export default [
  {
    path: '/users',
    name: 'users',
    component: users
  },{
    path: '/usersAddress',
    name: 'usersAddress',
    component: usersAddress
  },
]
