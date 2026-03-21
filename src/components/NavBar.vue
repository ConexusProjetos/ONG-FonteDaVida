<script setup lang="ts">
defineEmits(['toggle-sidebar']);

</script>


<template>
  <header class="navbar-container">
    <div class="nav-section left">
      <button class="hamburger-btn" @click="$emit('toggle-sidebar')">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>

    <div class="nav-section center">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Buscar aluno, pagamento ou responsável..." />
      </div>
    </div>

    <div class="nav-section right">
      <div class="notification-icon">
        <span class="bell">🔔</span>
        <span class="badge">3</span>
      </div>
      
      <div class="user-profile">
        <div class="avatar-circle">
          <span>U</span> 
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* O "Pai" de tudo que alinha os 3 blocos */
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Empurra um pra cada lado e um pro meio */
  padding: 0 20px;
  height: 70px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}

/* Base para as seções */
.nav-section {
  display: flex;
  align-items: center;
}

/* Estilo do Menu Sanduíche (Sem ícones externos, só CSS) */
.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
}

.hamburger-btn .bar {
  width: 25px;
  height: 3px;
  background-color: #333;
  border-radius: 2px;
  transition: 0.3s;
}

/* Centralização da Busca */
.center {
  flex: 1; /* Faz o centro crescer */
  justify-content: center;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  input{
    border:1px solid #ccc;
    border-radius: 10px;
    width: 100%;
    padding:8px 16px;
  }
}

/* Ajuste do Perfil e Notificação */
.right {
  gap: 20px;
}

.notification-icon {
  position: relative;
  font-size: 20px;
  cursor: pointer;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4d4f;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  background-color: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #4a5568;
  border: 2px solid #cbd5e0;
  cursor: pointer;
}
</style>