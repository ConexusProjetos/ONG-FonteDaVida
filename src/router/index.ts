import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CadastroView from '@/views/CadastroView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import PessoasView from '@/views/PessoasView.vue'
import TurmaView from '@/views/TurmaView.vue'
import { useAuthStore } from '@/stores/auth'
import { Role } from '@/types/role'
import AdminView from '@/views/AdminView.vue'
import { usuarioInformacoes } from '@/utils/userInfos'

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
    {
      path: '/pessoas',
      name: 'pessoas',
      component: PessoasView,
      meta: { requiresRole: Role.ADMIN },
    },
    {
      path: '/turmas',
      name: 'turmas',
      component: TurmaView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresRole: Role.ADMIN },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

// caso queria deixar uma rota privada para algum tipo de usuario, utilize meta: { requiresRole: Role.ADMIN, ou Role.educador ou Role.visualizador, lembrando que o admin pode ver tudo! },

// caso queira transformar um rota pública, coloque a propriedade name dela aqui nesse array
const publicRoutes = new Set(['login', 'cadastro'])
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const token = authStore.token || localStorage.getItem('token')

  const isPublic = publicRoutes.has(to.name as string)
  if (!isPublic && !token) {
    return next('/login')
  }
  if (isPublic && token) {
    return next('/')
  }
  if (token) {
    const payload = usuarioInformacoes()

    if (!payload) return next('/login')

    const userRole = payload.role as Role

    if (to.meta.requiresRole && userRole !== to.meta.requiresRole) {
      return next({ name: 'NotFound' })
    }
  }

  next()
})

export default router
