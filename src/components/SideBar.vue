<script setup>
import {Home, Users, Settings, LogOut, ClipboardList, SquareLibraryIcon } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

defineProps({
  isOpen: Boolean
});

const menuOpen = ref(false);

const closeMenu = () => {
  if (window.innerWidth <= 768) {
    menuOpen.value = false
  }
}


function handleLogout() {
  authStore.logout()
  router.push('/login')
}


</script>


<template>
    
  <aside :class="['sidebar', { 'is-closed': !isOpen }]">
    <nav class="sidebar">
        <div class="sidebar-brand">
            <img src="/assets/logo.png" alt="" >
            <div class="name-label">
                <span class="brand-name">Fonte da Vida</span>
                <span class="brand-slogan">Sistema de Gestão</span>
            </div>
        </div>

        <div class="sidebar-links" :class="{ active: menuOpen }">
            <router-link to="/" @click="menuOpen = false"> 
                <Home color="white"/>
                <span>Painel</span>
            </router-link>

            <router-link to="/turmas" @click="menuOpen = false">
              <SquareLibraryIcon color="white"/>
              <span>Turmas</span>
            </router-link>

            <router-link to="/pessoas" @click="menuOpen = false">
              <Users color="white" />
              <span>Pessoas</span>
            </router-link>

            <router-link to="/admin" @click="menuOpen = false">
              <Settings color="white" />
              <span>Administrador</span>
            </router-link>

            <router-link to="/atendimento" @click="menuOpen = false">
              <ClipboardList color="white" />
              <span>Atendimentos</span>
            </router-link>
            

            <!-- ajustar logout  -->
             
            <button @click="handleLogout" class="btn-logout">
              <LogOut color="white" />
              <span>Sair</span>
            </button>
        </div>

        <button class="menu-toggle" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
            <span class="hamburger" :class="{ open: menuOpen }"></span>
        </button>
    </nav>

  </aside>

</template>


<style scoped>

.sidebar {
  background: linear-gradient(180deg, var(--primary-dark) 0%, var(--primary) 100%);
  color:white;
  box-shadow: var(--shadow-xl);
  padding: 0 2rem;
  width:350px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid var(--green-400);

  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); /* Animação suave */

  
}

.is-closed {
  width: 0 !important;
  opacity: 0;
  pointer-events: none; /* Impede cliques enquanto invisível */
}
.sidebar-content {
  width: 350px; 
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap; /* Evita quebra de linha do texto */
}

.sidebar-brand {
  display: flex;
  margin: 50px 0px 100px 0px;


  img {
    width:100px;
    


  }

}
.name-label{
    
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin-left:10px;
}

.brand-icon {
  font-size: 26px;
  line-height: 1;
}

.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--green-700);
  letter-spacing: -0.3px;
}

.sidebar-links {
  display: flex;
  margin-right: auto;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  
  span{
    color:white;
  }


}

.sidebar-links a {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  transition:
    background 0.15s,
    color 0.15s;
}

.sidebar-links a:hover{
  background: black;
}

.sidebar-links a.router-link-exact-active {
  background: var(--green-200);
  color: var(--green-900);
  font-weight: 600;
}

.nav-icon {
  font-size: 15px;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--red-50);
  color: var(--red-600);
  border:0;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-left: 8px;
  transition: background 0.15s;
}

.btn-logout:hover {
  background: var(--error);
}

/* hamburguer */
.menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  padding: 8px;
}

.hamburger,
.hamburger::before,
.hamburger::after {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--green-700);
  border-radius: 2px;
  transition:
    transform 0.2s,
    opacity 0.2s;
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  left: 0;
}
.hamburger::before {
  top: -7px;
}
.hamburger::after {
  top: 7px;
}

.hamburger.open {
  background: transparent;
}
.hamburger.open::before {
  transform: rotate(45deg) translate(5px, 5px);
}
.hamburger.open::after {
  transform: rotate(-45deg) translate(5px, -5px);
}

</style>