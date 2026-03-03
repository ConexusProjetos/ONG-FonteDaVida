<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h1>Conexus ONG</h1>
        <p>Bem-vindo de volta! 🌿</p>
      </div>

      <div v-if="erro" class="error-box">
        {{ erro }}
      </div>

      <form @submit.prevent="fazerLogin">
        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="email@exemplo.com" required />
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="senha" placeholder="********" required />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <p class="footer-text">
        Ainda não tem uma conta?
        <span @click="router.push('/cadastro')">Cadastre-se</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import auth from '@/service/auth'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const email = ref('')
const senha = ref('')
const erro = ref('')
const loading = ref(false)
const authStore = useAuthStore()

async function fazerLogin() {
  erro.value = ''
  loading.value = true
  const body = {
    email: email.value,
    senha: senha.value,
  }

  const response = await auth.login(body)
  loading.value = false

  if (response.status === 200) {
    authStore.setToken(response.data.tokenDeAcesso)
    router.push('/')
  } else {
    erro.value = 'Email ou senha incorretos.'
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background-color: #e8f5e9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.card {
  background: #ffffff;
  width: 100%;
  max-width: 420px;
  padding: 35px;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.header {
  text-align: center;
  margin-bottom: 25px;
}

.header h1 {
  color: #2e7d32;
  font-size: 26px;
  margin-bottom: 6px;
}

.header p {
  color: #6b7280;
  font-size: 14px;
}

.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 14px;
  margin-bottom: 6px;
  color: #2e7d32;
  font-weight: 600;
}

.form-group input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #c8e6c9;
  font-size: 14px;
  transition: 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #2e7d32;
  box-shadow: 0 0 0 2px rgba(46, 125, 50, 0.15);
}

button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background-color: #2e7d32;
  color: white;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #1b5e20;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-box {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 13px;
  text-align: center;
}

.footer-text {
  margin-top: 20px;
  text-align: center;
  font-size: 13px;
  color: #6b7280;
}

.footer-text span {
  color: #2e7d32;
  font-weight: bold;
  cursor: pointer;
}

.footer-text span:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .card {
    padding: 25px;
  }
}
</style>
