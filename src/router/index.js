import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "Login" */ '../views/Login.vue')
  },
    {
    path: '/register',
    name: 'Register',
    component: () => import( /* webpackChunkName: "Register" */ '../views/Register.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import( /* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: {
      requiredAuth: true
    },
  },
  {
    path: '/administration',
    name: 'Administration',
    component: () => import( /* webpackChunkName: "Administration" */ '../views/Administration.vue'),
    meta: {
      requiredAuth: true
    },
  },
  {
    path: '/edition/:id',
    name: 'Edition',
    component: () => import( /* webpackChunkName: "Edition" */ '../views/Edition.vue'),
    props: true,
    meta: {
      requiredAuth: true
    },
  },
  {
    path: '*',
    redirect: '/login'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router