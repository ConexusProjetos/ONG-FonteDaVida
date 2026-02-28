import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Tenta carregar o token salvo anteriormente ao iniciar a aplicação
    token: localStorage.getItem('token') as string | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem('token', token) // Salva no navegador
    },
    logout() {
      this.token = null
      localStorage.removeItem('token') // Remove ao deslogar
    },
  },
})
