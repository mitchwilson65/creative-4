import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Choose from '../views/Choose.vue'
import Upload from '../views/Upload.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/choose',
    name: 'choose',
    component: Choose
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
