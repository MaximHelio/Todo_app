import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoView from '@/pages/TodoView'
import SignupView from '@/pages/SignupView'
import LoginView from '@/pages/LoginView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/todos',
    name: 'TodoView',
    component: TodoView,
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
