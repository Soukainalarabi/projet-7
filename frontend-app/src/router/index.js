import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  
  {
    path: '/accueil',
    name: 'accueil',
    component: () => import(/* webpackChunkName: "about" */ '../views/accueil.vue')
  },
  {
    path: '/',
    name: 'acces',
    component: () => import(/* webpackChunkName: "about" */ '../views/acces.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
