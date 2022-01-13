import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

  {
    path: '/accueil',
    name: 'accueil',
    component: () => import('../views/accueil.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: {
      requiresAuth: false
    }
  }
  ,
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/signup.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  hash: false,

  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next();
    }
  } else {
    next();
  }
})
export default router
