import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";

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
      requiresAuth: true
    }
  },
  {
    path: '/administration',
    name: 'Administration',
    component: () => import( /* webpackChunkName: "Administration" */ '../views/Administration.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/edition/:id',
    name: 'Edition',
    component: () => import( /* webpackChunkName: "Edition" */ '../views/Edition.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
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


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (getAuth().currentUser) {
      //console.log('currentUser '+getAuth().currentUser.email)
      next({})
    } else {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user)
          next({})
        else
          next({
            path: '/'
          })
      })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router