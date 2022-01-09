import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [

  {
    path: '/accueil',
    name: 'accueil',
    component: () => import('../views/accueil.vue')
  },
  {
    path: '/',
    name: 'acces',
    component: () => import('../views/acces.vue')
  }
  ,
  {
    path: '/inscription',
    name: 'sinscrire',
    component: () => import('../views/sinscrire.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
