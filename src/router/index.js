import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Enroll from '../views/Enroll.vue'
import bookEnroll from '../views/bookEnroll.vue'
import bookDetailEnroll from '../views/bookDetailEnroll.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Manager',
    name:'Manager',
    component: Enroll
  },
  {
    path:'/bookenroll',
    name:'bookenroll',
    component : bookEnroll
  },
  {
    path:'/detailenroll',
    name:'detailenroll',
    component : bookDetailEnroll
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
