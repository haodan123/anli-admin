import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import layout from '@/layout/index.vue'
import routes from '@/router/module/defulte.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/huadong',
    name: 'huadong',
    meta: { title: '滑动', keepAlive: true },
    component: () => import(/* webpackChunkName: "redirect" */ '@/views/huadong/index.vue')
  },
  {
    path: '/gsap',
    name: 'ceshi',
    meta: { title: '滑动', keepAlive: true },
    component: () => import(/* webpackChunkName: "redirect" */ '@/viewsGsap/AnimatedSectionsGSAP/index.vue')
  }
  , ...routes]
})

export default router
