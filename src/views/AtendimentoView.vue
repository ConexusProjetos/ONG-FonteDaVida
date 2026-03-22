<template>
  <div class="atendimento-container">
    <header class="header-section">
      <h1 class="title">Registro de Atendimentos</h1>
      <button @click="openModal('create')" class="btn-new"><span>➕</span> Novo Registro</button>
    </header>

    <section class="filters-card">
      <div class="filters-grid">
        <div class="input-group">
          <label>Atividade</label>
          <select v-model="filters.atividade" @change="fetchAtendimentos">
            <option value="">Todas</option>
            <option value="reforco_escolar">Reforço Escolar</option>
            <option value="programa_60mais">Programa 60+</option>
            <option value="futebol">Futebol</option>
            <option value="quentinhas">Quentinhas</option>
          </select>
        </div>
        <div class="input-group">
          <label>Data</label>
          <input v-model="filters.date" type="date" @change="fetchAtendimentos" />
        </div>
        <div class="input-group">
          <label>Presença</label>
          <select v-model="filters.presente" @change="fetchAtendimentos">
            <option value="">Todos</option>
            <option value="true">Presente</option>
            <option value="false">Faltou</option>
          </select>
        </div>
        <button @click="resetFilters" class="btn-clear">🔄 Limpar Filtros</button>
      </div>
    </section>

    <div class="table-wrapper">
      <div v-if="loading" class="loader-overlay">
        <div class="spinner"></div>
      </div>

      <table class="main-table">
        <thead>
          <tr>
            <th>Pessoa</th>
            <th>Turma</th>
            <th>Atividade</th>
            <th>Data</th>
            <th>Presença</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in atendimentos" :key="item.id">
            <td class="font-bold">{{ item.pessoa.nomeCompleto }}</td>
            <td>{{ item.turma?.nome || 'Não informado' }}</td>
            <td>
              <span class="badge-activity">{{ formatAtividade(item.atividade) }}</span>
            </td>
            <td>
              {{
                item.dataAtendimento !== undefined
                  ? formatDate(item.dataAtendimento)
                  : 'Data não informada'
              }}
            </td>
            <td>
              <span :class="item.presente ? 'tag-presente' : 'tag-falta'">
                {{ item.presente ? '✅ Sim' : '❌ Não' }}
              </span>
            </td>
            <td class="actions">
              <button @click="editAtendimento(item)" class="btn-icon">✏️</button>
              <button @click="deleteAtendimento(item)" class="btn-icon danger">🗑️</button>
            </td>
          </tr>
          <tr v-if="atendimentos.length === 0">
            <td colspan="7" class="empty-state">Nenhum registro encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Teleport to="body">
      <div v-if="modalVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ modalMode === 'create' ? 'Novo Atendimento' : 'Editar Atendimento' }}</h3>
            <button @click="closeModal" class="close-x">&times;</button>
          </div>

          <form @submit.prevent="saveAtendimento" class="atendimento-form">
            <div class="form-row">
              <label>Pessoa atendida</label>
              <select v-model="formData.pessoa_id" required>
                <option value="">Selecione a pessoa</option>
                <option v-for="p in pessoas" :key="p.id" :value="p.id">{{ p.nomeCompleto }}</option>
              </select>
            </div>

            <div class="form-grid">
              <div class="form-row">
                <label>Turma</label>
                <select v-model="formData.turma_id">
                  <option value="">Sem turma</option>
                  <option v-for="t in turmas" :key="t.id" :value="t.id">{{ t.nome }}</option>
                </select>
              </div>
              <div class="form-row">
                <label>Atividade</label>
                <select v-model="formData.atividade" required>
                  <option value="REFORCO_ESCOLAR">Reforço Escolar</option>
                  <option value="PROGRAMA_60MAIS">Programa 60+</option>
                  <option value="FUTEBOL">Futebol</option>
                  <option value="QUENTINHAS">Quentinhas</option>
                </select>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-row">
                <label>Data</label>
                <input type="date" v-model="formData.data_atendimento" required />
              </div>
              <div class="form-row checkbox-row">
                <label>Está presente?</label>
                <input type="checkbox" v-model="formData.presente" />
              </div>
            </div>

            <div class="form-row">
              <label>Observações</label>
              <textarea
                v-model="formData.observacao"
                rows="3"
                placeholder="Campo livre..."
              ></textarea>
            </div>

            <div class="modal-actions">
              <button type="button" @click="closeModal" class="btn-cancel">Cancelar</button>
              <button type="submit" class="btn-save" :disabled="saving">
                {{ saving ? 'Processando...' : 'Salvar Registro' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { atendimentoService } from '@/service/atendimentoService'
import type { Atendimento, CriarAtendimentoDTO } from '@/types/atendimento'
import type { Turma } from '@/types/turma'
import { pessoaService } from '@/service/pessoaService'
import type { Pessoa } from '@/types/pessoa'
import { turmaService } from '@/service/turmaService'

const atendimentos = ref<Atendimento[]>([])
const pessoas = ref<Pessoa[]>([])
const turmas = ref<Turma[]>([]) // Adicionado conforme BD
const loading = ref(false)
const modalVisible = ref(false)
const modalMode = ref('create')
const saving = ref(false)

function resetFilters() {}

const filters = reactive({ atividade: '', date: '', presente: '' })
const formData = reactive({
  id: null,
  pessoa_id: '',
  turma_id: '',
  atividade: 'reforco_escolar',
  data_atendimento: new Date().toISOString().split('T')[0],
  presente: true,
  observacao: '',
})
const fetchPessoas = async () => {
  try {
    const response = await pessoaService.listarTodas()
    pessoas.value = response
    console.log(pessoas.value)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
const fetchTurmas = async () => {
  try {
    const response = await turmaService.listarTodas()
    turmas.value = response
    console.log(turmas.value)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
const fetchAtendimentos = async () => {
  loading.value = true

  try {
    const response = await atendimentoService.listarTodos()
    atendimentos.value = response
    console.log(atendimentos.value)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function saveAtendimento(): Promise<void> {
  const payload: CriarAtendimentoDTO = {
    pessoaId: formData.pessoa_id,
    turmaId: formData.turma_id || '',
    atividade: formData.atividade,
    dataAtendimento: formData.data_atendimento || Date.toString(),
    presente: formData.presente,
    observacao: formData.observacao,
  }
  const response = await atendimentoService.registrar(payload)
  console.log(response)
  if (response.status === 201) {
    alert('Atendimento registrado!')
    atendimentos.value.push(response.data)
  } else {
    alert('Atendimento não registrado!')
  }
}
async function editAtendimento(atendimento: CriarAtendimentoDTO) {
  console.log(atendimento)
}

function deleteAtendimento(atendimento: Atendimento) {
  console.log(atendimento)
}
const labels = {
  REFORCO_ESCOLAR: '📚 Reforço',
  PROGRAMA_60MAIS: '👴 60+',
  FUTEBOL: '⚽ Futebol',
  QUENTINHAS: '🍱 Quentinhas',
} as const

type AtividadeKey = keyof typeof labels

const formatAtividade = (val: string): string => {
  const key = val.toLowerCase() as AtividadeKey

  if (key in labels) {
    return labels[key]
  }

  return val
}

const openModal = (mode: string) => {
  modalMode.value = mode
  if (mode === 'create') resetForm()
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

const resetForm = () => {
  Object.assign(formData, {
    id: null,
    pessoa_id: '',
    turma_id: '',
    atividade: 'reforco_escolar',
    data_atendimento: new Date().toISOString().split('T')[0],
    presente: true,
    observacao: '',
  })
}

const formatDate = (d: Date) => (d ? new Date(d).toLocaleDateString('pt-BR') : '—')

onMounted(() => {
  fetchAtendimentos()
  fetchPessoas()
  fetchTurmas()
  // Aqui você deve carregar pessoas e turmas para os selects do modal
})
</script>

<style scoped>
.atendimento-container {
  padding: 2rem;
  background: #f9fafb;
  min-height: 100vh;
}
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
}

/* Filtros */
.filters-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}
.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  align-items: end;
}
.input-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: #374151;
}
.input-group select,
.input-group input {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

/* Tabela */
.table-wrapper {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}
.main-table {
  width: 100%;
  border-collapse: collapse;
}
.main-table th {
  background: #f3f4f6;
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  color: #4b5563;
}
.main-table td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

/* Status & Badges */
.tag-presente {
  color: #065f46;
  background: #d1fae5;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.tag-falta {
  color: #991b1b;
  background: #fee2e2;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.badge-activity {
  background: #eff6ff;
  color: #1e40af;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* MODAL FIXO */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  width: 90%;
  max-width: 550px;
  border-radius: 1rem;
  padding: 2rem;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.close-x {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #9ca3af;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-row {
  margin-bottom: 1.25rem;
}
.form-row label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}
.form-row select,
.form-row input,
.form-row textarea {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}
.checkbox-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.8rem;
}
.checkbox-row input {
  width: auto;
  scale: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}
.btn-save {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
}
.btn-cancel {
  background: #f3f4f6;
  color: #4b5563;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
</style>
