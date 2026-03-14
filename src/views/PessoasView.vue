<template>
  <div class="pessoas-wrapper">
    <!-- NAVBAR reutilizada -->
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="brand-icon">🌱</span>
        <span class="brand-name">Fonte da Vida</span>
      </div>
      <div class="navbar-links" :class="{ active: menuOpen }">
        <router-link to="/" @click="menuOpen = false">⊞ Painel</router-link>
        <router-link to="/turmas" @click="menuOpen = false">◫ Turmas</router-link>
        <router-link to="/pessoas" @click="menuOpen = false">◉ Pessoas</router-link>
        <router-link to="/admin" @click="menuOpen = false">⚙ Administrador</router-link>
        <button @click="handleLogout" class="btn-logout">↩ Sair</button>
      </div>
      <button class="menu-toggle" @click="menuOpen = !menuOpen">
        <span class="hamburger" :class="{ open: menuOpen }"></span>
      </button>
    </nav>

    <!-- HEADER DA PÁGINA -->
    <section class="page-header">
      <div class="page-header-text">
        <h1 class="page-title">Pessoas</h1>
        <p class="page-subtitle">Gerencie beneficiários, voluntários da ONG.</p>
      </div>
      <button class="btn-primary" @click="abrirModalCadastro">
        <span class="btn-icon">＋</span> Nova Pessoa
      </button>
    </section>

    <!-- FILTROS E BUSCA -->
    <section class="toolbar">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          v-model="busca"
          type="text"
          placeholder="Buscar por nome ou CPF..."
          class="search-input"
        />
        <button v-if="busca" @click="busca = ''" class="search-clear">✕</button>
      </div>

      <div class="filter-tabs">
        <button
          v-for="tab in tipoTabs"
          :key="tab.value"
          class="filter-tab"
          :class="{ active: filtroTipo === tab.value }"
          @click="filtroTipo = tab.value"
        >
          {{ tab.label }}
          <span class="tab-count">{{ contarPorTipo(tab.value) }}</span>
        </button>
      </div>
    </section>

    <!-- CONTEÚDO -->
    <main class="content">
      <!-- Loading -->
      <div v-if="loading" class="state-center">
        <div class="spinner"></div>
        <p>Carregando pessoas...</p>
      </div>

      <!-- Erro -->
      <div v-else-if="error" class="state-center state-error">
        <span>⚠</span>
        <p>{{ error }}</p>
        <button class="btn-primary" @click="carregarPessoas">Tentar novamente</button>
      </div>

      <!-- Vazio -->
      <div v-else-if="pessoasFiltradas.length === 0" class="state-center state-empty">
        <span class="empty-icon">👤</span>
        <p class="empty-title">Nenhuma pessoa encontrada</p>
        <p class="empty-sub">
          {{ busca ? 'Tente outro termo de busca.' : 'Cadastre a primeira pessoa da ONG.' }}
        </p>
        <button v-if="!busca" class="btn-primary" @click="abrirModalCadastro">
          Cadastrar Pessoa
        </button>
      </div>

      <!-- TABELA desktop -->
      <div v-else class="table-container">
        <table class="pessoas-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Telefone</th>
              <th>Nascimento</th>
              <th>Sexo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="pessoa in pessoasFiltradas"
              :key="pessoa.id"
              class="table-row"
              @click="abrirModalEdicao(pessoa)"
            >
              <td class="td-nome">
                <div class="avatar">{{ pessoa.nomeCompleto }}</div>
                <div>
                  <p class="nome-principal">{{ pessoa.nomeCompleto }}</p>
                  <p class="nome-cpf">{{ formatarCpf(pessoa.cpf) }}</p>
                </div>
              </td>
              <td>
                <span class="badge" :class="badgeClass(pessoa.tipo)">
                  {{ tipoLabel(pessoa.tipo) }}
                </span>
              </td>
              <td class="td-telefone">{{ formatarTelefone(pessoa.telefone) }}</td>
              <td class="td-data">{{ formatarData(pessoa.dataNascimento) }}</td>
              <td class="td-sexo">
                {{ pessoa.sexo === 'M' ? '♂ Masc.' : pessoa.sexo === 'F' ? '♀ Fem.' : '—' }}
              </td>
              <td class="td-actions" @click.stop>
                <button class="btn-icon-action" title="Editar" @click="abrirModalEdicao(pessoa)">
                  ✏
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- CARDS mobile (visível só em telas pequenas) -->
      <div v-if="!loading && !error && pessoasFiltradas.length > 0" class="cards-mobile">
        <div
          v-for="pessoa in pessoasFiltradas"
          :key="pessoa.id + '_card'"
          class="pessoa-card"
          @click="abrirModalEdicao(pessoa)"
        >
          <div class="card-avatar">{{ pessoa.nomeCompleto }}</div>
          <div class="card-info">
            <p class="card-nome">{{ pessoa.nomeCompleto }}</p>
            <p class="card-detalhe">
              {{ formatarCpf(pessoa.cpf) }} · {{ formatarTelefone(pessoa.telefone) }}
            </p>
          </div>
          <span class="badge" :class="badgeClass(pessoa.tipo)">{{ tipoLabel(pessoa.tipo) }}</span>
        </div>
      </div>
    </main>

    <!-- ───── MODAL CADASTRO / EDIÇÃO ───── -->
    <Teleport to="body">
      <div v-if="modalAberto" class="modal-overlay" @click.self="fecharModal">
        <div class="modal" :class="{ 'modal-slide-in': modalAberto }">
          <div class="modal-header">
            <h2 class="modal-title">{{ modoEdicao ? 'Editar Pessoa' : 'Nova Pessoa' }}</h2>
            <button class="modal-close" @click="fecharModal">✕</button>
          </div>

          <form class="modal-form" @submit.prevent="salvar">
            <!-- Linha 1 -->
            <div class="form-group full">
              <label>Nome Completo *</label>
              <input
                v-model="form.nomeCompleto"
                type="text"
                placeholder="Ex: João da Silva"
                required
              />
            </div>

            <!-- Linha 2 -->
            <div class="form-row">
              <div class="form-group">
                <label>Tipo *</label>
                <select v-model="form.tipo" required>
                  <option value="">Selecione...</option>
                  <option value="BENEFICIARIO">Beneficiário</option>
                  <option value="VOLUNTARIO">Voluntário</option>
                </select>
              </div>
              <div class="form-group">
                <label>Sexo</label>
                <select v-model="form.sexo">
                  <option value="">Selecione...</option>
                  <option value="M">M</option>
                  <option value="F">F</option>
                  <option value="OUTRO">Outro</option>
                </select>
              </div>
            </div>

            <!-- Linha 3 -->
            <div class="form-row">
              <div class="form-group">
                <label>CPF</label>
                <input
                  v-model="form.cpf"
                  @input="form.cpf = form.cpf.replace(/\D/g, '')"
                  type="text"
                  placeholder="00000000000"
                  maxlength="11"
                />
              </div>
              <div class="form-group">
                <label>Telefone</label>
                <input
                  v-model="form.telefone"
                  type="text"
                  placeholder="85999999999"
                  maxlength="11"
                  @input="form.telefone = form.telefone.replace(/\D/g, '')"
                />
              </div>
            </div>

            <!-- Linha 4 -->
            <div class="form-group full">
              <label>Data de Nascimento</label>
              <input v-model="formDataNascimento" type="date" />
            </div>

            <!-- Responsável (só para beneficiários) -->
            <template v-if="form.tipo === 'BENEFICIARIO'">
              <div class="form-section-title">Responsável</div>
              <div class="form-row">
                <div class="form-group">
                  <label>Nome do Responsável</label>
                  <input v-model="form.nomeResponsavel" type="text" placeholder="Nome completo" />
                </div>
                <div class="form-group">
                  <label>Telefone do Responsável</label>
                  <input
                    v-model="form.telefoneResponsavel"
                    type="text"
                    placeholder="85988888888"
                    @input="form.telefoneResponsavel = form.telefoneResponsavel.replace(/\D/g, '')"
                    maxlength="11"
                  />
                </div>
              </div>
            </template>
            <div class="form-group full">
              <label>Observações</label>
              <textarea
                v-model="form.observacoes"
                rows="3"
                placeholder="Informações relevantes..."
              ></textarea>
            </div>
            <p v-if="formError" class="form-error">{{ formError }}</p>

            <!-- Ações -->
            <div class="modal-actions">
              <button type="button" class="btn-secondary" @click="fecharModal" :disabled="salvando">
                Cancelar
              </button>
              <button type="submit" class="btn-primary" :disabled="salvando">
                <span v-if="salvando" class="spinner-sm"></span>
                {{ salvando ? 'Salvando...' : modoEdicao ? 'Salvar Alterações' : 'Cadastrar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  pessoaService,
  type Pessoa,
  type CriarPessoaDTO,
  type EditarPessoaDTO,
} from '@/service/pessoaService'
import { parseJwtPayload } from '@/utils/decodificarJwt'
import type { TokenPayload } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()
const menuOpen = ref(false)

// ── Estado principal ──────────────────────────────────
const pessoas = ref<Pessoa[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// ── Filtros ───────────────────────────────────────────
const busca = ref('')
const filtroTipo = ref('TODOS')

const tipoTabs = [
  { label: 'Todos', value: 'TODOS' },
  { label: 'Beneficiários', value: 'BENEFICIARIO' },
  { label: 'Voluntários', value: 'VOLUNTARIO' },
]

function contarPorTipo(tipo: string): number {
  if (tipo === 'TODOS') return pessoas.value.length
  return pessoas.value.filter((p) => p.tipo === tipo).length
}

const pessoasFiltradas = computed(() => {
  let lista = pessoas.value
  if (filtroTipo.value !== 'TODOS') {
    lista = lista.filter((p) => p.tipo === filtroTipo.value)
  }
  if (busca.value.trim()) {
    const termo = busca.value.toLowerCase()
    lista = lista.filter(
      (p) => p.nomeCompleto.toLowerCase().includes(termo) || (p.cpf && p.cpf.includes(termo)),
    )
  }
  return lista
})

// ── Carregar ──────────────────────────────────────────
async function carregarPessoas() {
  loading.value = true
  error.value = null
  try {
    const data = await pessoaService.listarTodas()
    pessoas.value = Array.isArray(data) ? data : []
  } catch {
    error.value = 'Não foi possível carregar as pessoas.'
  } finally {
    loading.value = false
  }
}

// ── Modal ─────────────────────────────────────────────
const modalAberto = ref(false)
const modoEdicao = ref(false)
const pessoaEditando = ref<Pessoa | null>(null)
const salvando = ref(false)
const formError = ref<string | null>(null)

const formVazio = () => ({
  nomeCompleto: '',
  tipo: '' as Pessoa['tipo'] | '',
  cpf: '',
  telefone: '',
  sexo: '' as Pessoa['sexo'] | '',
  nomeResponsavel: '',
  telefoneResponsavel: '',
  observacoes: '',
})

const form = reactive(formVazio())

// data de nascimento separada para o input type="date"
const formDataNascimento = ref('')

function abrirModalCadastro() {
  modoEdicao.value = false
  pessoaEditando.value = null
  Object.assign(form, formVazio())
  formDataNascimento.value = ''
  formError.value = null
  modalAberto.value = true
}

function abrirModalEdicao(pessoa: Pessoa) {
  modoEdicao.value = true
  pessoaEditando.value = pessoa
  Object.assign(form, {
    nomeCompleto: pessoa.nomeCompleto,
    tipo: pessoa.tipo,
    cpf: pessoa.cpf ?? '',
    telefone: pessoa.telefone ?? '',
    sexo: pessoa.sexo ?? '',
    nomeResponsavel: pessoa.nomeResponsavel ?? '',
    telefoneResponsavel: pessoa.telefoneResponsavel ?? '',
    observacoes: pessoa.observacoes ?? '',
  })
  formDataNascimento.value = pessoa.dataNascimento ? pessoa.dataNascimento.substring(0, 10) : ''
  formError.value = null
  modalAberto.value = true
}

function fecharModal() {
  if (salvando.value) return
  modalAberto.value = false
}

async function salvar() {
  formError.value = null
  if (!form.nomeCompleto || !form.tipo) {
    formError.value = 'Nome e tipo são obrigatórios.'
    return
  }

  salvando.value = true
  try {
    const dataNascimento = formDataNascimento.value
      ? new Date(formDataNascimento.value).toISOString()
      : undefined

    // Ajuste authStore.user?.id conforme sua store
    const usuario = computed<TokenPayload | null>(() => {
      if (!authStore.token) return null
      return parseJwtPayload(authStore.token)
    })

    const registradoPor = usuario.value?.id
    console.log(usuario.value)

    if (modoEdicao.value && pessoaEditando.value) {
      const dto: EditarPessoaDTO = {
        nomeCompleto: form.nomeCompleto,
        tipo: form.tipo as Pessoa['tipo'],
        registradoPor: registradoPor,
        telefone: form.telefone || undefined,
        dataNascimento,
        sexo: (form.sexo as Pessoa['sexo']) || undefined,
        nomeResponsavel: form.nomeResponsavel || undefined,
        telefoneResponsavel: form.telefoneResponsavel || undefined,
        observacoes: form.observacoes || undefined,
      }
      const updated = await pessoaService.editar(pessoaEditando.value.id, dto)
      console.log(updated)
      const idx = pessoas.value.findIndex((p) => p.id === pessoaEditando.value!.id)
      if (idx !== -1) pessoas.value[idx] = updated
    } else {
      const dto: CriarPessoaDTO = {
        nomeCompleto: form.nomeCompleto,
        tipo: form.tipo as Pessoa['tipo'],
        registradoPor: registradoPor,
        cpf: form.cpf || undefined,
        telefone: form.telefone || undefined,
        dataNascimento,
        sexo: (form.sexo as Pessoa['sexo']) || undefined,
        nomeResponsavel: form.nomeResponsavel || undefined,
        telefoneResponsavel: form.telefoneResponsavel || undefined,
        observacoes: form.observacoes || undefined,
      }
      const nova = await pessoaService.cadastrar(dto)
      if (nova.statusCode === 400) {
        alert('Você digitou algum campo errado, ou não preencheu')
      }
      pessoas.value.unshift(nova)
    }
    modalAberto.value = false
  } catch {
    formError.value = 'Erro ao salvar. Tente novamente.'
  } finally {
    salvando.value = false
  }
}

function formatarCpf(cpf?: string): string {
  if (!cpf) return '—'
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

function formatarTelefone(tel?: string): string {
  if (!tel) return '—'
  const d = tel.replace(/\D/g, '')
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return tel
}

function formatarData(iso?: string): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-BR')
}

function tipoLabel(tipo: string): string {
  const map: Record<string, string> = {
    BENEFICIARIO: 'Beneficiário',
    VOLUNTARIO: 'Voluntário',
  }
  return map[tipo] ?? tipo
}

function badgeClass(tipo: string): string {
  return (
    {
      BENEFICIARIO: 'badge-blue',
      VOLUNTARIO: 'badge-orange',
    }[tipo] ?? 'badge-gray'
  )
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}

onMounted(carregarPessoas)
</script>

<style scoped>
.pessoas-wrapper {
  --green-900: #1b4332;
  --green-700: #2d6a4f;
  --green-500: #40916c;
  --green-400: #52b788;
  --green-200: #b7e4c7;
  --green-50: #f0faf4;
  --red-600: #c62828;
  --red-50: #ffebee;
  --blue-50: #e3f2fd;
  --blue-600: #1565c0;
  --orange-50: #fff3e0;
  --orange-600: #e65100;
  --gray-900: #111827;
  --gray-700: #374151;
  --gray-500: #6b7280;
  --gray-200: #e5e7eb;
  --gray-50: #f9fafb;
  --white: #ffffff;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.12);
  --radius: 14px;
  --radius-sm: 8px;

  min-height: 100vh;
  background: #f0faf4;
  font-family:
    'Segoe UI',
    system-ui,
    -apple-system,
    sans-serif;
  color: #111827;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* NAVBAR */
.navbar {
  background: #fff;
  padding: 0 2rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid #52b788;
}
.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand-icon {
  font-size: 26px;
}
.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: #2d6a4f;
}
.navbar-links {
  display: flex;
  align-items: center;
  gap: 4px;
}
.navbar-links a {
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  transition:
    background 0.15s,
    color 0.15s;
}
.navbar-links a:hover,
.navbar-links a.router-link-active {
  background: #f0faf4;
  color: #2d6a4f;
}
.navbar-links a.router-link-exact-active {
  background: #b7e4c7;
  color: #1b4332;
  font-weight: 600;
}
.btn-logout {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-left: 8px;
  transition: background 0.15s;
}
.btn-logout:hover {
  background: #ffcdd2;
}
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
  background: #2d6a4f;
  border-radius: 2px;
  transition: transform 0.2s;
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

/* PAGE HEADER */
.page-header {
  background: linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%);
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.page-title {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
}
.page-subtitle {
  font-size: 14px;
  opacity: 0.75;
  margin-top: 4px;
}

/* BOTÕES */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #40916c;
  color: #fff;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition:
    background 0.15s,
    transform 0.1s;
}
.btn-primary:hover {
  background: #2d6a4f;
  transform: translateY(-1px);
}
.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
.page-header .btn-primary {
  background: #fff;
  color: #2d6a4f;
}
.page-header .btn-primary:hover {
  background: #f0faf4;
}
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #f9fafb;
  color: #374151;
  border: 1px solid #e5e7eb;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.15s;
}
.btn-secondary:hover {
  background: #e5e7eb;
}
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* TOOLBAR */
.toolbar {
  padding: 1.25rem 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 12px;
  min-width: 260px;
  flex: 1;
  max-width: 400px;
}
.search-icon {
  font-size: 14px;
}
.search-input {
  border: none;
  background: none;
  outline: none;
  font-size: 14px;
  color: #111827;
  width: 100%;
  padding: 10px 0;
}
.search-input::placeholder {
  color: #9ca3af;
}
.search-clear {
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 14px;
  padding: 2px 4px;
  transition: color 0.15s;
}
.search-clear:hover {
  color: #374151;
}
.filter-tabs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.filter-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.15s;
}
.filter-tab:hover {
  border-color: #52b788;
  color: #2d6a4f;
}
.filter-tab.active {
  background: #b7e4c7;
  border-color: #52b788;
  color: #1b4332;
  font-weight: 600;
}
.tab-count {
  background: #e5e7eb;
  color: #374151;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 10px;
}
.filter-tab.active .tab-count {
  background: #2d6a4f;
  color: #fff;
}

/* CONTENT */
.content {
  padding: 1.5rem 2.5rem;
}

/* States */
.state-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px 20px;
  color: #6b7280;
  text-align: center;
}
.state-error span {
  font-size: 32px;
}
.state-error p {
  color: #374151;
}
.empty-icon {
  font-size: 48px;
}
.empty-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
}
.empty-sub {
  font-size: 14px;
  color: #6b7280;
}

/* SPINNER */
.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #b7e4c7;
  border-top-color: #40916c;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.spinner-sm {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* TABELA */
.table-container {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.pessoas-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
.pessoas-table thead tr {
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}
.pessoas-table th {
  padding: 14px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
}
.table-row {
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background 0.12s;
}
.table-row:hover {
  background: #f0faf4;
}
.table-row:last-child {
  border-bottom: none;
}
.pessoas-table td {
  padding: 14px 16px;
  vertical-align: middle;
}

.td-nome {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #40916c, #52b788);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.nome-principal {
  font-weight: 600;
  color: #111827;
}
.nome-cpf {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
}
.td-telefone,
.td-data,
.td-sexo {
  color: #374151;
}
.td-actions {
  text-align: right;
}
.btn-icon-action {
  background: none;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 14px;
  color: #6b7280;
  transition: all 0.15s;
}
.btn-icon-action:hover {
  background: #f0faf4;
  border-color: #52b788;
  color: #2d6a4f;
}

/* BADGES */
.badge {
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
}
.badge-blue {
  background: #e3f2fd;
  color: #1565c0;
}
.badge-orange {
  background: #fff3e0;
  color: #e65100;
}
.badge-green {
  background: #e8f5e9;
  color: #2e7d32;
}
.badge-gray {
  background: #f3f4f6;
  color: #6b7280;
}

/* CARDS MOBILE (oculto em desktop) */
.cards-mobile {
  display: none;
  flex-direction: column;
  gap: 10px;
}
.pessoa-card {
  background: #fff;
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition:
    transform 0.12s,
    box-shadow 0.12s;
}
.pessoa-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.card-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
  background: linear-gradient(135deg, #40916c, #52b788);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-info {
  flex: 1;
  min-width: 0;
}
.card-nome {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-detalhe {
  font-size: 12px;
  color: #9ca3af;
  margin-top: 2px;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fade-in 0.15s ease;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  background: #fff;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  animation: slide-up 0.2s ease;
}
@keyframes slide-up {
  from {
    transform: translateY(24px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 0;
}
.modal-title {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
}
.modal-close {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 14px;
  color: #6b7280;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-close:hover {
  background: #ffebee;
  color: #c62828;
  border-color: #ffcdd2;
}

.modal-form {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group.full {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}
.form-group input,
.form-group select,
.form-group textarea {
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  color: #111827;
  outline: none;
  transition: border-color 0.15s;
  font-family: inherit;
  background: #fff;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #52b788;
}
.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-section-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7280;
  padding-top: 4px;
  border-top: 1px solid #e5e7eb;
}

.form-error {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 500;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
  margin-top: 4px;
}

/* RESPONSIVIDADE */
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
    background: #fff;
    padding: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border-top: 1px solid #e5e7eb;
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

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 1.5rem 1.25rem;
  }
  .page-title {
    font-size: 24px;
  }

  .toolbar {
    padding: 1rem 1.25rem;
  }
  .search-box {
    min-width: 0;
    max-width: 100%;
  }

  .content {
    padding: 1rem 1.25rem;
  }

  /* Esconde tabela, mostra cards */
  .table-container {
    display: none;
  }
  .cards-mobile {
    display: flex;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
  .modal {
    max-height: 95vh;
  }
}

@media (max-width: 480px) {
  .filter-tabs {
    gap: 4px;
  }
  .filter-tab {
    font-size: 12px;
    padding: 5px 10px;
  }
}
</style>
