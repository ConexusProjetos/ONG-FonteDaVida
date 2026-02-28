import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CadastroView from '@/views/CadastroView.vue'
// 1. Importe o componente da página 404 (crie este arquivo em views)
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView,
    },
    // 2. Rota para capturar qualquer URL que não exista (Catch-all)
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      // Opcional: meta: { requiresAuth: true } se quiser proteger a 404
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.name === 'login' || to.name === 'cadastro') && token) {
    next('/')
  } else {
    next()
  }
})

export default router
