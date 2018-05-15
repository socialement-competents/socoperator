import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig } from 'vue-router'

const HelloWorld: AsyncComponent = (): any => import('@/components/HelloWorld')
const Login: AsyncComponent = (): any => import('@/components/Login')
const Main: AsyncComponent = (): any => import('@/components/Main')

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/login',
    component: Login,
    meta: {
      conditionalRoute: true
    }
  },
  {
    path: '/app',
    component: Main,
    meta: {
      isAuthRequired: true
    }
  }
]

const router: Router = new Router({
  mode: 'history',
  base: '/',
  routes
})

export default router
