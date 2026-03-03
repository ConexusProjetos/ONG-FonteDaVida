<template>
  <div class="home-container">
    <nav class="navbar">
      <div class="navbar-logo">
        <h1>Conexus ONG</h1>
      </div>

      <div class="navbar-links" :class="{ 'active': menuOpen }">
        <router-link to="/" @click="menuOpen = false">Home</router-link>
        <router-link to="/turmas" @click="menuOpen = false">Turmas</router-link>
        <router-link to="/admin" @click="menuOpen = false">Área do Administrador</router-link>
        <button @click="handleLogout" class="btn-logout">Sair</button>
      </div>

      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        ☰
      </button>
    </nav>

    <main class="content">
      <h2>Bem-vindo à Conexus</h2>
      <p>Esta é a sua área restrita.</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Importe sua store Pinia

const router = useRouter()
const authStore = useAuthStore()
const menuOpen = ref(false)

function handleLogout() {
  authStore.logout() // Chama a action de logout que definimos na store
  router.push('/login')
}
</script>

<style scoped>
/* Estilos Gerais */
.home-container {
  min-height: 100vh;
  background-color: #f9fbf9;
  font-family: Arial, Helvetica, sans-serif;
}

/* Navbar */
.navbar {
  background-color: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-logo h1 {
  color: #2e7d32;
  font-size: 24px;
  margin: 0;
}

.navbar-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.navbar-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.2s;
}

.navbar-links a:hover {
  color: #2e7d32;
}

.btn-logout {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

.btn-logout:hover {
  background-color: #ffcdd2;
}

/* Botão Hambúrguer (Escondido em desktop) */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: #2e7d32;
  cursor: pointer;
}

/* Conteúdo */
.content {
  padding: 40px 2rem;
  text-align: center;
}

/* Responsividade (Mobile) */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .navbar-links {
    display: none; /* Esconde os links no mobile */
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .navbar-links.active {
    display: flex; /* Mostra os links ao clicar no hambúrguer */
  }
}
</style>
