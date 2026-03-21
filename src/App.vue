<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { ref } from 'vue'
import Sidebar from '@/components/SideBar.vue' 
import NavBar from '@/components/NavBar.vue' 

const route = useRoute()

// Lista de rotas que NÃO devem ter o menu lateral (ex: Login, Cadastro)
const hideSidebarRoutes = ['login', 'cadastro', 'NotFound']

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  
  isSidebarOpen.value = !isSidebarOpen.value;
};

</script>

<template>
  <div class="app-layout">
    <Sidebar :isOpen="isSidebarOpen" v-if="!hideSidebarRoutes.includes(route.name as string)" />
    
    <main class="main-content">
      <NavBar v-if="!hideSidebarRoutes.includes(route.name as string)" @toggle-sidebar="toggleSidebar"/>
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Estilos globais para o Layout */
.app-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  background-color: #f0faf4; /* Cor de fundo que você já usava */
  overflow-y: auto;
}

/* Ajuste para telas pequenas (opcional) */
@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }
}
</style>