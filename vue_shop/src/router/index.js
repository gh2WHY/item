import Vue from 'vue';

import Router from 'vue-router';

import Login from '../components/common/login.vue';
import Home from '../views/Home.vue'

Vue.use(Router);
let routes = [
  {
    path : '/',
    redirect: '/login',
  },
  {
    path : '/login',
    component : Login,
  },
  {
    path : '/home',
    component : Home,
  }
];
const router = new Router({
  routes,
})

router.beforeEach((to, from, next) => {
  //to 即将要去的页面
  //from 从哪里来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
