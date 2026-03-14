<template>
  <div class="container">
    <h1>Gestão de Turmas</h1>

    <form class="form" @submit.prevent="salvarTurma">
      <input v-model="form.nome" placeholder="Nome da turma" required />

      <select v-model="form.atividade">
        <option value="REFORCO_ESCOLAR">Reforço Escolar</option>
        <option value="OFICINA_ARTE">Oficina de Arte</option>
        <option value="ESPORTE">Esporte</option>
        <option value="MUSICA">Música</option>
        <option value="INFORMATICA">Informática</option>
      </select>

      <select v-model="form.turno">
        <option value="MANHA">Manhã</option>
        <option value="TARDE">Tarde</option>
        <option value="NOITE">Noite</option>
      </select>

      <select v-model="form.educadorId">
        <option value="">Selecione um educador</option>
        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
          {{ usuario.nome }}
        </option>
      </select>

      <label class="checkbox">
        <input type="checkbox" v-model="form.ativa" />
        Turma ativa
      </label>

      <button type="submit">
        {{ editando ? 'Atualizar' : 'Criar Turma' }}
      </button>
    </form>

    <table class="tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Atividade</th>
          <th>Turno</th>
          <th>Educador</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="turma in turmas" :key="turma.id">
          <td>{{ turma.nome }}</td>
          <td>{{ turma.atividade }}</td>
          <td>{{ turma.turno }}</td>
          <td>{{ nomeEducador(turma.educadorId) }}</td>
          <td>
            <span :class="turma.ativa ? 'ativa' : 'inativa'">
              {{ turma.ativa ? 'Ativa' : 'Inativa' }}
            </span>
          </td>

          <td>
            <button @click="editarTurma(turma)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { turmaService, type Turma, type Turno, type Atividade } from '../service/turmaService'
import { usuarioService, type Usuario } from '../service/usuarioService'

const turmas = ref<Turma[]>([])
const usuarios = ref<Usuario[]>([])

const editando = ref(false)
const turmaEditandoId = ref('')

const form = ref<{
  nome: string
  atividade: Atividade
  turno: Turno
  educadorId: string
  ativa: boolean
}>({
  nome: '',
  atividade: 'REFORCO_ESCOLAR',
  turno: 'MANHA',
  educadorId: '',
  ativa: true,
})

async function carregarTurmas() {
  turmas.value = await turmaService.listarTodas()
}

async function carregarUsuarios() {
  usuarios.value = await usuarioService.listarTodos()
}

function nomeEducador(id: string) {
  const usuario = usuarios.value.find((u) => u.id === id)
  return usuario ? usuario.nome : '—'
}

async function salvarTurma() {
  if (editando.value) {
    await turmaService.editar(turmaEditandoId.value, form.value)
  } else {
    await turmaService.criar(form.value)
  }

  limparFormulario()
  carregarTurmas()
}

function editarTurma(turma: Turma) {
  form.value = { ...turma }

  turmaEditandoId.value = turma.id
  editando.value = true
}

function limparFormulario() {
  form.value = {
    nome: '',
    atividade: 'REFORCO_ESCOLAR',
    turno: 'MANHA',
    educadorId: '',
    ativa: true,
  }

  editando.value = false
}

onMounted(() => {
  carregarTurmas()
  carregarUsuarios()
})
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: auto;
  padding: 30px;
  font-family: Arial;
}

h1 {
  color: #2f855a;
  margin-bottom: 20px;
}

.form {
  background: #ffffff;
  border: 1px solid #d1fae5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.form input,
.form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #c6f6d5;
  border-radius: 6px;
}

.form button {
  background: #34d399;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.form button:hover {
  background: #10b981;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.tabela {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.tabela th {
  background: #d1fae5;
  padding: 10px;
  text-align: left;
}

.tabela td {
  padding: 10px;
  border-top: 1px solid #e5e7eb;
}

.tabela button {
  background: #6ee7b7;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}

.ativa {
  color: green;
  font-weight: bold;
}

.inativa {
  color: red;
  font-weight: bold;
}
</style>
