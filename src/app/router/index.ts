import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import Login from '@/components/Login'
import Main from '@/components/Main'

// const Login: AsyncComponent = (): any => import('@/components/Login')
// const Main: AsyncComponent = (): any => import('@/components/Main')

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      isAuthRequired: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isAuthRequired: false
    }
  }
]

const router: Router = new Router({
  routes
})

export default router
