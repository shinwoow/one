import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import PageLayout from '../components/NAV/PageLayout.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '',
    redirect: '/home',
  
  },
  {
    path: '/',
    name: 'Home',
    component: PageLayout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('../views/Home/Home.vue')
    }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
