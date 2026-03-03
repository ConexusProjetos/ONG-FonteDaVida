<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h1>Conexus ONG</h1>
        <p>Juntos por um futuro melhor 🌿</p>
      </div>

      <div v-if="erro" class="error-box">
        {{ erro }}
      </div>

      <form @submit.prevent="cadastrar">
        <div class="form-group">
          <label>Nome completo</label>
          <input type="text" v-model="nome" placeholder="Digite seu nome" />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="email@exemplo.com" />
        </div>

        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="senha" placeholder="********" />
        </div>

        <div class="form-group">
          <label>CPF</label>
          <input type="text" v-model="cpf" placeholder="Somente números" />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Cadastrando...' : 'Cadastrar-se' }}
        </button>
      </form>

      <p class="footer-text">
        Já possui conta?
        <span @click="router.push('/login')">Faça login</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import auth from '@/service/auth'
import type { AuthCadastro } from '@/types/auth'
import { ref } from 'vue'

const nome = ref('')
const email = ref('')
const senha = ref('')
const cpf = ref('')
const erro = ref('')
const loading = ref(false)

const router = useRouter()
async function cadastrar() {
  erro.value = ''
  loading.value = true

  const body: AuthCadastro = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    cpf: cpf.value,
  }
  const response = await auth.cadastro(body)
  loading.value = false
  if (response.status === 201) {
    alert('Usuário cadastrado com sucesso!')
    router.push('/login')
  } else if (response.status === 409) {
    alert('Usuário com email ou cpf já cadastrado!')
  } else {
    alert('Erro no servidor, tente novamente!')
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

/* Responsivo */
@media (max-width: 480px) {
  .card {
    padding: 25px;
  }
}
</style>
