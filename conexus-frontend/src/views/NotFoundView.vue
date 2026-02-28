<template>
  <div class="page">
    <div class="card">
      <div class="header">
        <h1>404</h1>
        <p>Página não encontrada 🌿</p>
      </div>
      <p style="text-align: center; color: #6b7280; margin-bottom: 20px">
        Ops! A página que você está procurando não existe.
      </p>
      <button @click="irParaInicio">Voltar para Início</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function irParaInicio() {
  router.push('/')
}
</script>

<style scoped>
/* Reaproveite o CSS das outras telas (page, card, header, button) */
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
  color: #c62828; /* Vermelho de erro */
  font-size: 48px;
  margin-bottom: 0;
}
.header p {
  color: #6b7280;
  font-size: 18px;
}
button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  background-color: #2e7d32;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
