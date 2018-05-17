import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'

import store from '@/app/store'
import Login from '@/components/Login'
import Main from '@/components/Main'
import { mainRouteName, availableRouteName } from '../constants'

// const Login: AsyncComponent = (): any => import('@/components/Login')
// const Main: AsyncComponent = (): any => import('@/components/Main')

Vue.use(Router)

const loginRouteName = 'Login'

const routes: RouteConfig[] = [
  {
    path: '/',
    name: mainRouteName,
    component: Main,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: '/available',
    name: availableRouteName,
    component: Main,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: '/login',
    name: loginRouteName,
    component: Login,
    meta: {
      isAuthRequired: false
    }
  }
]

const router: Router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.isAuthRequired) &&
    !store.getters.isLoggedIn) {
    next({ path: '/login' })
    return
  }
  if (to.name === loginRouteName && store.getters.isLoggedIn) {
    next({ path: '/' })
  }
  next()
})

export default router
