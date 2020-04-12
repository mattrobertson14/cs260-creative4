import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Puppies from '../views/Puppies.vue'
import PuppyOverview from '../views/PuppyOverview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/puppies',
    name: 'Puppies',
    component: Puppies,
  },
  {
    path: '/puppies/:id',
    name: 'PuppyInfo',
    component: PuppyOverview
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
