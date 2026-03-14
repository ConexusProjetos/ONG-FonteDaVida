<template>
  <div class="home-wrapper">
    <!-- ───────────── NAVBAR ───────────── -->
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="brand-icon">🌱</span>
        <span class="brand-name">Fonte da Vida</span>
      </div>

      <div class="navbar-links" :class="{ active: menuOpen }">
        <router-link to="/" @click="menuOpen = false"> Painel </router-link>
        <router-link to="/turmas" @click="menuOpen = false"> Turmas </router-link>
        <router-link to="/pessoas" @click="menuOpen = false"> Pessoas </router-link>
        <router-link to="/admin" @click="menuOpen = false"> Administrador </router-link>
        <button @click="handleLogout" class="btn-logout">Sair</button>
      </div>

      <button class="menu-toggle" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
        <span class="hamburger" :class="{ open: menuOpen }"></span>
      </button>
    </nav>
    <section class="hero">
      <div class="hero-content">
        <p class="hero-greeting">Olá, {{ nomeUsuario }} 👋</p>
        <h1 class="hero-title">Painel de Gestão</h1>
        <p class="hero-subtitle">Acompanhe em tempo real pessoas, turmas e atendimentos da ONG.</p>
      </div>
      <div class="hero-date">
        <span class="date-day">{{ diaAtual }}</span>
        <span class="date-info">{{ mesAnoAtual }}</span>
      </div>
    </section>

    <!-- ───────────── MAIN ───────────── -->
    <main class="dashboard">
      <!-- ESTADO DE LOADING -->
      <div v-if="loading" class="state-loading">
        <div class="spinner"></div>
        <p>Carregando dados...</p>
      </div>

      <!-- ESTADO DE ERRO -->
      <div v-else-if="error" class="state-error">
        <span class="error-icon">⚠</span>
        <p>{{ error }}</p>
        <button @click="carregarDados" class="btn-retry">Tentar novamente</button>
      </div>

      <!-- CONTEÚDO -->
      <template v-else>
        <!-- CARDS DE MÉTRICAS -->
        <section class="metrics-grid">
          <div class="metric-card metric-pessoas">
            <div class="metric-icon">👥</div>
            <div class="metric-body">
              <span class="metric-value">{{ totalPessoas }}</span>
              <span class="metric-label">Pessoas Cadastradas</span>
            </div>
            <router-link to="/pessoas" class="metric-link">Ver todas →</router-link>
          </div>

          <div class="metric-card metric-turmas">
            <div class="metric-icon">📚</div>
            <div class="metric-body">
              <span class="metric-value">{{ turmasAtivas }}</span>
              <span class="metric-label">Turmas Ativas</span>
            </div>
            <router-link to="/turmas" class="metric-link">Ver todas →</router-link>
          </div>

          <div class="metric-card metric-atendimentos">
            <div class="metric-icon">📋</div>
            <div class="metric-body">
              <span class="metric-value">{{ totalAtendimentos }}</span>
              <span class="metric-label">Atendimentos Registrados</span>
            </div>
            <router-link to="/atendimentos" class="metric-link">Ver todos →</router-link>
          </div>
        </section>

        <!-- GRID DE CONTEÚDO -->
        <section class="content-grid">
          <!-- ATENDIMENTOS RECENTES -->
          <div class="card card-recentes">
            <div class="card-header">
              <h2 class="card-title">Atendimentos Recentes</h2>
              <router-link to="/atendimentos" class="card-action">Ver todos →</router-link>
            </div>

            <div v-if="atendimentosRecentes.length === 0" class="empty-state">
              <span>📭</span>
              <p>Nenhum atendimento registrado ainda.</p>
            </div>

            <ul v-else class="atendimentos-list">
              <li
                v-for="atendimento in atendimentosRecentes"
                :key="atendimento.id"
                class="atendimento-item"
              >
                <div class="atendimento-info">
                  <span
                    class="atendimento-badge"
                    :class="atendimento.presente ? 'presente' : 'ausente'"
                  >
                    {{ atendimento.presente ? '✓' : '✗' }}
                  </span>
                  <div>
                    <p class="atendimento-atividade">
                      {{ formatarAtividade(atendimento.atividade) }}
                    </p>
                    <p class="atendimento-data">{{ formatarData(atendimento.dataAtendimento) }}</p>
                  </div>
                </div>
                <span
                  class="atendimento-status"
                  :class="atendimento.presente ? 'presente' : 'ausente'"
                >
                  {{ atendimento.presente ? 'Presente' : 'Ausente' }}
                </span>
              </li>
            </ul>
          </div>

          <!-- ATALHOS RÁPIDOS -->
          <div class="card card-atalhos">
            <div class="card-header">
              <h2 class="card-title">Acesso Rápido</h2>
            </div>

            <div class="atalhos-grid">
              <router-link to="/turmas/nova" class="atalho-btn">
                <span class="atalho-icon">＋</span>
                <span>Nova Turma</span>
              </router-link>
              <router-link to="/pessoas/nova" class="atalho-btn">
                <span class="atalho-icon">＋</span>
                <span>Cadastrar Pessoa</span>
              </router-link>
              <router-link to="/atendimentos/novo" class="atalho-btn">
                <span class="atalho-icon">＋</span>
                <span>Registrar Atendimento</span>
              </router-link>
              <router-link to="/matriculas/nova" class="atalho-btn">
                <span class="atalho-icon">＋</span>
                <span>Nova Matrícula</span>
              </router-link>
            </div>
          </div>
        </section>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDashboard } from '@/composables/useDashboard'
import { parseJwtPayload } from '@/utils/decodificarJwt'
import type { TokenPayload } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()
const menuOpen = ref(false)

const {
  totalPessoas,
  turmasAtivas,
  atendimentosRecentes,
  totalAtendimentos,
  loading,
  error,
  carregarDados,
} = useDashboard()
// ── Ajuste aqui conforme sua store ──
// Opções comuns: authStore.user?.nome | authStore.usuario?.nomeCompleto | authStore.nome

// ── Data de hoje ──
const hoje = new Date()
const diaAtual = computed(() => hoje.toLocaleDateString('pt-BR', { day: '2-digit' }))
const mesAnoAtual = computed(() =>
  hoje.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
)
const nomeUsuario = computed(() => {
  if (!authStore.token) return 'Usuário'
  const payload: TokenPayload | null = parseJwtPayload(authStore.token)
  if (payload === null) return
  return payload.nome
})

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const atividadeLabels: Record<string, string> = {
  REFORCO_ESCOLAR: 'Reforço Escolar',
  OFICINA_ARTE: 'Oficina de Arte',
  ESPORTE: 'Esporte',
  MUSICA: 'Música',
  INFORMATICA: 'Informática',
}

function formatarAtividade(atividade: string): string {
  return atividadeLabels[atividade] ?? atividade
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  carregarDados()
})
</script>

<style scoped>
/* ──────────────────────────────────────
   TOKENS
────────────────────────────────────── */
:root {
  --green-900: #1b4332;
  --green-700: #2d6a4f;
  --green-500: #40916c;
  --green-400: #52b788;
  --green-200: #b7e4c7;
  --green-50: #f0faf4;
  --red-600: #c62828;
  --red-50: #ffebee;
  --gray-900: #111827;
  --gray-700: #374151;
  --gray-500: #6b7280;
  --gray-200: #e5e7eb;
  --gray-50: #f9fafb;
  --white: #ffffff;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.1);
  --radius: 14px;
  --radius-sm: 8px;
}

/* ──────────────────────────────────────
   RESET / BASE
────────────────────────────────────── */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.home-wrapper {
  min-height: 100vh;
  background: var(--green-50);
  font-family:
    'Segoe UI',
    system-ui,
    -apple-system,
    sans-serif;
  color: var(--gray-900);
}

/* ──────────────────────────────────────
   NAVBAR
────────────────────────────────────── */
.navbar {
  background: var(--white);
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid var(--green-400);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
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

.navbar-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.navbar-links a {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--gray-700);
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  transition:
    background 0.15s,
    color 0.15s;
}

.navbar-links a:hover,
.navbar-links a.router-link-active {
  background: var(--green-50);
  color: var(--green-700);
}

.navbar-links a.router-link-exact-active {
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
  border: 1px solid #ffcdd2;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-left: 8px;
  transition: background 0.15s;
}

.btn-logout:hover {
  background: #ffcdd2;
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

/* ──────────────────────────────────────
   HERO
────────────────────────────────────── */
.hero {
  background: linear-gradient(135deg, var(--green-900) 0%, var(--green-700) 100%);
  padding: 2.5rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);
}

.hero-greeting {
  font-size: 15px;
  opacity: 0.8;
  margin-bottom: 6px;
  font-weight: 400;
}

.hero-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}

.hero-subtitle {
  font-size: 15px;
  opacity: 0.75;
  max-width: 420px;
  line-height: 1.5;
}

.hero-date {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.date-day {
  font-size: 56px;
  font-weight: 900;
  line-height: 1;
  opacity: 0.9;
  letter-spacing: -2px;
}

.date-info {
  font-size: 14px;
  opacity: 0.65;
  text-transform: capitalize;
}

/* ──────────────────────────────────────
   DASHBOARD
────────────────────────────────────── */
.dashboard {
  padding: 2rem 2.5rem;
  max-width: 1280px;
  margin: 0 auto;
}

/* ── States ── */
.state-loading,
.state-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px 20px;
  color: var(--gray-500);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--green-200);
  border-top-color: var(--green-500);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-icon {
  font-size: 32px;
}

.btn-retry {
  background: var(--green-500);
  color: var(--white);
  border: none;
  padding: 10px 24px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  transition: background 0.15s;
}

.btn-retry:hover {
  background: var(--green-700);
}

/* ── Métricas ── */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.75rem;
}

.metric-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: var(--shadow-sm);
  border-left: 4px solid transparent;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
  position: relative;
  overflow: hidden;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.metric-pessoas {
  border-left-color: var(--green-500);
}
.metric-turmas {
  border-left-color: #2196f3;
}
.metric-atendimentos {
  border-left-color: #ff9800;
}

.metric-icon {
  font-size: 28px;
  line-height: 1;
}

.metric-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.metric-value {
  font-size: 40px;
  font-weight: 800;
  color: var(--gray-900);
  line-height: 1;
  letter-spacing: -1px;
}

.metric-label {
  font-size: 13px;
  color: var(--gray-500);
  font-weight: 500;
}

.metric-link {
  font-size: 13px;
  color: var(--green-500);
  text-decoration: none;
  font-weight: 600;
  margin-top: auto;
  transition: color 0.15s;
}

.metric-link:hover {
  color: var(--green-700);
}

/* ── Content grid ── */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1.25rem;
}

.card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.card-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--gray-900);
}

.card-action {
  font-size: 13px;
  color: var(--green-500);
  text-decoration: none;
  font-weight: 600;
}

.card-action:hover {
  color: var(--green-700);
}

/* ── Lista de atendimentos ── */
.atendimentos-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.atendimento-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: var(--gray-50);
  border-radius: var(--radius-sm);
  border: 1px solid var(--gray-200);
}

.atendimento-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.atendimento-badge {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  flex-shrink: 0;
}

.atendimento-badge.presente {
  background: #e8f5e9;
  color: #2e7d32;
}
.atendimento-badge.ausente {
  background: #ffebee;
  color: #c62828;
}

.atendimento-atividade {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900);
}

.atendimento-data {
  font-size: 12px;
  color: var(--gray-500);
  margin-top: 2px;
}

.atendimento-status {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}

.atendimento-status.presente {
  background: #e8f5e9;
  color: #2e7d32;
}
.atendimento-status.ausente {
  background: #ffebee;
  color: #c62828;
}

/* ── Empty state ── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 20px;
  color: var(--gray-500);
  font-size: 14px;
}

.empty-state span {
  font-size: 32px;
}

/* ── Atalhos ── */
.atalhos-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.atalho-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 18px 12px;
  background: var(--green-50);
  border: 2px solid var(--green-200);
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--green-700);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  transition:
    background 0.15s,
    border-color 0.15s,
    transform 0.15s;
}

.atalho-btn:hover {
  background: var(--green-200);
  border-color: var(--green-400);
  transform: translateY(-2px);
}

.atalho-icon {
  font-size: 22px;
  font-weight: 300;
  color: var(--green-500);
}

/* ──────────────────────────────────────
   RESPONSIVIDADE
────────────────────────────────────── */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0 1.25rem;
  }

  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navbar-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    background: var(--white);
    padding: 16px;
    box-shadow: var(--shadow-md);
    border-top: 1px solid var(--gray-200);
    gap: 4px;
  }

  .navbar-links.active {
    display: flex;
  }

  .navbar-links a,
  .btn-logout {
    width: 100%;
    justify-content: flex-start;
  }

  .hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 2rem 1.25rem;
  }

  .hero-title {
    font-size: 26px;
  }

  .hero-date {
    align-items: flex-start;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  .date-day {
    font-size: 36px;
  }

  .dashboard {
    padding: 1.5rem 1.25rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .atalhos-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 400px) {
  .atalhos-grid {
    grid-template-columns: 1fr;
  }
}
</style>
