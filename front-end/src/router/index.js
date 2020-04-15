import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Puppies from '../views/Puppies.vue'
import PuppyOverview from '../views/PuppyOverview.vue'
import Admin from '../views/Admin.vue'
import PuppyEdit from '../views/PuppyEdit.vue'

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
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/admin/puppies/:id',
    name: 'PuppyEdit',
    component: PuppyEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
