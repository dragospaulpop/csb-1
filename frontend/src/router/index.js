import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '../views/IndexView.vue'
import LoginView from '../views/LoginView.vue'
import feathers from '@/feathers'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAnonymous: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await feathers.reAuthenticate()
      next()
    } catch (err) {
      next({ name: 'login' })
    }
  }

  if (to.meta.requiresAnonymous) {
    try {
      await feathers.reAuthenticate()
      next({ name: 'home' })
    } catch (err) {
      next()
    }
  }

  next()
})

export default router
